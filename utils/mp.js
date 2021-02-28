//Handle call to backend and generate preference.
function mp(){
 console.log("si entro al js");
 let cant = document.getElementById("q").innerHTML; 
 let price = document.getElementById("unit-price").innerHTML;
 let price_total= Number(cant*price);
    
    document.getElementById('summary-total').innerHTML=price_total;

var orderData = {      
      //id: 12,
      title: document.getElementById("product-description").innerHTML,
      price: Number(price),
      quantity: Number(cant),
    };
    console.log(orderData);

    fetch('/createpreference', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  
                'Authorization': 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181'
            },
            body: JSON.stringify(orderData),            
      })
        .then(function(response) {
            return response.json();
        })
        .then(function(preference) {
          console.log(preference);
            createCheckoutButton(preference.id);
            $(".shopping-cart").fadeOut(500);
            setTimeout(() => {
                $(".container_payment").show(500).fadeIn();
            }, 500);
        })
        .catch(function() {
            alert("Error de inicio");
            $('#checkout-btn').attr("disabled", false);
        });


}  
  //Create preference when click on checkout button
  function createCheckoutButton(preference) {
    var script = document.createElement("script");
    
    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src = "https://www.mercadopago.com.mx/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference;
    document.getElementById("button-checkout").innerHTML = "";
    document.querySelector("#button-checkout").appendChild(script);
  }
