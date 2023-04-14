describe('Biblos App', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:3001/register-user')
  })

  it('La pagina abre sin problemas', () => {
    cy.contains('REGISTRARSE')
  })

  it('El formulario del login abre sin problemas', () => {
    cy.contains('.login-btn').click()
  })

})