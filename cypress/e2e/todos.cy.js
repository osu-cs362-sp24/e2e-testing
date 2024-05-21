it("creates a to-do", function () {
  cy.visit("/")
  cy.findByPlaceholderText("Enter a To-Do")
    .type("Add our first to-do")
  cy.findByRole("button", { name: "Add To-Do" })
    .click()
  cy.findByText("Add our first to-do")
    .should("exist")
})

it("completes a to-do", function () {
  cy.visit("/")
  cy.addTodo("Complete this to-do")
  cy.completeTodo("Complete this to-do")
  cy.findByTestId("completed-todos")
    .should("contain", "Complete this to-do")
  cy.findByTestId("incomplete-todos")
    .should("not.contain", "Complete this to-do")
})

it("deletes a to-do", function () {
  cy.visit("/")
  cy.addTodo("Delete this to-do")
  cy.completeTodo("Delete this to-do")
  cy.archiveTodo("Delete this to-do")
  cy.findByRole("link", { name: "Archive" }).click()
  cy.deleteTodo("Delete this to-do")

  cy.document().its("body")
    .should("not.contain", "Delete this to-do")
  cy.findByRole("link", { name: "Home" }).click()
  cy.document().its("body")
    .should("not.contain", "Delete this to-do")
})
