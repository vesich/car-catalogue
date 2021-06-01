import React from 'react';
import useStyles from './styles';
import { Card, CardActions, CardMedia, Button, Typography, CardContent, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = JSON.parse(localStorage.getItem('profile'))

    const Likes = () => {
        if (post?.likes?.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }


        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    const openPost = () => {
        history.push(`/posts/${post._id}`)
    }

    const handleDelete = () => {
        //better UI here !!
        let confirmed = window.confirm('Are you sure?');
        if (confirmed) {
            dispatch(deletePost(post._id))
        }

    }

    let commentPreview = post.comment.slice(0, 20) + '...'

    return (
        <Card className={classes.card} raised elevation={6}>

            <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} make={post.make} />
            <div className={classes.overlay}>
                <Typography variant="h6"> {post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {
                (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <div className={classes.overlay2}>
                        <Button
                            style={{ color: 'white' }}
                            size="small"
                            onClick={() => setCurrentId(post._id)} >
                            <MoreHorizIcon fontSize="default" />
                        </Button>
                    </div>
                )
            }
            {/* <ButtonBase component="span" className={classes.cardAction} onClick={openPost} > */}
            <Button onClick={openPost} style={{margin: '10px 20px'}}  size="small" variant="contained" color="primary" >Details</Button>
                <div className={classes.details}>
                    <Typography variant="body2" color="primary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h6" gutterBottom >{post.make} {post.model}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{post.comment.length > 20 ? commentPreview : post.comment}</Typography>
                </CardContent>
            {/* </ButtonBase> */}
            <CardActions className={classes.cardActions} >
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {
                    (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button size="small" color="primary" onClick={handleDelete}>
                            <DeleteIcon fontSize="small" />
                    Delete
                        </Button>)
                }
            </CardActions>

        </Card>
    )
}

export default Post
