beforeEach(() => {
  cy.login();
});

describe("Dashboard", () => {
  it("Should render dashboard", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Dashboard");
  });
});
