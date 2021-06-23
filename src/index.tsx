import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, Theme, ThemeProvider } from '@material-ui/core/styles';
import { ToastContainer } from 'react-toastify';
import App from './App';
import store from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import './scss/index.scss';

const theme: Theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ToastContainer autoClose={2000} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
