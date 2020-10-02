beforeEach(() => {
  // cy.login();
});

describe("Login", () => {
  it("Should login", () => {
    cy.visit("/login");
    cy.get("#email").type("marcio@laboratorio.com");
    cy.get("#password").type("admin123");
    cy.get(".v-btn").click();
    cy.get("h1").should("contain", "Dashboard");
  });
});
