exports.getDiscount = (original) => {
  //?Obtener un numero random de 50 a 150 y restarlo al precio original

  const randomNum = Math.floor(Math.random() * 101) + 50;
  return original - randomNum;
};

const Swal = require("sweetalert2");
// ...
exports.showAlert = () => {
  // ... procesamiento del formulario ...
  const message = "Se ha creado el objeto correctamente";

  setTimeout(() => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong!",
      footer: '<a href="">Why do I have this issue?</a>',
    });
    console.log("klk");
  }, 2000);
};
