import axios from "axios"

const API= axios.create({baseURL:"https://echoes-endpoint.herokuapp.com"})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization= `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
    }
    return req
})

export  const fetchPosts=(page)=> API.get(`/posts?page=${page}` )
export  const getPost=(id)=> API.get(`/posts/${id}` )
export  const fetchPostsBySearch=(searchQuery)=>  API.get(`/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${searchQuery.tags}`)
export  const createPosts=(Post)=> API.post("/posts/add", Post )
export  const updatePosts=(id,Post)=> API.patch(`/posts/${id}`,Post)
export  const deletePosts=(id)=> API.delete(`/posts/${id}`)
export  const likePosts=(id)=> API.patch(`/posts/likePost/${id}`)

export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export  const signin=(formData)=> API.post(`/users/signin`,formData)
export  const signup=(formData)=> API.post(`/users/signup`,formData)




