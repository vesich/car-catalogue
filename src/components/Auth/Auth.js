import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth'

import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState)
    const [errors, setErrors] = useState("");
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const switchMode = () => {
        setIsSignup((prevMode) => !prevMode);
        setShowPassword(false)
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {

            //
            if (formData.password.length < 6) { return alert('Password must be at least 6 characters long!') }
            if (formData.password !== formData.confirmPassword) { return alert('Passwords don\'t match!') }
            // Pop up modal to be implemented and many more validations !!


            dispatch(signup(formData, history))
        } else {
            if (formData.password.length < 6) { setErrors('Wrong credentials!') }
            console.log(errors);
            dispatch(signin(formData, history))
        }
    }

    const handleChange = (e) => {
        // if (e.target.name == 'firstName' || e.target.name == 'lastName') {
        //     setFormData({ ...formData, [e.target.name]: e.target.value[0].toUpperCase() + e.target.value.slice(1).toLowerCase() })
        // } else {

        // }
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/posts')

        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (err) => {
        console.log(err);
        setErrors('Google Sign In was unsuccessful. Try again later')

    }


    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {errors ? <Typography className={classes.errors} >{errors}</Typography> : null}
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} > {isSignup ? 'Sign Up' : 'Sign In'}</Button>
                    <GoogleLogin
                        clientId="302729751451-6okfd7ndhu3juqc07806p9hd0m035ogn.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained" >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-start">
                        <Button fullWidth color="inherit" size="small" onClick={switchMode} >
                            {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                        </Button>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
}

export default Auth
