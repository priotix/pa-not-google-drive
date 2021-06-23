import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import {
  Paper,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { userLogin } from '../../store/actions/auth';
import Icon from '../Icon';
import './Login.scss';

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  const handleKeyDown = (e) => {
    const key = e.keyCode;

    if (key === 13) {
      onSubmit(getValues());
    }
  };

  return (
    <Grid className="c-Login" container justify="center" alignContent="center">
      <Grid container item xs={11} sm={6} md={4} xl={3}>
        <Paper className="c-Login__form">
          <Grid item xs={12} className="c-Login__formTitle">
            <div className="c-Login__logo">
              <Icon name="win" className="winLogo" />
            </div>
            <div className="c-Login__titleText">Login</div>
          </Grid>
          <TextField
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Email"
            name="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegex,
                message: 'Please input a valid email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            onKeyDown={handleKeyDown}
          />
          <TextField
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton color="primary" onClick={() => setPasswordVisible(!isPasswordVisible)} aria-label="link">
                    {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label="Password"
            type={isPasswordVisible ? 'text' : 'password'}
            name="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password should be at least 8 characters long',
              },
            })}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            onKeyDown={handleKeyDown}
          />
          <Grid container item xs={12} className="c-Login__buttonsGrid" justify="space-between">
            <FormControlLabel
              className="c-Login__chackboxLabel"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: props }) => (
                    <Checkbox {...props} onChange={(e) => props.onChange(e.target.checked)} />
                  )}
                />
              }
              label="Remember Me"
            />
            <Button
              className="c-Login__loginButton"
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} className="c-Login__registerNow">
            <Link to="/sign-up">REGISTER NOW</Link>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
