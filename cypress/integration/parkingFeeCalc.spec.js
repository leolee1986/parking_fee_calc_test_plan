/// <reference types="cypress" />

context("Testing the parking fee calculator", () => {
  beforeEach(() => {
    cy.visit("/parkcalc");
  });

  // test valet parking
  it("Test valet parking with less than 5 hour", () => {
    cy.get("#ParkingLot").select("Valet");
    cy.get("#StartingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#StartingDate").clear().type("10/13/2021");

    cy.get("#LeavingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#LeavingDate").clear().type("10/13/2021");

    cy.get("#StartingTime").clear().type("5:00");
    cy.get("#LeavingTime").clear().type("9:00");

    cy.get('[type="submit"]').click();
    cy.get("span.SubHead b").should("have.text", "$ 12.00");
  });

  // test short term hourly parking
  it("Test Short parking with less than 2.5 hour", () => {
    cy.get("#ParkingLot").select("Short");
    cy.get("#StartingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#StartingDate").clear().type("10/13/2021");

    cy.get("#LeavingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#LeavingDate").clear().type("10/13/2021");

    cy.get("#StartingTime").clear().type("5:00");
    cy.get("#LeavingTime").clear().type("7:30");

    cy.get('[type="submit"]').click();
    cy.get("span.SubHead b").should("have.text", "$ 5.00");
  });

  // test long term garage parking
  it("Test long term garage with more than 10 days", () => {
    cy.get("#ParkingLot").select("Long-Garage");
    cy.get("#StartingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#StartingDate").clear().type("10/13/2021");

    cy.get("#LeavingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#LeavingDate").clear().type("10/23/2021");

    cy.get("#StartingTime").clear().type("5:00");
    cy.get("#LeavingTime").clear().type("7:30");

    cy.get('[type="submit"]').click();
    cy.get("span.SubHead b").should("have.text", "$ 114.00");
  });

  // test long term surface parking north lot
  it("Test ong term surface parking north lot more than 10 days", () => {
    cy.get("#ParkingLot").select("Long-Surface");
    cy.get("#StartingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#StartingDate").clear().type("10/13/2021");

    cy.get("#LeavingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#LeavingDate").clear().type("10/23/2021");

    cy.get("#StartingTime").clear().type("5:00");
    cy.get("#LeavingTime").clear().type("7:30");

    cy.get('[type="submit"]').click();
    cy.get("span.SubHead b").should("have.text", "$ 96.00");
  });

  // test economy lat parking
  it("Test economy lot with more than 10 days", () => {
    cy.get("#ParkingLot").select("Economy");
    cy.get("#StartingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#StartingDate").clear().type("10/13/2021");

    cy.get("#LeavingDate")
      .invoke("val")
      .then((text) => {
        expect("MM/DD/YYYY").to.equal(text);
      });
    cy.get("#LeavingDate").clear().type("10/23/2021");

    cy.get("#StartingTime").clear().type("5:00");
    cy.get("#LeavingTime").clear().type("7:30");

    cy.get('[type="submit"]').click();
    cy.get("span.SubHead b").should("have.text", "$ 87.00");
  });


    // test leaving date before starting date
    it("test leaving date before starting date", () => {
        cy.get("#ParkingLot").select("Economy");
        cy.get("#StartingDate")
          .invoke("val")
          .then((text) => {
            expect("MM/DD/YYYY").to.equal(text);
          });
        cy.get("#StartingDate").clear().type("10/13/2021");
    
        cy.get("#LeavingDate")
          .invoke("val")
          .then((text) => {
            expect("MM/DD/YYYY").to.equal(text);
          });
        cy.get("#LeavingDate").clear().type("10/12/2021");
    
        cy.get("#StartingTime").clear().type("5:00");
        cy.get("#LeavingTime").clear().type("7:30");
    
        cy.get('[type="submit"]').click();
        cy.get("span.SubHead b").should("have.text", "ERROR! Your Leaving Date Or Time Is Before Your Starting Date or Time");
      });
});
