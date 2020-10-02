Cypress.Commands.add("login", () => {
  window.localStorage.setItem(
    "usr",
    JSON.stringify({
      id: "bd5e4770-01ea-413a-9b8e-f7319dffa6e4",
      name: "Marcio Junior",
      email: "marcio@laboratorio.com",
      createdAt: "2020-09-29T21:00:00.000Z",
      updatedAt: "2020-09-29T21:00:00.000Z"
    })
  );
  window.localStorage.setItem(
    "tkn",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJkNWU0NzcwLTAxZWEtNDEzYS05YjhlLWY3MzE5ZGZmYTZlNCIsIm5hbWUiOiJNYXJjaW8gSnVuaW9yIiwiZW1haWwiOiJtYXJjaW9AbGFib3JhdG9yaW8uY29tIiwiaWF0IjoxNjAxNjEwODUwfQ.HyXp0aTtwPys1lB9zxkckhE2xXPERyG59aIkh9dio9k"
  );
});
