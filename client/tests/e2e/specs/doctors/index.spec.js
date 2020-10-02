beforeEach(() => {
  cy.login();
});

describe("Doctors Index", () => {
  it("Should render page title", () => {
    cy.visit("/panel/doctors");
    cy.get("h1").should("contain", "Médicos");
  });

  it("Should render data table header", () => {
    cy.visit("/panel/doctors");
    cy.get("#doctorsTable thead > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Nome"
    );
    cy.get("#doctorsTable thead > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "Especialidade"
    );
  });

  it("Should render data table body", () => {
    cy.visit("/panel/doctors");
    cy.get("#doctorsTable tbody > :nth-child(1) > :nth-child(1)").should(
      "contain",
      "Dr Carlos Antônio Júnior"
    );
    cy.get("#doctorsTable tbody > :nth-child(1) > :nth-child(2)").should(
      "contain",
      "Cardiologista"
    );

    cy.get("#doctorsTable tbody > :nth-child(2) > :nth-child(1)").should(
      "contain",
      "Dra Roberta Martins"
    );
    cy.get("#doctorsTable tbody > :nth-child(2) > :nth-child(2)").should(
      "contain",
      "Dermatologista"
    );

    cy.get("#doctorsTable tbody > :nth-child(3) > :nth-child(1)").should(
      "contain",
      "Dr Sebastião Filho"
    );
    cy.get("#doctorsTable tbody > :nth-child(3) > :nth-child(2)").should(
      "contain",
      "Endocrinologista"
    );

    cy.get("#doctorsTable tbody > :nth-child(4) > :nth-child(1)").should(
      "contain",
      "Dra Andressa Mendes"
    );
    cy.get("#doctorsTable tbody > :nth-child(4) > :nth-child(2)").should(
      "contain",
      "Neurologista"
    );

    cy.get("#doctorsTable tbody > :nth-child(5) > :nth-child(1)").should(
      "contain",
      "Dra Helena da Rocha"
    );
    cy.get("#doctorsTable tbody > :nth-child(5) > :nth-child(2)").should(
      "contain",
      "Oftalmologista"
    );
  });
});
