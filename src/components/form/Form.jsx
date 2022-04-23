import React from 'react'
import useStyles from '../../styles';
import { Typography,TextField ,Button,Paper} from '@material-ui/core';
import { useState } from 'react';
import FileBase from 'react-file-base64';
import "./Form.scss"
import { useDispatch, useSelector } from 'react-redux';
import { createPosts, updatePosts } from '../../actions/postsActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Form({currentId, setCurrentId} ){
const [postData, setPostData] = useState({
title:"",
message:"",
tags:"",
selectedFile: "",
})
const classes= useStyles();
const dispatch= useDispatch();
const nav=useNavigate()
const postsLists =useSelector((state) => currentId? state.postsLists.posts.find((post)=>post._id===currentId):null);
const userAuth = useSelector((state)=>state.userAuth);
  const {profile:user} = userAuth;

const handleSubmit=(e)=>{
e.preventDefault()

if (currentId){
dispatch(updatePosts(currentId,{...postData,name:user?.result.name},nav))
}
else{
dispatch(createPosts({...postData,name:user?.result.name},nav))
}

handleClear()
setTimeout(()=>{
  window.location.reload()
},2000)

}

const handleClear=()=>{
setCurrentId(null)
setPostData({
  title:"",
  message:"",
  tags:"",
  selectedFile: "",})
}

useEffect(() => {
if(postsLists) setPostData(postsLists)
}, [currentId,postsLists,postData])

return (
  <>
  { user?.result?.name ?

    (<Paper className={`app__form-Paper ${classes.form}`} elevation={6}>
    <form autoComplete='off' noValidate className={`${classes.fileInput} app__form`} onSubmit={handleSubmit}>
      <Typography variant='h5' className={`${classes.app__flex} `}> {currentId? "Updating":"Creating"} a memory
      </Typography>
        <TextField className={classes.textfiledItems} name='title' variant='outlined' label="Title" fullWidth
          value={postData.title} onChange={(e)=> setPostData({...postData ,title:e.target.value})}/>
          <TextField className={classes.textfiledItems} name='message' variant='outlined' label="Message" fullWidth multiline minRows={4} 
            value={postData.message} onChange={(e)=> setPostData({...postData ,message:e.target.value})}/>
            <TextField className={classes.textfiledItems} name='tags' variant='outlined' label="Tags" fullWidth
              value={postData.tags} onChange={(e)=> setPostData({...postData ,tags:e.target.value.split(",")})}/>
              <div className={`${classes.fileInput} form-filebase64` }>
                <FileBase type="file" multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
              </div>
              <Button className={classes.buttonSubmit} variant="contained" color='primary' type='submit'
                fullWidth>Submit</Button>
              <Button variant="contained" color='secondary' size='small' onClick={handleClear} fullWidth>Clear</Button>
    </form>
  </Paper>
  )
  :
  (
    <Paper className={classes.paper} style={{minWidth:"100%"}}>
       <Typography style={{padding:"5rem"}}>Please Signin or Register to Like Posts</Typography>
    </Paper>
  )
  }
  </>
)
}