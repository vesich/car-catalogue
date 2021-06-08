import React, { useState, useEffect } from 'react'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

import Pagination from '../Pagination';
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form'

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}


const Home = () => {

    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])

    const [data, setData] = useState("");
    const [infoInput, setInfoInput] = useState("")
    const [fetchedData, setFetchedData] = useState({});


    const handleKeyPress = (e) => {

        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/')
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete))
    }

    // weather API


    const handleWeather = async (pos) => {
        const { latitude, longitude } = pos.coords;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude.toFixed(4)}&lon=${longitude.toFixed(4)}&appid=b4009290ee31edbbf2a3a404a73c813b&units=imperial`);
        const info = await response.json();
       

      
        setFetchedData(info);


    }

    useEffect(async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleWeather);
        }

    }, [])

    return (
        <Grow in>
            <Container maxWidth="xl" >
                <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer} >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Cars"
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAdd(chip)}
                                onDelete={(chip) => handleDelete(chip)}
                                label="Search Tags"
                                variant="outlined" />
                            <Button onClick={searchPost} className={classes.searchButton} size="small" variant="contained" color="primary" >Search</Button>
                        </AppBar>

                        {fetchedData

                            && (<Paper elevation={6} className={classes.weather}>
                                <Typography>{fetchedData?.name}  {Math.floor(fetchedData?.main?.temp)}</Typography>
                                <img style={{maxWidth: '100px', margin: '10px auto'}} src={`http://openweathermap.org/img/wn/${fetchedData?.weather?.[0].icon}@2x.png`} alt="weather icon" />
                                <Typography>{fetchedData?.weather?.[0].description}</Typography>
                            </Paper>)
                          
                        }

                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
