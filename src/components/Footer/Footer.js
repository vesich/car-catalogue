import React from 'react'
import { AppBar, Typography } from '@material-ui/core';

import useStyles from './styles';

const Footer = () => {

    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position="relative" >
            <Typography>
                &copy; Veselin Georgiev 2021
            </Typography>
           
        </AppBar>
    )
}

export default Footer
