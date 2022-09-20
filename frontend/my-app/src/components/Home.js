import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import WatchList from './WatchList';
import Error from './Error';
import Forgot from './Forgot';
import Weather from './Weather';
import ResetPassword from './ResetPassword';
import WeatherListDetail from './WeatherListDetail';
import EditProfile from './EditProfile';
import Action from './Action';
import Main from './Main';
export default function Home() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Action />} />
          <Route path="/weather/:city" element={<Weather />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/watchlist/:city" element={<WeatherListDetail />} />
          <Route path="/emailsend" element={<Forgot />} />
          <Route path="/changepassword" element={<ResetPassword />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  )
}
