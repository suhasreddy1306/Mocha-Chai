let chai = require("chai");
let chaiHttp = require("chai-http");
let App = require("./application").App;

chai.should();

chai.use(chaiHttp);

describe('Tasks API', () => {

    describe("GET /people", () => {
        it("It should GET all the tasks", (done) => {
            chai.request(App)
                .get("/people")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                done();
                });
        });
    });
});

describe("POST /people", () => {
    it("It should POST a new task", (done) => {
        chai.request(App)                
            .post("/people")
            .send({name: "mmm"})
            .end((err, response) => {
                response.should.have.status(200);
                console.log(response);
                response.body.should.have.property('success').eq(true);
                response.body.should.have.property('name').eq("mmm");
            done();
            });
    });
})

describe("PUT /people:id", () => {
    it("It should PUT an existing task", (done) => {
        const taskId = 3;
        chai.request(App)                
            .put("/people/" + taskId)
            .send({name:"asdf"})
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('name').eq("asdf");
                response.body.should.have.property('success').eq(true);
            done();
            });
    });
});
describe("DELETE /people:id", () => {
    it("It should DELETE an existing task", (done) => {
        const taskId = 1;
        chai.request(App)                
            .delete("/people/" + taskId)
            .send({id:1})
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('success').eq(true);
            done();
            });
        });
});