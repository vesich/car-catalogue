import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts'
import { TextField, Button, Typography, Paper } from '@material-ui/core';


const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({ make: '', comment: '', tags: [], selectedFile: '', model: '', year: '' })
    const post = useSelector((state) => (currentId ? state.posts.posts.find((p) => p._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if (post) {
            setPostData(post)
        }
    }, [post])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost({ ...postData, name: user?.result?.name }, history));

            clear();
        } else {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        }
    };

    const clear = () => {
        setCurrentId(0);
        setPostData({ title: '', message: '', tags: [], selectedFile: '' })
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper} elevation={6} >
                <Typography className={classes.typography} align="center" component={Link} to="auth" >
                    Please Sign In or Sign Up to upload your own favourite car
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper} elevation={6} >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Edit your card' : 'Create a card'} </Typography>
                <TextField
                    name="make"
                    variant="outlined"
                    label="Make"
                    fullWidth
                    value={postData.make}
                    onChange={(e) => setPostData({ ...postData, make: e.target.value })}
                />
                <TextField
                    name="model"
                    variant="outlined"
                    label="Model"
                    fullWidth
                    value={postData.model}
                    onChange={(e) => setPostData({ ...postData, model: e.target.value })}
                />
                <TextField
                    name="year"
                    variant="outlined"
                    label="Year"
                    fullWidth
                    value={postData.year}
                    onChange={(e) => setPostData({ ...postData, year: e.target.value })}
                />
                <TextField
                    name="comment"
                    variant="outlined"
                    label="Add comment"
                    fullWidth
                    value={postData.comment}
                    onChange={(e) => setPostData({ ...postData, comment: e.target.value })}
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" fullWidth>Submit</Button>
                <Button variant="outlined" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
