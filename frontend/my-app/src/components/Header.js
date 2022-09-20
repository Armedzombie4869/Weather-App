import React,{useState,useEffect} from 'react';
import axios from 'axios';
import config from './config';


export default function Header() {
    const [user,setUser] = useState(null);
  useEffect(()=> {
   const token = localStorage.getItem('token');
   axios.get(`${config.authURL}profile`,{headers: {
    Authorization: token
   }}).then(res =>{
    setUser(res.data.user);
   }).catch(err => {
    console.log(err);
   })
    
  },[]);
   

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">
                <img src='./img/sun.png' width="30"
                    height="30" className="d-inline-block align-top" alt="Sun logo" />{' '}Weather App
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">


                    {!localStorage.getItem('token') ? (
                        <>
                            <li className="nav-item active">
                                <a className="nav-link" href="register">Register</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="login">Login</a>
                            </li>
                        </>

                    ) : (<>
                        <li className="nav-item">
                            <a className="nav-link">Welcome {user?.firstname} {user?.lastname}</a>
                            
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="watchlist">WatchList</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login" onClick={() => localStorage.clear()}>Logout</a>
                        </li>
                        
                    </>
                    )}

                </ul>

            </div>
        </nav>
        
    )
}
