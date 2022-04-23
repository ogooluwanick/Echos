import React from 'react'
import useStyles from '../../../styles';
import { Card, CardActions ,CardContent,CardMedia,Button,Typography,ButtonBase} from '@material-ui/core';
import {ThumbUpAlt,Delete,MoreHoriz} from "@material-ui/icons"
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux';
import {deletePosts,likePosts} from "../../../actions/postsActions"
import {ThumbUpAltOutlined} from '@material-ui/icons'
import { useNavigate } from 'react-router-dom';

export default function Post({post, setCurrentId}) {
const classes= useStyles();
const dispatch= useDispatch()
const nav= useNavigate()
const userAuth = useSelector((state)=>state.userAuth);
  const {profile:user} = userAuth;

const handleDelete=(id)=>{
  dispatch(deletePosts(id))
  window.location.reload();
}

const handleLike=(id)=>{
  dispatch(likePosts(id))
  setTimeout(()=>{
    window.location.reload();
  },2000)
}

const openPost=()=> nav(`/posts/${post._id}`)


const Likes = () => {
  if (post.likes.length > 0) {
    return post.likes.find((like) => like === user?.result.googleId || user?.result?._id )
      ? (
        <><ThumbUpAlt fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
      ) : (
        <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
      );
  }

  return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
};



return (
<Card className={`${classes.card} post-item`} raised elevation={6}>
  <ButtonBase className={`${classes.cardAction} `} onClick={openPost}>

      <CardMedia className={classes.media} image={post.selectedFile
        || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png' }
        title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
        {(user?.result?.googleId===post?.creator || user?.result?._id===post?.creator) &&
          (
            <div className={classes.overlay2}>
              <Button style={{ color: 'white' }} size="small" onClick={()=> setCurrentId(post._id)}>
                <MoreHoriz fontSize="medium" /></Button>
            </div>
          )
        }
      
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} gutterBottom variant="h5" component="h2">{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message.length>100?`${post.message.slice(0,100)}...`:post.message}</Typography>
      </CardContent>
  </ButtonBase>
  <CardActions className={classes.cardActions}>
    <Button size="small" color="primary" onClick={()=> handleLike(post._id)} disabled={!user?.result}>
      <Likes/> 
    </Button>
    {
      (user?.result?.googleId===post?.creator || user?.result?._id===post?.creator) &&
      (
        <Button size="small" color="primary" onClick={()=> handleDelete(post._id)}>
          <Delete fontSize="small" /> Delete
        </Button>
      )
    }
    
  </CardActions>
</Card>
)
}