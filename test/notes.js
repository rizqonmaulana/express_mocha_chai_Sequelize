let chai = require("chai");
let chaiHttp = require("chai-http");
require("../server");

const API = "http://localhost:3000";

chai.should();
// const expect = chai.expect;

chai.use(chaiHttp);

let noteId;

describe("Notes API", () => {
  // Note GET
  describe("GET /api/note", () => {
    it("It should GET all tasks", (done) => {
      chai
        .request(API)
        .get("/api/note")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // Note GET by user id
  describe("GET /api/note/user/:id", () => {
    it("It should GET notes by user id", (done) => {
      chai
        .request(API)
        .get("/api/note/user/1")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  // NOTE GET BY ID
  describe("GET /api/note/1", () => {
    it("It should GET 1 note from id", (done) => {
      chai
        .request(API)
        .get("/api/note/2")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("id");
          res.body.should.have.property("user_id");
          res.body.should.have.property("note_title");
          res.body.should.have.property("note_text");
          res.body.should.have.property("createdAt");
          res.body.should.have.property("updatedAt");
          res.body.should.have.property("id").eq(2);
          done();
        });
    });
  });

  // NOTE POST
  describe("POST /api/note", () => {
    it("It should POST note", (done) => {
      const note = {
        note_title: "new note title",
        note_text: "new note text",
        user_id: 2,
      };
      chai
        .request(API)
        .post("/api/note")
        .send(note)
        .end((err, res) => {
          noteId = res.body.id;
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.not.have.property("errors");
          done();
        });
    });
  });

  // NOTE PUT
  describe("GET /api/note/:id", () => {
    it("It should UPDATE a note", (done) => {
      const note = {
        note_title: "new note title changed",
        note_text: "new note text changed",
        user_id: 2,
      };
      chai
        .request(API)
        .put(`/api/note/${noteId}`)
        .send(note)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("note_title")
            .eq("new note title changed");
          res.body.should.have
            .property("note_text")
            .eq("new note text changed");
          // res.body.should.have.property("completed").eq(true);
          res.body.should.not.have.property("errors");
          done();
        });
    });
  });

  // NOTE DELETE
  describe("DELETE /api/note/:id", () => {
    it("It should DELETE an existing note", (done) => {
      chai
        .request(API)
        .delete("/api/note/" + noteId)
        .end((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.body.should.have.property("message").eq("success deleted");
          done();
        });
    });

    it("It should NOT DELETE a note that is not in the database", (done) => {
      chai
        .request(API)
        .delete("/api/note/" + noteId)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have
            .property("message")
            .eq(noteId + " not found in db");
          done();
        });
    });
  });
});
