import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import config from './config';

import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Profile() {
  let navigate = useNavigate();
  const [user,setUser] = useState(null);
  useEffect(()=> {
    
   const token = localStorage.getItem('token');
   axios.get(`${config.authURL}profile`,{headers: {
    Authorization: token
   }}).then(res =>{
    console.log(res)
    setUser(res.data.user);
   }).catch(err => {
    console.log(err);
    navigate('/login');

   })
    
  },[]);

  function stringToColor(string) {
    let hash = 0;
    let i;

    
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
   

    return color;
}

  function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

  return (
    <div>
    
      {user?
        <div className="container d-flex justify-content-center align-items-center flex-column mt-5 shadow-lg p-2">
        <Avatar {...stringAvatar(`${user?.firstname} ${user?.lastname}`)} style={{ width: 150, height: 150 }} />
        <h1 className="mt-2">{user?.firstname} {user?.lastname}</h1>
        <p><EmailIcon /> {user?.email}</p>
        <p><LocationOnIcon /> {user?.city},{user?.country}</p>
        
       
        <div>

        <a className="btn btn-primary mr-5" href="/profile/edit">Edit</a>
     
        
        <a className="btn btn-danger " onClick={() => localStorage.clear()} href="/login">Logout</a>
        </div>
    

        
        </div>
        
  
      :null}
    
    </div>
  )
}
