var path = require('path'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    iframeReplacement = require('../index.js');

function Server() {

    // create an instance of express
    var app = express();

    // add iframe replacement to express as middleware (adds res.merge method)
    app.use(iframeReplacement);

    // add handlebars view engine (you can use any)
    app.engine('hbs', exphbs());

    // let express know how to locate the views/templates
    app.set('views', path.resolve(__dirname, 'views'));
    app.set('view engine', 'hbs');

    // // create simple route to test our fake news
    // app.get('/:id', function(req, res) {

    //     var urls = [
    //         "https://www.xkcd.com/1",
    //         "https://www.twitter.com/realDonaldTrump/status/528286220418564096?lang=en",
    //         "https://www.reddit.com/r/popular/",
    //         "https://www.snopes.com/fact-check/brenda-lee-removed-air-force-one/",
    //         "https://www.downloadbreadcrumbs.com/#/tutorial1",
    //         "https://www.tomsguide.com/us/amazon-data-breach,news-28610.html",
    //         "https://www.twitter.com/PrisonPlanet/status/1060344443616800768"

    //     ]

    //     var id = req.params.id
    //     // respond to this request with our fake-new content embedded within the BBC News home page
    //     console.log('triggered for id', id, 'new url')
    //     res.merge('fake-news', {
    //         sourceUrl: urls[id],                             // external url to fetch
    //         sourcePlaceholder: 'div[data-entityid="container-top-stories#1"]'   // css selector to inject our content into
    //     });
    // });

    // create simple route to test our fake news
    app.get('/:url', function(req, res) {
        console.log('called for specific URL: ', req.params.url)
        var url =  decodeURIComponent(req.params.url)

        // var urls = [
        //     "https://www.xkcd.com/1",
        //     "https://www.twitter.com/realDonaldTrump/status/528286220418564096?lang=en",
        //     "https://www.reddit.com/r/popular/",
        //     "https://www.snopes.com/fact-check/brenda-lee-removed-air-force-one/",
        //     "https://www.downloadbreadcrumbs.com/#/tutorial1",
        //     "https://www.tomsguide.com/us/amazon-data-breach,news-28610.html",
        //     "https://www.twitter.com/PrisonPlanet/status/1060344443616800768"

        // ]

        // var id = req.params.id
        // respond to this request with our fake-new content embedded within the BBC News home page
        console.log('triggered for id', url)
        res.merge('fake-news', {
            sourceUrl: url,                             // external url to fetch
            sourcePlaceholder: 'Hi!'   // css selector to inject our content into
        });
    });    

    // start the server
    app.listen(8080, function() {
        console.log('Server running... Visit http://localhost:8080 in your browser');
    });
}

module.exports = new Server();