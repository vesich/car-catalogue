import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode'
import * as actionType from '../../constants/actionTypes';


import memoriesText from '../../images/cars.png';
import useStyles from './styles';

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch()
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT })

        history.push('/auth');
        setUser(null)
    }


    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token)

            if (decodedToken.exp * 1000 < new Date().getTime()) {
                logout()
            }
        }
        //JWT ... 

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position={user ? 'static' : 'sticky'} color='inherit' >
            <Link to={user ? "/posts" : "/"} className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
            </Link>


            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0).toUpperCase()}</Avatar>
                        <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
