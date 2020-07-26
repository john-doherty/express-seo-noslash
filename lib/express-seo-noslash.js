'use strict';

var url = require('url');

/**
 * Intercepts requests ad 301 redirects to remove trailing slashes
 * @returns {function} express middleware
 */
module.exports = function (req, res, next) {

    var method = req.method.toLowerCase();
    var requestedUrl = url.parse(req.url);

    // we're only interested in get/head requests
    if (method === 'get' || method === 'head') {

        var pathname = requestedUrl.pathname;
        var search = requestedUrl.search || '';

        if (pathname !== '/' && pathname.endsWith('/')) {
            // redirect to path without /
            res.redirect(301, pathname.slice(0, -1) + search);
        }
        else {
            next(); // nothing to do
        }
    }
    else {
        next(); // nothing to do
    }
}