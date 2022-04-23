import { AUTH} from "../constants/authConstants"
import * as api from "../api/index"

export const signin =(formData,nav)=> async (dispatch) => {
    
    try{
        const {data} = await api.signin(formData);
        dispatch({type: AUTH, payload: data});
        

        nav("/")
    }
    catch(error){
        console.log(error)

    }
};


export const signup =(formData,nav)=> async (dispatch) => {


    try{
        const {data} = await api.signup(formData);
        dispatch({type: AUTH, payload: data});

        
        nav("/")
    }
    catch(error){
        console.log(error)
    }
};