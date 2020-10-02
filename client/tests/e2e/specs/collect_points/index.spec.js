beforeEach(() => {
  cy.login();
});

describe("Collect Points Index", () => {
  it("Should render page title", () => {
    cy.visit("/panel/collect-points");
    cy.get("h1").should("contain", "Pontos de Coleta");
  });

  it("Should render data table header", () => {
    cy.visit("/panel/collect-points");
    cy.get("#collectPointsTable thead > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Nome"
    );
    cy.get("#collectPointsTable thead > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "Endereço"
    );
  });

  it("Should render data table body", () => {
    cy.visit("/panel/collect-points");
    cy.get("#collectPointsTable tbody > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "UBS Santo Antonio"
    );
    cy.get("#collectPointsTable tbody > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "R. Ida Tagliavini Polachini, 580 - Jardim Santo Antônio, São José do Rio Preto - SP, 15047-162"
    );

    cy.get("#collectPointsTable tbody > :nth-child(2) > :nth-child(1)").should(
      "contain",
      "UBS Solo Sagrado"
    );
    cy.get("#collectPointsTable tbody > :nth-child(2) > :nth-child(2)").should(
      "contain",
      "R. Beatriz da Conceição, 406 - Solo Sagrado, São José do Rio Preto - SP, 15044-265"
    );

    cy.get("#collectPointsTable tbody > :nth-child(3) > :nth-child(1)").should(
      "contain",
      "UBS Eldorado"
    );
    cy.get("#collectPointsTable tbody > :nth-child(3) > :nth-child(2)").should(
      "contain",
      "Av. Nova Granada, 3320 - Eldorado, São José do Rio Preto - SP, 15043-430"
    );
  });
});
