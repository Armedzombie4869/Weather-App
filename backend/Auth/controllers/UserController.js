const UserModel = require('../models/UserModel');
const OtpModel = require('../models/OtpModel');
const ListModel = require('../models/ListModel');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

function register(req,res) {
    const user = new UserModel({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        city:req.body.city,
        country:req.body.country,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10)
    })
    UserModel.findOne({email:user.email}).then(response => {
        if(!response){
            user.save().then(user => {
                res.send({
                    success:true,
                    message:'User registered successfully',
                    user : {
                        id: user._id,
                        firstname: user.firstname,
                        lastname:user.lastname,
                        email: user.email,
                        city:user.city,
                        country:user.country
                    }
                })
            }).catch(err => {
                res.status(404).send({
                    success:false,
                    message:"Something went wrong",
                    error:err
                })
            })
        }
        else if(response) {
            res.status(401).send({
                success:false,
                message:"Email already exist",
            })
        }
        else{
            res.send('Error');
        }
    })
            
       
}


function login(req,res){
    UserModel.findOne({email: req.body.email}).then(user => {
        if(!user){
            return res.status(401).send({
                success:false,
                message:'Could not find user'
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).send({
                success:false,
                message:'Incorrect password'
            })
        }
        const payload = {
            email: user.email,
            id:user._id
        }
        const token = jwt.sign(payload,"Random string",{expiresIn:"1h"});
        return res.status(200).send({
            success: true,
            message:"Logged in successfully",
            token: "Bearer "+ token
        })
    })
}


function getUser(req,res){
    return res.status(200).send({
        success:true,
        user: {
            id:req.user._id,
            firstname: req.user.firstname,
            lastname:req.user.lastname,
            city:req.user.city,
            country:req.user.country,
            email:req.user.email
        }
        
    })
}

function emailSend(req,res){
    UserModel.findOne({email:req.body.email}).then(user=> {
        if(!user){
            return res.send({
                success:false,
                message:"User does not exist"
            })
        }else{
            let otpcode = Math.floor((Math.random()*10000)+1);
            let otpData = new OtpModel({
                email:req.body.email,
                code:otpcode,
                expiresIn: new Date().getTime()+ 300*1000
            })
            otpData.save().then(resp => {
                mailer(req.body.email,otpData.code)
                res.send({
                    success:true,
                    message:'Check your email for OTP'
                })
            }).catch(err => {
                res.send({
                    success:false,
                    message:err
                })
            })
        }
        
    })
}

function changePassword(req,res) {
    OtpModel.findOne({code:req.body.otp}).then(data => {
        if(data){
            let currTime = new Date().getTime();
            let diff = data.expiresIn - currTime;
            if(diff< 0) {
                res.send({
                    success:false,
                    message:'OTP expired'
                })
            }
            else{
                const newPass= bcrypt.hashSync(req.body.password);
                UserModel.updateOne({email:data.email},{password:newPass},(err,data) => {
                    if(!err){
                        res.send({
                            success:true,
                            message:'Password change successful'
                        })
                    }
                    else{
                        res.send({
                            success:false,
                            message:'Something went wrong'
                        })
                    }
                })

            }
        }
    })
}

function mailer(email,otp){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port:587,
        secure: false,
        auth: {
            user: 'armedzombie4869@gmail.com',
            pass: 'waqfrhvpaphathus'
        }
    });

    const mailOptions = {
        from: 'armedzombie4869@gmail.com',
        to: email,
        subject: 'OTP for password reset',
        text:`This is your requested OTP:${otp}`
    }

    transporter.sendMail(mailOptions, function(err,info){
        if(err){
            console.log(err);
        }
        else{
            console.log('Email sent: '+info.response);
        }
    })
}

function Addtolist(req,res) {
    ListModel.findOne({email:req.user.email,city:req.body.city}).then(item =>{
        if(!item){
            const item = new ListModel({
                email: req.user.email,
                city:req.body.city
             })
             item.save().then(user => {
                 res.send({
                     success:true,
                     message:'City added successfully',
                     user : {
                         city:user.city
                     }
                 })
             }).catch(err => {
                 res.send({
                     success:false,
                     message:"Something went wrong",
                     error:err
                 })
         })
        }
        else if(item){
            res.send('Item already exist')
        }
        else{
            res.send(err);
        }
    }).catch(err => {
        res.send(err);
    })
    
}

function getList(req,res){
    ListModel.find({email:req.user.email}).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
}

function deleteItemList(req,res) {
    const id =req.params.id;
    ListModel.deleteOne({_id:id},(err,data) => {
        if(!err){
            return res.send({
                success:true,
                message:'Item deleted successfully'
            })
        }
        else {
            return res.send({
                success:false,
                message:err
            })
        }
    })
}

function editprofile(req,res) {
    UserModel.updateOne({email:req.user.email},{firstname:req.body.firstname,lastname:req.body.lastname,city:req.body.city,country:req.body.country},(err,data) => {
        if(!err){
            res.send({
                success:true,
                message:'Data updated successful'
            })
        }
        else{
            res.send({
                success:false,
                message:'Something went wrong'
            })
        }
    })
}


module.exports = {register,login,getUser,emailSend,changePassword,Addtolist,getList,deleteItemList,editprofile};