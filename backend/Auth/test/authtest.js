const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server');
chai.should();
chai.use(chaiHttp);


describe('Testing For Authentication ', () => {

    describe("1 - Register a  new User/register", () => {
        it("Register User", (done) => {
            let user =
            {
                "firstname":"Prabhat",
                "lastname":"Kumar",
                "city":"New Delhi",
                "country":"India",
                "email":"prabhat@gmail.com",
                "password":"123456"
            
            }
            chai.request(app)
                .post("/register")
                .send(user)
                .end( (err, res) => {
                    
                    res.should.have.status(200);
                    
                    res.body.should.have.property('message').eql("User registered successfully");
                    done();
                })
    
        });
    })
    describe("Check for user data after new User/register", () => {
        it("2-Register User", (done) => {
            let user =
            {
                "firstname":"Prabhat",
                "lastname":"Kumar",
                "city":"New Delhi",
                "country":"India",
                "email":"prabhat@gmail.com",
                "password":"123456"
            
            }
            chai.request(app)
                .post("/register")
                .send(user)
                .end( (err, res) => {
                    
                    res.should.have.status(200);
                    
                    res.body.should.have.property('user');
                    done();
                })
    
        });
    })

    describe("POST login", () => {
        it(" 3 - Login to The website ", (done) => {
            chai.request(app)
                .post("/login")
                .send({
                    email: 'sanskar192000@gmail.com',
                    password: '12345'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    


                    done();
                });
        });
        it(" 4 - Login With Wrong Credentials", (done) => {
            chai.request(app)
                .post("/login")
                .send({
                    email: 'sanskar@gmail.com',
                    password: '1234'
                })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message');
                    done();
                });
        });
    })




});



