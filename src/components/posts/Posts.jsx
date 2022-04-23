import React from 'react'
import Post from './post/Post'
import useStyles from '../../styles';
import { useSelector } from 'react-redux';
import { Grid, CircularProgress } from '@material-ui/core';
import {Alert} from '@material-ui/lab'

  


export default function Posts({setCurrentId}) {
  const classes= useStyles();

  const postsLists =useSelector((state) => state.postsLists);
    const { loading, error, posts}= postsLists

  //  if(loading && !posts?.length ) return "No Posts"

    
  return (
    <>
    { loading? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><CircularProgress/> </div>
      :
      error? <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><Alert severity="error" >{error}!</Alert></div>
      :
        <Grid  className={classes.container} container alignItems='stretch' spacing={3}>
         {posts?.map((post,index)=>(
          <Grid key={index}  item xs={12} sm={12} lg={3} md={6} >
            <Post post={post}  setCurrentId={setCurrentId}/>
          </Grid> 
         ))}
         
          
        </Grid>
    }
     
    </>
    
  )

}
