beforeEach(() => {
  cy.login();
});

describe("Customers Index", () => {
  it("Should render page title", () => {
    cy.visit("/panel/customers");
    cy.get("h1").should("contain", "Pacientes");
  });

  it("Should render data table header", () => {
    cy.visit("/panel/customers");
    cy.get("#customersTable thead > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Nome"
    );
    cy.get("#customersTable thead > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "Aniversário"
    );
    cy.get("#customersTable thead > :nth-child(1) > :nth-child(3)").should(
      "contain",
      "Sexo"
    );
    cy.get("#customersTable thead > :nth-child(1) > :nth-child(4)").should(
      "contain",
      "Endereço"
    );
  });

  it("Should render data table body", () => {
    cy.visit("/panel/customers");
    // Line 1
    cy.get("#customersTable tbody > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Marcio Junior"
    );
    cy.get("#customersTable tbody > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "05/10/1994"
    );
    cy.get("#customersTable tbody > :nth-child(1) > :nth-child(3)").should(
      "contain",
      "Masculino"
    );
    cy.get("#customersTable tbody > :nth-child(1) > :nth-child(4)").should(
      "contain",
      "R. Elza Foelkel Bergamo, 425 - Macedo Telles, São José do Rio Preto - SP, 15040-420"
    );

    // Line 2
    cy.get("#customersTable tbody > :nth-child(2) > :nth-child(1)").should(
      "contain",
      "Livia Maria"
    );
    cy.get("#customersTable tbody > :nth-child(2) > :nth-child(2)").should(
      "contain",
      "19/04/1997"
    );
    cy.get("#customersTable tbody > :nth-child(2) > :nth-child(3)").should(
      "contain",
      "Feminino"
    );
    cy.get("#customersTable tbody > :nth-child(2) > :nth-child(4)").should(
      "contain",
      "R. Antonio Carlos de Oliveira Bottas, 1820 - Parque Res. Universo, São José do Rio Preto - SP, 15041-585"
    );
  });
});
