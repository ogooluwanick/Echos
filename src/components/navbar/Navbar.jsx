import React,{/* useState */} from 'react'
import {AppBar,Typography,Toolbar,Avatar,Button} from "@material-ui/core"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import decode from 'jwt-decode'


import "./Navbar.scss"
import useStyles from '../../styles'
import images from '../../constants/images';
import { LOGOUT } from '../../constants/authConstants'


export default function Navbar() {
    const classes= useStyles();
    const userAuth = useSelector((state)=>state.userAuth);
    const {profile} = userAuth;
    const dispatch =useDispatch()
    const nav= useNavigate()
    const loc = useLocation()

    
    


    const handleLogout= ()=>{
        dispatch({type:LOGOUT})
        window.location.reload()
        
    }

  

 


    useEffect(() => {
      const token=profile?.token
      
      if(token){
          const decodedToken=decode(token)
          
          if(decodedToken.exp*3000 < new Date().getTime()){
            handleLogout()
          }
        }


        //JWT...code
        if (loc.pathname==="/home"){
            nav("/")
            window.location.reload()
            
 
        }
        
    })
    

return (
    <AppBar className={classes.appBar} position='static' color='inherit' >
        <Link className="brandContainer" to="/" style={{textDecoration:"none"}}>
            <Typography className={`logo_text ${classes.heading}`} variant='h2' align='center' >Echos </Typography>
            <img className={classes.image} src={images.echoLogo} alt="echos logo" height="60" width={"60"} />
        </Link>
        <Toolbar className={`${classes.toolbar}`}>
            {profile?
                (
                    <div className="profile">
                        <Avatar className="avater" alt={profile.result?.name} src={profile.result?.imgUrl}>{profile.result?.name.charAt(0)}</Avatar>
                        <Typography className={classes.username} variant='h6'>{profile.result?.name} </Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={handleLogout}>Logout</Button>
                    </div>
                )
                :   
                (   
                    <Button component={Link}  to="/auth" color="primary">Signin</Button>
                )
            
            }
        </Toolbar>

    </AppBar>
  )
}
