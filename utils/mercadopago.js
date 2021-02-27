//Handle call to backend and generate preference.
document.getElementById("checkout-btn").addEventListener("click", function() {
    console.log("si entro a js");
    $('#checkout-btn').attr("disabled", true);
    
    var orderData = {
      quantity: document.getElementById("quantity").value,
      description: document.getElementById("product-description").innerHTML,
      price: document.getElementById("unit-price").innerHTML
    };
      
    fetch("/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(orderData),
      })
        .then(function(response) {
            return response.json();
        })
        .then(function(preference) {
            createCheckoutButton(preference.id);
            $(".shopping-cart").fadeOut(500);
            setTimeout(() => {
                $(".container_payment").show(500).fadeIn();
            }, 500);
        })
        .catch(function() {
            alert("Unexpected error");
            $('#checkout-btn').attr("disabled", false);
        });
  });
  
  //Create preference when click on checkout button
  function createCheckoutButton(preference) {
    var script = document.createElement("script");
    
    // The source domain must be completed according to the site for which you are integrating.
    // For example: for Argentina ".com.ar" or for Brazil ".com.br".
    script.src = "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.type = "text/javascript";
    script.dataset.preferenceId = preference;
    document.getElementById("button-checkout").innerHTML = "";
    document.querySelector("#button-checkout").appendChild(script);
  }