import {
    POSTS_LIST_REQUEST,
    POSTS_LIST_SUCCESS,
    POSTS_LIST_FAIL,
    POSTS_CREATE_REQUEST,
    POSTS_CREATE_SUCCESS,
    POSTS_CREATE_FAIL,
    POSTS_UPDATE_REQUEST,
    POSTS_UPDATE_SUCCESS,
    POSTS_UPDATE_FAIL,
    POSTS_DELETE_REQUEST,
    POSTS_DELETE_SUCCESS,
    POSTS_DELETE_FAIL,
    POSTS_LIKE_FAIL,
    POSTS_LIKE_SUCCESS,
    POSTS_LIKE_REQUEST,
    POST_DETAIL_REQUEST,
    POST_DETAIL_SUCCESS,
    POST_DETAIL_FAIL,
    COMMENT_SUCCESS,
    COMMENT_REQUEST,
    COMMENT_FAIL,
    } from "../constants/postsConstants"
import * as api from "../api/index"
import { POSTS_LIST_SERCHQUERY } from "../constants/authConstants";


export const listPosts =(page)=> async (dispatch) => {
    dispatch({
        type: POSTS_LIST_REQUEST
    });

    try{
        const {data} = await api.fetchPosts(page);
        dispatch({type: POSTS_LIST_SUCCESS, payload: data});
        
    }
    catch(error){
        dispatch({type: POSTS_LIST_FAIL, payload: error.message  })

    }
};

export const getPost =(id)=> async (dispatch) => {
    dispatch({
        type: POST_DETAIL_REQUEST
    });

    try{
        const {data} = await api.getPost(id);
        dispatch({type: POST_DETAIL_SUCCESS, payload: data});
        
    }
    catch(error){
        dispatch({type: POST_DETAIL_FAIL, payload: error.message  })

    }
};

export const listPostsBySearch =(searchQuery)=> async (dispatch) => {
    dispatch({
        type: POSTS_LIST_REQUEST
    });
    
    
    try{
        const {data} = await api.fetchPostsBySearch(searchQuery);
        
        dispatch({type: POSTS_LIST_SERCHQUERY, payload: data});
        console.log("action",data)
    }
    catch(error){
        dispatch({type: POSTS_LIST_FAIL, payload: error.message  })

    }
};

export const createPosts =(post,nav)=> async (dispatch) => {
    dispatch({
        type: POSTS_CREATE_REQUEST
    });

    try{
        const {data} = await api.createPosts(post);
        nav(`/posts/${data._id}`)
        dispatch({type: POSTS_CREATE_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: POSTS_CREATE_FAIL, payload: error.message  })
    }
};

export const updatePosts =(id,post,nav)=> async (dispatch) => {
    dispatch({
        type: POSTS_UPDATE_REQUEST  
    });

    try{
        const {data} = await api.updatePosts(id,post);
        nav(`/posts/${data._id}`)
        dispatch({type: POSTS_UPDATE_SUCCESS, payload: data});
        
    }
    catch(error){
        dispatch({type: POSTS_UPDATE_FAIL, payload: error.message  })
        console.log(error)
    }
};

export const deletePosts =(id)=> async (dispatch) => {
    dispatch({
        type: POSTS_DELETE_REQUEST 
    });

    try{
        await api.deletePosts(id);
        dispatch({type: POSTS_DELETE_SUCCESS, payload: id});
        console.log()
    }
    catch(error){
        dispatch({type: POSTS_DELETE_FAIL, payload: error.message  })
        console.log(error)
    }
};

export const likePosts =(id)=> async (dispatch) => {
    dispatch({
        type: POSTS_LIKE_REQUEST 
    });

    try{
        const {data} = await api.likePosts(id);
        dispatch({type: POSTS_LIKE_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: POSTS_LIKE_FAIL, payload: error.message  })
        console.log(error)
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    dispatch({
        type: COMMENT_REQUEST 
    });
    try {
      const { data } = await api.comment(value, id);
      window.location.reload()
      dispatch({ type: COMMENT_SUCCESS, payload: data });
  
      return data.comments;
    } catch (error) {
        dispatch({type: COMMENT_FAIL, payload: error.message  })
        console.log(error);
    }
  };