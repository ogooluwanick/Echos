import React from 'react'
import Posts from '../../components/posts/Posts';
import Form from '../../components/form/Form';
import { listPostsBySearch } from '../../actions/postsActions';
import useStyles from '../../styles';
import queryString from 'query-string'



import { useDispatch } from 'react-redux';
import { useState } from 'react';
import {Container,Grow,Grid,Paper,Button,AppBar,TextField} from "@material-ui/core"
import { Paginatetion}  from '../../components/Pagination';
import ChipInput from "material-ui-chip-input"
import { useLocation, useNavigate } from 'react-router-dom';



export default function Home() {
    const [currentId, setCurrentId] = useState(null)
    const [search,setSearch] = useState("")
    const [tags, setTags] = useState([]);

    const classes= useStyles();
    const dispatch= useDispatch();
    const nav= useNavigate()

    const query= useLocation().search                              //Code to get query values
    const searchQuery= queryString.parse(query)                    //import queryString

    const page=searchQuery.page || 1
    

    




    const searchPost=()=>{
      if(search.trim() || tags){
        dispatch(listPostsBySearch({search,tags:tags.join(",")}))
        nav(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`)
      }
      else {
        nav("/")
      }
    }  
    

    const handleKeyPress=(e)=>{
      if(e.keyCode===13){
        searchPost()
      }
    }  

    const handleAddChip=(tag)=> setTags([...tags,tag])

    const handleDeleteChip=(tagToDelete)=>setTags(tags.filter((tag)=>tag!==tagToDelete ))

  return (
    <Grow in>
        <Container maxWidth={"xl"}>
          <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={`${classes} grid-content`}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}  />
            </Grid>
            <Grid item xs={12} sm={6} md={3} className="rightWidgets">
              <AppBar className={classes.appBarSearch} position="static" color='inherit'>
                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
                <ChipInput
                  style={{ margin: '10px 0' }}
                  value={tags}
                  onAdd={(chip) => handleAddChip(chip)}
                  onDelete={(chip) => handleDeleteChip(chip)}
                  label="Search Tags"
                  variant="outlined"
                  fullWidth
                />
                <Button onClick={searchPost} className={classes.searchButton} variant="contained" color="primary">Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              
                <Paper className={classes.pagination} elevation={6}>
                  <Paginatetion  page={page}/>
                </Paper>
            
              
            </Grid>

          </Grid>
        </Container>
    </Grow>
  )
}
