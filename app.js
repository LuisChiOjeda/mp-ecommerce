var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require("mercadopago");
const bodyParser = require('body-parser');
var port = process.env.PORT || 3000

var app = express();


// Agrega credenciales
mercadopago.configure({
  access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181'
});

app.use(express.urlencoded({ extended: false }));
//app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
app.use(express.static('utils'));
 
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/utils', express.static(__dirname + '/utils'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// mercadopago.configurations.setAccessToken("APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181");

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});
app.post("/createpreference", (req, res) => {
console.log("//////////////////////");
console.log(req.body);
	let preference = {
		items: [{
			title: req.body.title,
			unit_price: req.body.price,
			quantity: req.body.quantity,
		}],
		back_urls: {
			"success": "http://localhost:3000/",
			"failure": "http://localhost:3000/",
			"pending": "http://localhost:3000/"
		},
		auto_return: 'approved',
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log("aqui esta el error");
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
console.log("Servidor corriendo en el puerto");
console.log("http://localhost:3000/");

