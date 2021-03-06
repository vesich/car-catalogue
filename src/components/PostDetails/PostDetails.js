import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Container, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../actions/posts'
import useStyles from './styles'

const PostDetails = () => {
    const classes = useStyles();
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id))
    }, [id])

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }))
        }
    }, [post])

    if (!post) { return null }

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper} >
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    // function filterByTags(one) {
    //     let isContain = false;
    //     post.tags.forEach(tag => {
    //         if (one.tags.includes(tag)) {
    //             isContain = true;
    //         }
    //     })
    //     return isContain;
    // }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
    // const recommendedPosts2 = posts.filter((p) => filterByTags);



    const openPost = (_id) => {
        history.push(`/posts/${_id}`)
    }

    return (
       
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
           {/* <Grid item xs={12} sm={6} md={9}> */}
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h3" component="h3">{post.make} {post.model}</Typography>
                        <Typography variant="h5" component="h5" color="textSecondary">{post.year}</Typography>
                        <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                        <Typography gutterBottom variant="body1" component="p">{post.comment}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        <Typography variant="h6">Created by: {post.name}</Typography>
                        <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                        <Divider style={{ margin: '20px 0' }} />
                        {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} /> */}
                    </div>
                    <div className={classes.imageSection}>
                        <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                    </div>
                </div>
                {!!recommendedPosts.length && (
                    <div className={classes.section}>
                        <Typography gutterBottom variant="h5">You might also like: </Typography>
                        <Divider />
                        <div className={classes.recommendedPosts}>
                            {recommendedPosts.map(({ make, model, selectedFile, _id, likes }) => (
                                <Paper elevation={6} className={classes.smallCard} onClick={() => openPost(_id)} key={_id}>
                                    <Typography gutterBottom variant="h5" >{make} {model}</Typography>
                                    <img className={classes.littleImage} src={selectedFile} />
                                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                                </Paper>
                            ))}
                        </div>
                    </div>
                )}
                 {/* </Grid> */}
        </Paper>
  
    )
}

export default PostDetails
