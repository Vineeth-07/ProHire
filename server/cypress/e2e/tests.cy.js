describe("ProHire tests", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3000/post/createpost", {
      title: "test",
      company: "test company",
      description: "test description",
      location: "test location",
      salary: "test salary",
      date: "01-01-2024",
      deadline: "01-02-2024",
      experience: "test experience",
    });
  });

  it("Fetch posts", () => {
    cy.request("GET", "http://localhost:3000/post")
      .its("status")
      .should("eq", 200);
  });

  it("Create a new post", () => {
    cy.request("POST", "http://localhost:3000/post/createpost", {
      title: "test",
      company: "test company",
      description: "test description",
      location: "test location",
      salary: "test salary",
      date: "01-01-2024",
      deadline: "01-02-2024",
      experience: "test experience",
    })
      .its("status")
      .should("eq", 201);
  });
});
