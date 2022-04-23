import React from 'react'
import "./Auth.scss"
import {Paper,Typography,Avatar,Button,Container,Grid} from "@material-ui/core"
import { LockOutlined } from '@material-ui/icons';
import { useState } from 'react';
import {GoogleLogin} from "react-google-login"
import {useDispatch} from "react-redux"
import { useNavigate } from 'react-router-dom';


import useStyles from '../../styles';
import Input from "./Input"
import Icon from "./Icon"
import { AUTH } from '../../constants/authConstants';
import { signin, signup } from '../../actions/authActions';

const initialState= {
firstName:"",
lastName:"",
email:"",
password: "",
confirmPassword: ""}
export default function Auth() {
    const [showPassword, setShowPassword] = useState(false)
    const classes= useStyles();
    const [isSignup, setisSignup] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const dispatch =useDispatch()
    const nav = useNavigate()


    const handleSubmit=(e)=>{
        e.preventDefault()
        


        if (!isSignup){
            dispatch(signin(formData,nav))
        }
        else{
            dispatch(signup(formData,nav))
        }

    }
    
    const handleChange=(e)=>{
        setFormData({...formData, [e.target.name]: [e.target.value]})
    }

    const handleSwitch=()=>{
        setisSignup((prevIsSignup)=>!prevIsSignup) 
        setShowPassword(false)
    }

    const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword)

    
    

    const googleSuccess= async(res) => {
        
        const result= res?.profileObj
        const token= res?.tokenId

        try {
            dispatch({type:AUTH,payload:{result,token}})
            nav("/home")


        }
        catch(error){
            console.log(error)
        }


    }

    const googleFailure=(error)=>{
        console.log(error)
        alert ("Google Sign In was unsuccessful. Try Again Later")
    }
        
    
  return (
    <Container className={"auth_container"} component="main" maxWidth="xs">
        <Paper className={"auth_paper"} elevation={3}>
            <Avatar className={`${classes.avater} auth_avater`}>
                <LockOutlined/>
            </Avatar>
            <Typography  variant='h5'>{isSignup?"Sign Up":"Sign In"}</Typography>
            <form className={`${classes.form} auth_form`} onSubmit={handleSubmit} >
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <div style={{display:"flex",}}>        
                                <Input className={`${classes.textfiledItemsAuth}`} name="firstName" label="First Name" handleChange={handleChange} autoFocus xs={6} half  />
                                <Input className={`${classes.textfiledItemsAuth}`} name="lastName" label="Last Name" handleChange={handleChange}  xs={6} half/>
                            </div>
                        )
                    }
                    <Input className={`${classes.textfiledItemsAuth}`} name="email" label="Email Adress" handleChange={handleChange} type="email" />
                    <Input className={`${classes.textfiledItemsAuth}`} name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                    {
                        isSignup && (
                            <>        
                                <Input className={`${classes.textfiledItemsAuth}`} name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                            </>
                        )
                    }
                </Grid>
                <Button className={classes.submit} type="submit" color='primary' fullWidth variant='contained' >
                    {
                        isSignup?"Sign Up":"Sign In"
                    }
                </Button>
                    <GoogleLogin clientId='692540068941-c9c6be97gu2hcpdi05d1pf0tdcloe444.apps.googleusercontent.com' render={(renderProps)=>(
                        <Button className={classes.googleButton} color='primary'  fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained"> Google Sign In</Button>
                    )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={"single_host_origin"}
                    />
                <Grid container justifyContent='flex-end'>
                    <Grid item >
                        <Button className={classes.googleButton} onClick={handleSwitch}>
                            {
                                isSignup?"Already have an Account? Sign in":"Don't have an Account? Sign up"
                            }
                        </Button>
                    </Grid>
                </Grid>
            </form>
            
        </Paper>
    </Container>
  )
}
