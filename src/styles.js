import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme)=>({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: "rgba(115, 113, 252, 1)",
  },
  image: {
    marginLeft: '15px',
    transform:"rotate(90deg)"
  },
  app__flex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textfiledItems:{
    margin:"10px 15px"
  },
  textfiledItemsAuth:{
    margin:"5px 10px"
  },
  form:{
    borderRadius: 15,
  },
  root:{
    
  },
  fileInput:{
    margin:"5px 0px"
  },
  buttonSubmit:{
    margin:"5px 0px"
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0px 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  submit:{
    marginTop:"15px"
  },
  googleButton:{
    marginTop:"15px"
  },
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  
  

}));
