import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Paper, Typography } from '@material-ui/core';

import useStyles from './styles';
import mainImage from '../../images/bavar.png'

const StartPage = () => {

    const classes = useStyles();


    return (

        <Paper elevation={6} className={classes.paper}>
            <Typography variant="h4" component="h2" className={classes.heading} >WELCOME TO THE CAR CATALOGUE</Typography>
            <Link to="/auth">
                <div className={classes.imageWrapper} >

                    <img className={classes.image} src={mainImage} alt="cover picture" />

                </div>
            </Link>
        </Paper >

    )
}

export default StartPage
