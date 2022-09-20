const chai= require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const server =require('../server');

chai.should();

chai.use(chaiHttp);

describe('Weather Api',() => {

    describe("GET /getweather/:city",() => {
        it("It should get the data based on city name ",(done => {
            chai.request(server).get('/getweather/New Delhi').end((err,response) => {
                response.should.have.status(200);
                done();
            })
        }))
    })

    describe("GET /getweather/:city", ()=>{
        it("It should return the data type as object",(done)=>{
            chai.request(server)
                .get("/getweather/New Delhi")
                .end((err,response)=>{
                    response.body.should.be.a('object');
                done();
                })
        })
    })

    describe("GET /getweather/:city", ()=>{
        it("The length of the array must be 1",(done)=>{
            chai.request(server)
                .get("/getweather/New Delhi")
                .end((err,response)=>{
                    response.body.weather.length.should.be.eq(1);
                done();
                })
        })
    })

    describe("GET /getweather/:city", ()=>{
        it("The response object should have property coord",(done)=>{
            chai.request(server)
                .get("/getweather/New Delhi")
                .end((err,response)=>{
                    response.body.should.have.property('coord');
                done();
                })
        })
    })

    describe("GET /getweather/:city", ()=>{
        it("The response object should have property main",(done)=>{
            chai.request(server)
                .get("/getweather/New Delhi")
                .end((err,response)=>{
                    response.body.should.have.property('main');
                done();
                })
        })
    })


})