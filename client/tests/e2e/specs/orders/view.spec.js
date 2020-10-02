beforeEach(() => {
  cy.login();
});

describe("Orders View", () => {
  it("Should render order document", () => {
    cy.visit("/panel/orders/view/f8b54458-f114-4dd8-a444-d57ccea10fa4");

    cy.get("#code").should("contain", "f8b54458-f114-4dd8-a444-d57ccea10fa4");

    cy.get("#titleCustomer").should("contain", "Paciente");
    cy.get("#customerName").should("contain", "Marcio Junior");
    cy.get("#customerGender").should("contain", "Masculino");
    cy.get("#customerBirthday").should("contain", "05/10/1994");
    cy.get("#customerAddress").should(
      "contain",
      "R. Elza Foelkel Bergamo, 425 - Macedo Telles, São José do Rio Preto - SP, 15040-420"
    );

    cy.get("#titleDoctor").should("contain", "Médico");
    cy.get("#doctorName").should("contain", "Dr Carlos Antônio Júnior");
    cy.get("#doctorSpecialty").should("contain", "Cardiologista");

    cy.get("#titleCollectPoint").should("contain", "Ponto Coleta");
    cy.get("#collectPointName").should("contain", "UBS Santo Antonio");
    cy.get("#collectPointAddress").should(
      "contain",
      "R. Ida Tagliavini Polachini, 580 - Jardim Santo Antônio, São José do Rio Preto - SP, 15047-162"
    );

    cy.get("#titleExam").should("contain", "Exames");
    cy.get("#exam_0").should("contain", "Ecocardiograma");
    cy.get("#exam_1").should("contain", "Eletrocardiograma");
  });
});
