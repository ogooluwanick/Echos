import React from 'react';
import './App.scss';
import {Container} from "@material-ui/core"
import {BrowserRouter as Router,Route,Routes,Navigate} from "react-router-dom"


import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import PostDetails from './pages/postDetails/PostDetails';
import { useSelector } from 'react-redux';


function App() {
  const userAuth = useSelector((state)=>state.userAuth);
    const {profile:user} = userAuth;
    

  
  return (
    <Router>
      <Container maxWidth="xl" className='app__flex'  >
        <Navbar/>
        <Routes>
          <Route   path='/' element={<Navigate to="/posts"/>}/>
          <Route   path='/posts' element={<Home/>}/>
          <Route   path='/posts/search' element={<Home/>}/>
          <Route   path='/posts/:id' element={<PostDetails/>}/>
          <Route   path='/home' element={<Home/>}/>
          <Route   path='/auth' element={!user?<Auth/>:<Navigate to="/posts"/>}  />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
