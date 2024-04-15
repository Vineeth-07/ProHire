describe("ProHire tests", () => {
  const url = "http://localhost:3000";
  let authToken;
  before(() => {
    cy.request("POST", `${url}/user/signup`, {
      name: "test",
      gender: "male",
      qualification: "test",
      email: "hello@example.com",
      password: "123456789",
    }).then((response) => {
      authToken = response.body.token;
    });
  });

  beforeEach(() => {
    cy.request("POST", `${url}/user/signin`, {
      email: "hello@example.com",
      password: "123456789",
    }).then((response) => {
      authToken = response.body.token;
    });
  });

  it("Signup new user", () => {
    cy.request("POST", `${url}/user/signup`, {
      name: "test",
      gender: "male",
      qualification: "test",
      email: "test@example.com",
      password: "123456789",
    })
      .then((response) => {
        authToken = response.body.token;
      })
      .its("status")
      .should("eq", 200);
  });

  it("User login", () => {
    cy.request("POST", `${url}/user/signin`, {
      name: "test",
      gender: "male",
      qualification: "test",
      email: "test@example.com",
      password: "123456789",
    })
      .then((response) => {
        authToken = response.body.token;
      })
      .its("status")
      .should("eq", 200);
  });

  it("Fetch posts", () => {
    cy.request({
      method: "GET",
      url: `${url}/post`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .its("status")
      .should("eq", 200);
  });

  it("Create a new post", () => {
    cy.request({
      method: "POST",
      url: `${url}/post/createpost`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: {
        aitext:
          "Full stack developer at Amazon with 25Lpa with 2 years experience at London, last date to apply is May end",
      },
    })
      .its("status")
      .should("eq", 201);
  });
});
