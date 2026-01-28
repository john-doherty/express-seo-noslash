'use strict';

var expressSeoNoslash = require('../lib/express-seo-noslash');

describe('express-seo-noslash tests', function () {
    var req, res, next;

    beforeEach(function () {
        res = {
            redirect: jasmine.createSpy('redirect')
        }

        next = jasmine.createSpy('next');
    })

    it('should remove slash from then end of a pathname', function () {
        req = {
            'method': 'GET',
            'url': '/test/'
        };

        expressSeoNoslash(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(301, '/test');
        expect(next).not.toHaveBeenCalled();
    });

    it('should continue if there is no / at the end of a path name', function () {
        req = {
            'method': 'GET',
            'url': '/test'
        };

        expressSeoNoslash(req, res, next);

        expect(res.redirect).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    it('should continue if path is /', function () {
        req = {
            'method': 'GET',
            'url': '/'
        };

        expressSeoNoslash(req, res, next);

        expect(res.redirect).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    it('should remove / if HTTP method is HEAD', function () {
        req = {
            'method': 'HEAD',
            'url': '/test/'
        };

        expressSeoNoslash(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(301, '/test');
        expect(next).not.toHaveBeenCalled();
    });

    it('should continue if method is not HEAD or GET', function () {
        req = {
            'method': 'POST',
            'url': '/test/'
        };

        expressSeoNoslash(req, res, next);

        expect(res.redirect).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    });

    fit('should concat multiple starting / to a single /', function () {
        req = {
            'method': 'GET',
            'url': '//test.com/'
        };

        expressSeoNoslash(req, res, next);

        expect(res.redirect).toHaveBeenCalledWith(301, '/test.com');
        expect(next).not.toHaveBeenCalled();
    });
});