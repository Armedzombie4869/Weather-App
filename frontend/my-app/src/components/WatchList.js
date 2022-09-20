import axios from 'axios'
import React,{useState,useEffect} from 'react'
import config from './config';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WatchList() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [cityid, setCityid] = useState('');
  
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function DeleteCity(id) {
    setCityid(id);
    handleClickOpen();
  }
  
  function DeleteCityYes(id) {
    const token = localStorage.getItem('token');
    axios.delete(`${config.authURL}deleteitem/${cityid}`,{headers: {
    Authorization: token
   }}).then(data => window.location.reload(false))
      
  }


    const [list,setList] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${config.authURL}watchlist`,{headers: {
            Authorization: token
           }}).then(res => setList(res.data) ).catch(err => navigate('/login'))
    },[])
  return (
    <div>
        <h1>Watchlist</h1>
        <List >
        {
          list.map(item => <div key={item._id}>
            <ListItem alignItems="flex-start" >
            <ListItemText
                primary={`${item.city} `}
              />
              
              <div>
              <IconButton edge="end" aria-label="comments" onClick={() => navigate('/watchlist/:city',{state:{name:item.city}} )} >
                  <ChevronRightIcon />
                </IconButton>
                <IconButton edge="end" aria-label="comments" onClick={DeleteCity.bind(this,item._id)}>
                  <DeleteIcon />
                </IconButton>
              </div>

            </ListItem>
            <Divider variant="inset" component="li" />

          </div>
          )
        }
       

      </List>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"City List"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you want to delete this city?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={DeleteCityYes}>Yes</Button>
          <Button onClick={handleClose}>No</Button>
        </DialogActions>
      </Dialog>
        
            
        
    </div>
  )
}
