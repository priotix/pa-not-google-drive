import axios from 'axios';
import decode, { JwtPayload } from 'jwt-decode';
import { refreshToken, userLogout } from '../store/actions/auth';
import store from '../store/store';

let tokenPromise = null;

export const isTokenExpired = (accessToken: any): boolean => {
  if (accessToken) {
    const expDate = decode<JwtPayload>(accessToken).exp * 1000;
    const currentDate = Date.now();

    return expDate - currentDate < 30 * 1000;
  }

  return false;
};

async function sendRequest({ method, url, data, headers, params, ...otherOptions }) {
  try {
    if (method === 'get') {
      return await axios[method](url, { headers, params, ...otherOptions });
    }
    if (method === 'delete') {
      return await axios[method](url, { headers, data, ...otherOptions });
    }
    return await axios[method](url, data, { headers, params, ...otherOptions });
  } catch (err) {
    throw err;
  }
}

async function refreshTokenRequest(refToken) {
  try {
    if (tokenPromise === null) {
      tokenPromise = store.dispatch<any>(refreshToken(refToken));
    }
    const newToken = (await tokenPromise).accessToken;
    tokenPromise = null;

    return newToken;
  } catch (err) {
    if (tokenPromise) {
      tokenPromise = null;
      store.dispatch<any>(userLogout(true));
    }
    throw err;
  }
}

export function getResourceObj(includeResources: any): any {
  const state = store.getState();
  const { permissions } = state.auth.authData;

  if (includeResources) {
    const permission = permissions.find((perm) => perm.p === includeResources.permission);
    const resourceObj = includeResources.resourceNames.reduce(
      (obj, resName) => ({
        ...obj,
        [resName]: permission.r.length ? permission.r.find((res) => res.name === resName).value : undefined,
      }),
      {}
    );
    return resourceObj;
  }
  return {};
}

export default async function request(method: string, url: string, options: any = {}) {
  const state = store.getState();
  const { accessToken, refreshToken: refToken } = state.auth.authData;

  const { data = {}, headers = {}, auth = true, includeResources, params: defaultParams, ...otherOptions } = options;
  const params = { ...getResourceObj(includeResources), ...(defaultParams || {}) };

  if (auth) {
    try {
      const isLocalExpired = isTokenExpired(accessToken);
      const token = isLocalExpired ? await refreshTokenRequest(refToken) : accessToken;
      const response = await sendRequest({
        method,
        url,
        data,
        headers: { ...headers, Authorization: `Bearer ${token}` },
        params,
        ...otherOptions,
      });
      return response;
    } catch (error) {
      const tokenError = error.response && error.response.data.errors[0].slug;
      const isExpired = tokenError === 'token-is-expired' || tokenError === 'authentication-failed';
      if (!isExpired) {
        throw error;
      } else {
        const newToken = await refreshTokenRequest(refToken);
        if (!newToken) {
          throw error;
        }
        return await sendRequest({
          method,
          url,
          data,
          headers: { ...headers, Authorization: `Bearer ${newToken}` },
          params,
        });
      }
    }
  }

  return sendRequest({ method, url, data, headers, params });
}
