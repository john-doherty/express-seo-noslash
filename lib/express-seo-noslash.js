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

        // if the pathname starts with more than 1 /, truncate that to a single /
        // Fixes vulnerability where multiple slashes are used for an open redirect
        // Example: '//evil.com' in res.redirect redirects the user to evil.com
        var safePathname = pathname.replace(/^\/+/, '/');

        if (safePathname !== '/' && safePathname.endsWith('/')) {
            // redirect to path without /
            res.redirect(301, safePathname.slice(0, -1) + search);
        }
        else {
            next(); // nothing to do
        }
    }
    else {
        next(); // nothing to do
    }
}