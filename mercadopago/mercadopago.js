document.getElementById("checkout-btn").addEventListener("click", function() {

  // SDK de Mercado Pago
const mercadopago = require ('mercadopago');

// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181'
});

  $('#checkout-btn').attr("disabled", true);
  
// Crea un objeto de preferencia
let preference = {
  items: [
    {
      title: document.getElementById("product-description").innerHTML,
      unit_price: document.getElementById("unit-price").innerHTML,
      quantity: document.getElementById("quantity").value,
    }
  ]
};

mercadopago.preferences.create(preference)
.then(function(response){
// Este valor reemplazará el string "<%= global.id %>" en tu HTML
  global.id = response.body.id;
}).catch(function(error){
  console.log(error);
});

});
          




