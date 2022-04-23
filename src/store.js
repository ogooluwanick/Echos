import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/authReducer";
import { commentReducer, postCreateReducer, postDeleteReducer, postDetailReducer, postLikeReducer, postsListReducer, postUpdateReducer } from "./reducers/postsReducers";

const initialState= {
    userAuth:{
        profile:localStorage.getItem("profile")?
        JSON.parse(localStorage.getItem('profile'))
        :null
    }
};
const reducer= combineReducers({
    postsLists:postsListReducer,
    postsCreate:postCreateReducer,
    postUpdate:postUpdateReducer,
    postDelete:postDeleteReducer,
    postLike:postLikeReducer,
    userAuth:authReducer,
    postDetails:postDetailReducer,
    comment:commentReducer,
});


const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;



const store = createStore(
    reducer, 
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
);


export default store;