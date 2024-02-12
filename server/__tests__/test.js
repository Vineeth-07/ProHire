const request = require("supertest");
const db = require("../models/index");
const app = require("../app");

let server;

describe("ProHires test cases", () => {
  beforeAll(async () => {
    server = app.listen(9000, () => {});
    agent = request.agent(server);
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });
  test("Sample test", () => {
    expect(true).toBe(true);
  });

  test("Retrieve posts", async () => {
    const response = await request(server).get("/post");
    expect(response.statusCode).toBe(200);
  });

  test("Creating post", async () => {
    const response = await request(server).post("/post/createpost").send({
      title: "test",
      company: "test company",
      description: "test description",
      location: "test location",
      salary: "test salary",
      date: "01-01-2024",
      deadline: "01-02-2024",
      experience: "test experience",
    });
    expect(response.statusCode).toBe(201);
  });
});