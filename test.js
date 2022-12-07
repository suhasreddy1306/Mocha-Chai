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
                    //response.body.should.be.eq(2);
                done();
                });
        });

        it("It should NOT GET all the tasks", (done) => {
            chai.request(App)
                .get("/peoples")
                .end((err, response) => {
                    response.should.have.status(404);
                done();
                });
        });
    });
});

describe("POST /people", () => {
    it("It should POST a new task", (done) => {
        chai.request(App)                
            .post("/people")
            .send({name: "XYZ"})
            .end((err, response) => {
                response.should.have.status(201);
                //response.body.should.have.property('success').eq(true);
                response.body.should.have.property('name').eq("XYZ");
            done();
            });
    });
})

/**
     * Test the PUT route
     */
    describe("PUT /people/:id", () => {
        it("It should PUT an existing task", (done) => {
            const peopleId = 1;
            const people = {
                name: "Task 1 changed"
                //completed: true
            };
            chai.request(App)                
                .put("/people/" + peopleId)
                .send(people)
                .end((err, response) => {
                    //response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('name').eq("Task 1 changed");
                    //response.body.should.have.property('completed').eq(true);
                done();
                });
        });
        
    });

    describe("DELETE /people/:id", () => {
        it("It should DELETE an existing task", (done) => {
            const peopleId = 1;
            chai.request(App)                
                .delete("/people/" + peopleId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT DELETE a task that is not in the database", (done) => {
            const peopleId = 145;
            chai.request(App)                
                .delete("/people/" + peopleId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("The task with the provided ID does not exist.");
                done();
                });
        });

    });
