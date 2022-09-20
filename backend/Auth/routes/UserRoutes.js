
const express = require('express');
const passport = require('passport');
const {register,login,getUser,changePassword,emailSend,Addtolist,getList,deleteItemList,editprofile} = require('../controllers/UserController');
const router = express.Router();


router.post('/register',register);
router.post('/login',login);
router.get('/profile',passport.authenticate('jwt',{session:false}),getUser);
router.put('/editprofile',passport.authenticate('jwt',{session:false}),editprofile);
router.post('/emailsend',emailSend);
router.post('/changepassword',changePassword);
router.post('/addtolist',passport.authenticate('jwt',{session:false}),Addtolist);
router.get('/watchlist',passport.authenticate('jwt',{session:false}),getList);
router.delete('/deleteitem/:id',passport.authenticate('jwt',{session:false}),deleteItemList)


module.exports = router;