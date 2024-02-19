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
        title: "test",
        company: "test company",
        description: "test description",
        location: "test location",
        salary: "test salary",
        date: "01-01-2024",
        deadline: "01-02-2024",
        experience: "test experience",
      },
    })
      .its("status")
      .should("eq", 201);
  });
});
