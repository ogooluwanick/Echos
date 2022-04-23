import { POSTS_LIST_SERCHQUERY } from "../constants/authConstants";
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
    POSTS_LIKE_REQUEST,
    POSTS_LIKE_SUCCESS,
    POSTS_LIKE_FAIL,
    POST_DETAIL_REQUEST,
    POST_DETAIL_SUCCESS,
    POST_DETAIL_FAIL,
    COMMENT_REQUEST,
    COMMENT_SUCCESS,
    COMMENT_FAIL} from "../constants/postsConstants"

export const postsListReducer =(state = {
    loading: true,
    posts: []}, 
    action
    ) =>{
        switch(action.type){
            case POSTS_LIST_REQUEST:
                return {loading: true};
            case POSTS_LIST_SUCCESS:
                return {...state,posts:action.payload.data,numOfPages:action.payload.numOfPages,currentpage:action.payload.currentpage,loading: false};
            case POSTS_LIST_FAIL:
                return {loading: false, error: action.payload};
            case POSTS_LIST_SERCHQUERY:
                return {...state, posts: action.payload,loading: false};
            default:
                return state;
        }
    
    };

    export const postCreateReducer=(state={loading: true},action)=>{
        switch(action.type)
        {
            case POSTS_CREATE_REQUEST:
                return {loading:true};
            case POSTS_CREATE_SUCCESS:
                return {loading:false, posts:action.payload};
            case POSTS_CREATE_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }

    export const postDetailReducer=(state={post:{},loading: true},action)=>{
        switch(action.type)
        {
            case POST_DETAIL_REQUEST:
                return {loading:true};
            case POST_DETAIL_SUCCESS:
                return {loading:false, post:action.payload};
            case POST_DETAIL_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }

    export const postUpdateReducer=(state={loading: true,posts:[]},action)=>{
        switch(action.type)
        {
            case POSTS_UPDATE_REQUEST:
                return {loading:true};
            case POSTS_UPDATE_SUCCESS:
                return {...state,posts:state.posts.map((post)=> post._id === action.payload._id? action.payload: post),loading:false}
            case POSTS_UPDATE_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }

    export const postDeleteReducer=(state={loading: true,posts:[]},action)=>{
        switch(action.type)
        {
            case POSTS_UPDATE_REQUEST:
                return {loading:true};
            case POSTS_UPDATE_SUCCESS:
                return {...state,posts:state.posts.filter((post)=> post._id !== action.payload),loading:false}
            case POSTS_UPDATE_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }

    export const postLikeReducer=(state={posts:[]},action)=>{
        switch(action.type)
        {
            case POSTS_LIKE_REQUEST:
                return {loading:true};
            case POSTS_LIKE_SUCCESS:
                return {loading: false, posts: action.payload}
            case POSTS_LIKE_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }

    export const commentReducer=(state={c:[]},action)=>{
        switch(action.type)
        {
            case COMMENT_REQUEST:
                return {loading:true};
            case COMMENT_SUCCESS:
                return {...state,posts:state.posts.map((post)=> {
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),loading:false}
            case COMMENT_FAIL:
                return {loading:false , error:action.payload}
            default:
                return state;
        }
    }