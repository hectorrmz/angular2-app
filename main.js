(function () {
	var express = require("express");
	var url = require("url");
	var bodyParser = require('body-parser')
	var request = require("request");

	var app = express();

	app.get("/", function (req, res) {
		res.sendFile(__dirname + "/wwwroot/index.html");
	});

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json());


	app.post("/user", function (req, res) {

		var username = req.body.username;
		var password = req.body.password;

		if (!username || !password) {
			res.status("400").send({ message: "Could not find username or password" });
		}

		var encode = Buffer.from(username + ":" + password).toString("base64");

		var options = {
			protocol: "https",
			host: `${username}:${password}@dev.unosquare.com`,
			pathname: "/redmine/users/current.json"
		};

		var jsonUrl = url.format(options);

		request(jsonUrl).on('response', function (response) {
			if (response.statusCode === 401) {
				res.status("400").send({ message: "Invalid username or password" });
			}
		}).pipe(res);


	});

	app.get("/issues", function (req, res) {

		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;

		if (!query.key && !query.id) {
			res.status("401").send({ message: "Not Authorized" });
		}

		var options = {
			protocol: "https",
			host: "dev.unosquare.com",
			pathname: "/redmine/issues.json",
			query: { key: query.key, assigned_to_id: query.id }
		};

		var jsonUrl = url.format(options);
		request(jsonUrl).pipe(res);

	});

	app.get("/activities", function (req, res) {
		
				var url_parts = url.parse(req.url, true);
				var query = url_parts.query;
		
				if (!query.key) {
					res.status("401").send({ message: "Not Authorized" });
				}
		
				var options = {
					protocol: "https",
					host: "dev.unosquare.com",
					pathname: "/redmine/enumerations/time_entry_activities.json",
					query: { key: query.key }
				};
		
				var jsonUrl = url.format(options);
				request(jsonUrl).pipe(res);
		
			});

	app.get("/times", function (req, res) {

		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;

		if (!query.key && !query.id && !query.issue_id &&
			!query.spend_on) {
			res.status("401").send({ message: "Not Authorized" });
		}

		console.log(query);

		var options = {
			protocol: "https",
			host: "dev.unosquare.com",
			pathname: "/redmine/time_entries.json",
			query: {
				key: query.key,
				issue_id: query.issue_id,
				user_id: query.id,
				spent_on: query.spend_on,
				limit: 99
			}
		};

		var jsonUrl = url.format(options);
		console.log(jsonUrl);
		request(jsonUrl).pipe(res);

	});

	process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

	app.use(express.static(__dirname + "/wwwroot/"));

	var port = Number(process.env.PORT || 5000);

	app.listen(port, function () {
		console.log("Listening on " + port);

	});
}());