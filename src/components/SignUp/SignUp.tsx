import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Paper, TextField, Grid, InputAdornment, IconButton, Button } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { createUserData } from '../../store/actions/auth';
import './SignUp.scss';

type FormValues = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async (data) => {
    const response = await dispatch(createUserData(data));
    if (response) {
      return;
    }
    history.push('/login');
  };

  const handleKeyDown = (e) => {
    const key = e.keyCode;

    if (key === 13) {
      onSubmit(getValues());
    }
  };

  return (
    <Grid className="c-SignUp" container justify="center" alignContent="center">
      <Grid container item xs={11} sm={6} md={4} xl={3}>
        <Paper className="c-SignUp__form">
          <Grid item xs={12} className="c-SignUp__formTitle">
            <div>Sign Up</div>
          </Grid>
          <TextField
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            label="Email"
            name="email"
            required
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
            required
            label="First Name"
            name="firstName"
            {...register('firstName', {
              required: 'First Name is required',
            })}
            error={!!errors.firstName}
            helperText={errors.firstName && errors.firstName.message}
          />
          <TextField
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
            label="Last Name"
            name="lastName"
            {...register('lastName', {
              required: 'Last Name is required',
            })}
            error={!!errors.lastName}
            helperText={errors.lastName && errors.lastName.message}
          />
          <TextField
            margin="normal"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            required
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
          <Grid container item xs={12} className="ButtonsGrid" justify="space-between">
            <Button className="LoginButton" variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
              Sign Up
            </Button>
          </Grid>
          <Grid item xs={12} className="c-SignUp__registerNow">
            <Link to="/login">Have an account? SIGN IN</Link>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUp;
