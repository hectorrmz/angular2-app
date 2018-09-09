(function() {
  var express = require('express');
  var url = require('url');
  var bodyParser = require('body-parser');
  var request = require('request');

  var app = express();

  app.get('/', function(req, res) {
    res.sendFile(__dirname + '/wwwroot/index.html');
  });

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  app.post('/user', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    if (!username || !password) {
      res.status('400').send({ message: 'Could not find username or password' });
    }

    var encode = Buffer.from(username + ':' + password).toString('base64');

    var options = {
      protocol: 'https',
      host: `${username}:${password}@dev.unosquare.com`,
      pathname: '/redmine/users/current.json',
    };

    var jsonUrl = url.format(options);

    request(jsonUrl)
      .on('response', function(response) {
        if (response.statusCode === 401) {
          res.status('400').send({ message: 'Invalid username or password' });
        }
      })
      .pipe(res);
  });

  authorizeService = function(req, res, next) {
    next();
  };

  app.get('/projects', function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if (!req.header('x-redmine-api-key')) {
      res.status('401').send({ message: 'Not Authorized' });
    }

    var options = {
      protocol: 'https',
      host: 'dev.unosquare.com',
      pathname: '/redmine/projects.json',
    };

    var jsonUrl = url.format(options);

    var options = {
      url: jsonUrl,
      headers: {
        'X-Redmine-API-Key': req.header('x-redmine-api-key'),
      },
    };

    request(options).pipe(res);
  });

  app.get('/issues', function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if (!query.id) {
      res.status('401').send({ message: 'Not Authorized' });
    }

    var options = {
      protocol: 'https',
      host: 'dev.unosquare.com',
      pathname: '/redmine/issues.json',
      query: { assigned_to_id: query.id },
    };

    var jsonUrl = url.format(options);

    var requestOptions = {
      url: jsonUrl,
      headers: {
        'X-Redmine-API-Key': req.header('x-redmine-api-key'),
      },
    };

    request(requestOptions).pipe(res);
  });

  app.get('/activities', function(req, res) {
    var url_parts = url.parse(req.url, true);

    var options = {
      protocol: 'https',
      host: 'dev.unosquare.com',
      pathname: '/redmine/enumerations/time_entry_activities.json',
    };

    var jsonUrl = url.format(options);

    var requestOptions = {
      url: jsonUrl,
      headers: {
        'X-Redmine-API-Key': req.header('x-redmine-api-key'),
      },
    };

    request(requestOptions).pipe(res);
  });

  app.get('/times', function(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    if (!query.id && !query.issue_id && !query.spend_on) {
      res.status('401').send({ message: 'Not Authorized' });
    }

    var options = {
      protocol: 'https',
      host: 'dev.unosquare.com',
      pathname: '/redmine/time_entries.json',
      query: {
        issue_id: query.issue_id,
        user_id: query.id,
        spent_on: query.spend_on,
        limit: 99,
      },
    };

    var jsonUrl = url.format(options);

    console.log(jsonUrl);

    var requestOptions = {
      url: jsonUrl,
      headers: {
        'X-Redmine-API-Key': req.header('x-redmine-api-key'),
      },
    };

    request(requestOptions).pipe(res);
  });

  app.post('/times', function(req, res) {
    var times = req.body;
    var entries = [];

    for (var i = 0; i < times.length; i++) {
      var entry = {
        comments: times[i].title,
        hours: times[i].duration,
        spend_on: times[i].date,
        activity_id: times[i].activity.id,
        issue_id: times[i].issueId,
      };

      entries.push(entry);
    }

    entries.forEach(entry => {
      console.log(entry);
    });

    res.send(entries);
  });

  app.post('/token', function(req, res) {
    var code = req.body.code;

    if (!code) {
      res.status('400').send({ message: 'Could not find ourlook code' });
    }

    var options = {
      protocol: 'https',
      host: `login.microsoftonline.com`,
      pathname: '/common/oauth2/v2.0/token',
    };

    var jsonUrl = url.format(options);

    request({
      url: jsonUrl,
      method: 'POST',
      form: {
        client_id: 'f4fc957d-8eaf-4147-83c9-82360e2ee051',
        scope: 'calendars.read',
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:5000/',
        client_Secret: 'gmnRMU6854%rrjxEEAN4@[^',
      },
    })
      .on('response', function(response) {})
      .pipe(res);
  });

  app.get('/events', function(req, res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

        var options = {
          protocol: 'https',
          host: 'outlook.office365.com/',
          pathname: 'api/v1.0/me/calendarview',
          query: {
            startDateTime: query.startDateTime,
            endDateTime: query.endDateTime,
            top: 99
          }
        };

        var jsonUrl = url.format(options);

        var requestOptions = {
          url: jsonUrl,
          headers: {
            'Authorization': req.header('authorization'),
          },
        };

        request(requestOptions).pipe(res);
  });

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  app.use(express.static(__dirname + '/wwwroot/'));

  var port = Number(process.env.PORT || 5000);

  app.listen(port, function() {
    console.log('Listening on ' + port);
  });
})();
