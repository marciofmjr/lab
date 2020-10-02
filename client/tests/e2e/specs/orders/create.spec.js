beforeEach(() => {
  cy.login();
});

describe("Orders Create", () => {
  it("Should render page title", () => {
    cy.visit("/panel/orders/create");
    cy.get("h1").should("contain", "Criar Ordem de Serviço");
  });

  it("Should create order", () => {
    cy.visit("/panel/orders/create");

    cy.get(":nth-child(1) > :nth-child(1) > .v-input").click();
    cy.get("#list-item-66-0").click();

    cy.get(":nth-child(1) > :nth-child(2) > .v-input").click();
    cy.get("#list-item-72-0").click();

    cy.get(":nth-child(1) > :nth-child(3) > .v-input").click();
    cy.get("#list-item-81-0").click();

    cy.get("#healthInsurance").type("Unimed");

    cy.get(".col-md-8 > .v-input").click();
    cy.get("#list-item-88-1").click();
    cy.get("#list-item-88-2").click();

    cy.get("#submit").click();

    cy.get(".swal-title").should("contain", "Sucesso");
  });
});
