var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require("mercadopago");
var port = process.env.PORT || 3000

var app = express();


// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181'
});
 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

mercadopago.configurations.setAccessToken("APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181");

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});
app.post("/create_preference", (req, res) => {

	let preference = {
		items: [{
			title: req.body.description,
			unit_price: Number(req.body.price),
			quantity: Number(req.body.quantity),
		}],
		back_urls: {
			"success": "http://"+port+"/home",
			"failure":  "http://"+port+"/home",
			"pending":  "http://"+port+"/home"
		},
		auto_return: 'approved',
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function(request, response) {
	 response.json({
		Payment: request.query.payment_id,
		Status: request.query.status,
		MerchantOrder: request.query.merchant_order_id
	})
});

app.listen(port);