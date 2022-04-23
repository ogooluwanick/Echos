import React,{ useEffect } from 'react';
import {Typography,Paper,CircularProgress,Divider} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import moment from "moment";

import useStyles from './styles';
import { getPost,listPostsBySearch } from '../../actions/postsActions';
import { Alert } from '@material-ui/lab';
import CommentSection from './CommentSection';

export default function PostDetails() {
  const classes= useStyles();
  const {post,loading,error} = useSelector((state)=>state.postDetails);
  const {posts} = useSelector((state)=>state.postsLists);
  console.log("post",post)
  const dispatch=useDispatch()
  const nav= useNavigate()
  const {id}=useParams()

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch,id]);

  useEffect(() => {
    dispatch(listPostsBySearch({search:null,tags:post?.tags?.join(",")}));
  }, [dispatch,post]);

  const recommendedPosts= posts?.filter(({_id})=>_id !== post._id)

  const openPost=(id)=> nav(`/posts/${id}`)

  return (
    <>
      {
        loading? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress/></div>
        :
        error? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><Alert severity="error" >{error}!</Alert></div>
        :
        (

            <Paper style={{ padding: '20px', borderRadius: '15px',marginBottom:"1rem" }} elevation={6}>
              <div className={classes.card}>
                <div className={classes.section}>
                  <Typography variant="h3" component="h2">{post?.title}</Typography>
                  <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags?.map((tag) => `#${tag} `)}</Typography>
                  <Typography gutterBottom variant="body1" component="p">{post?.message}</Typography>
                  <Typography variant="h6">Created by: {post?.name}</Typography>
                  <Typography variant="body1">{moment(post?.createdAt).fromNow()}</Typography>
                  <Divider style={{ margin: '20px 0' }} />
                  <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                  <Divider style={{ margin: '20px 0' }} />
                  <CommentSection post={post}/>
                  <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                  <img className={classes.media} src={post?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={"PostDetail Img"} />
                </div>
              </div>
              <br />
              {!!recommendedPosts?.length && (
                <div className={classes.section}>
                  <Typography gutterBottom variant="h5">You might also like:</Typography>
                  <Divider />
                  <div className={classes.recommendedPosts}>
                    {recommendedPosts?.map(({ title, name, message, likes, selectedFile, _id }) => (
                      <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                        <Typography gutterBottom variant="h6">{title}</Typography>
                        <Typography gutterBottom variant="subtitle2">{name}</Typography>
                        <Typography gutterBottom variant="subtitle2">{message}</Typography>
                        <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                        <img src={selectedFile} alt={title} width="200px" />
                      </div>
                    ))}
                  </div>
                </div> 
              )}
          </Paper>
        )
        
      }
    </> 
  )
}
