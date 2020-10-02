beforeEach(() => {
  cy.login();
});

describe("Exams Index", () => {
  it("Should render page title", () => {
    cy.visit("/panel/exams");
    cy.get("h1").should("contain", "Exames");
  });

  it("Should render data table header", () => {
    cy.visit("/panel/exams");
    cy.get("#examsTable thead > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Nome"
    );
    cy.get("#examsTable thead > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "Preço"
    );
  });

  it("Should render data table body", () => {
    cy.visit("/panel/exams");
    cy.get("#examsTable tbody > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Ecocardiograma"
    );
    cy.get("#examsTable tbody > :nth-child(2) > :nth-child(1)").should(
      "contain",
      "Eletrocardiograma"
    );
    cy.get("#examsTable tbody > :nth-child(3) > :nth-child(1)").should(
      "contain",
      "Hemograma"
    );
    cy.get("#examsTable tbody > :nth-child(4) > :nth-child(1)").should(
      "contain",
      "Glicemia em jejum"
    );
    cy.get("#examsTable tbody > :nth-child(5) > :nth-child(1)").should(
      "contain",
      "Colesterol e triglicerídeos"
    );
  });
});
