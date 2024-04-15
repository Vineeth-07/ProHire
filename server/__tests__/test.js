const request = require("supertest");
const db = require("../models/index");
const app = require("../app");
const jwt = require("jsonwebtoken");

let server;
// tests
describe("ProHires test cases", () => {
  let authToken;

  beforeAll(async () => {
    server = app.listen(9000, () => {});
    agent = request.agent(server);

    authToken = jwt.sign({ id: 1 }, process.env.SECRET, { expiresIn: "1h" });
  });

  afterAll(async () => {
    try {
      await db.sequelize.close();
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("Signup new user", async () => {
    res = await agent.post("/user/signup").send({
      name: "test",
      gender: "male",
      qualification: "test",
      email: "hello@example.com",
      password: "123456789",
    });
    expect(res.statusCode).toBe(200);
  });

  test("User login", async () => {
    res = await agent.post("/user/signin").send({
      email: "hello@example.com",
      password: "123456789",
    });
    expect(res.statusCode).toBe(200);
  });

  test("Retrieve posts", async () => {
    const response = await request(server)
      .get("/post")
      .set("Authorization", `Bearer ${authToken}`);
    expect(response.statusCode).toBe(200);
  });

  test("Creating post", async () => {
    const response = await request(server)
      .post("/post/createpost")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        aitext:
          "Full stack developer at Amazon with 25Lpa with 2 years experience at London, last date to apply is May end",
      });
    expect(response.statusCode).toBe(201);
  });
});
