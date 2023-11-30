const chai = require("chai");
const chaiHttp = require("chai-http");
const _ = require('lodash');

const { ArticleModel } = require('./database')

const app = require("./index");
const { article, differentArticle } = require("./constants");

const articleKeys = Object.keys(article);

chai.use(chaiHttp);
const expect = chai.expect;

describe("Post", () => {
    it("Should create a new article", async () => {
      new ArticleModel(article)
      console.log(await ArticleModel.find());
  
      const res = await chai
        .request(app)
        .post("/articles")
        .send(article);
  
      console.log("Response:", res.error);
      console.log("Body:", res.body);
  
      expect(res).to.have.status(201);
      expect(_.pick(res.body, articleKeys)).to.deep.equal(article);
    });
  });

  describe("Get", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/articles")
        .send(article)
  
      createdArticle = response.body;
    });
  
    it("Should get all articles", async () => {
      const res = await chai
        .request(app)
        .get("/articles");
  
      expect(res.body).to.be.an("array");
      expect(res.body.some(article => article._id === createdArticle._id)).to.be.true;
    });
  
    it("Should get one article by id", async () => {
      const res = await chai
        .request(app)
        .get(`/articles/${createdArticle._id}`);
  
      expect(res.body).to.deep.equal(createdArticle);
    });
  })

  describe("Update", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/articles")
        .send(article)
  
        createdArticle = response.body;
    });
  
    it("Should update(patch) article by id", async () => {
      const difference = { numberOfImages: 7 }
  
      const res = await chai
        .request(app)
        .patch(`/articles/${createdArticle._id}`)
        .send(difference);
  
      expect(res.body).to.deep.equal({ ...createdArticle, ...difference });
    });
  
    it("Should update(put) article by id", async () => {
      const res = await chai
        .request(app)
        .put(`/articles/${createdArticle._id}`)
        .send(differentArticle);
  
      expect(res.body).to.deep.equal({ ...createdArticle, ...differentArticle });
    });
  })

  describe("Delete", () => {
    before(async () => {
      const response = await chai
        .request(app)
        .post("/articles")
        .send(article)
  
        createdArticle = response.body;
    });
  
    it("Should delete article by id", async () => {
      const res = await chai
        .request(app)
        .delete(`/articles/${createdArticle._id}`);
  
      expect(res.body).to.deep.equal(createdArticle);
    });
  })