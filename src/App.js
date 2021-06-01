import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

//components

import Navbar from './components/Navbar/Navbar';
import StartPage from './components/StartPage/StartPage';
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import Footer from './components/Footer/Footer'

const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'));
    console.log(user);

    return (
        <BrowserRouter>
            <Container maxWidth='xl'>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={StartPage} />
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/" />)} />
                </Switch>
                <Footer />
            </Container>
        </BrowserRouter>
    )
}

export default App;
