# express-seo-noslash

Express middleware to remove trailing slashes from incoming urls using 301 redirects.

## Install

```bash
npm install --save express-seo-noslash
```

## Usage

Add middleware to your express application before all other routes.

```js
var express = require('express');
var app = express();
var removeTrailingSlash = require('express-seo-noslash');

// add middleware
app.use(removeTrailingSlash);

// standard route
app.get('/my-page', function(req, res) {
    res.send('Hello world!');
});
```

Incoming requests to `/my-page/` will be 301 redirected to `/my-page`

## Contributing

Feel free to contribute, either by [raising an issue](https://github.com/john-doherty/express-seo-noslash/issues) or:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## History

For change-log, check [releases](https://github.com/john-doherty/express-seo-noslash/releases).

## License

Licensed under [MIT License](LICENSE) &copy; [John Doherty](https://twitter.com/mrjohndoherty)