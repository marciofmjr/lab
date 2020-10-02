beforeEach(() => {
  cy.login();
});

describe("Orders Index", () => {
  it("Should render page title", () => {
    cy.visit("/panel/orders");
    cy.get("h1").should("contain", "Ordens de Serviço");
  });

  it("Should render data table header", () => {
    cy.visit("/panel/orders");
    cy.get("#ordersTable thead > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Criado em"
    );
    cy.get("#ordersTable thead > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "Convênio"
    );
    cy.get("#ordersTable thead > :nth-child(1) > :nth-child(3)").should(
      "contain",
      "Cliente"
    );
    cy.get("#ordersTable thead > :nth-child(1) > :nth-child(4)").should(
      "contain",
      "Médico"
    );
    cy.get("#ordersTable thead > :nth-child(1) > :nth-child(5)").should(
      "contain",
      "Ponto de Coleta"
    );
  });

  it("Should render data table body", () => {
    cy.visit("/panel/orders");

    cy.get("#ordersTable tbody > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "29/09/2020 18:00"
    );
    cy.get("#ordersTable tbody > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "Unimed"
    );
    cy.get("#ordersTable tbody > :nth-child(1) > :nth-child(3)").should(
      "contain",
      "Marcio Junior"
    );
    cy.get("#ordersTable tbody > :nth-child(1) > :nth-child(4)").should(
      "contain",
      "Dr Carlos Antônio Júnior"
    );
    cy.get("#ordersTable tbody > :nth-child(1) > :nth-child(5)").should(
      "contain",
      "UBS Santo Antonio"
    );

    cy.get("#ordersTable tbody > :nth-child(2) > :nth-child(1)").should(
      "contain",
      "30/09/2020 18:00"
    );
    cy.get("#ordersTable tbody > :nth-child(2) > :nth-child(2)").should(
      "contain",
      "Austa"
    );
    cy.get("#ordersTable tbody > :nth-child(2) > :nth-child(3)").should(
      "contain",
      "Livia Maria"
    );
    cy.get("#ordersTable tbody > :nth-child(2) > :nth-child(4)").should(
      "contain",
      "Dra Andressa Mendes"
    );
    cy.get("#ordersTable tbody > :nth-child(2) > :nth-child(5)").should(
      "contain",
      "UBS Solo Sagrado"
    );
  });
});
