#!/usr/bin/env node

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const
path = require('path'),
assert = require('../../lib/asserts.js'),
restmail = require('../../lib/restmail.js'),
utils = require('../../lib/utils.js'),
persona_urls = require('../../lib/urls.js'),
CSS = require('../../pages/css.js'),
dialog = require('../../pages/dialog.js'),
runner = require('../../lib/runner.js'),
userMaker = require('../../lib/user_maker.js'),
testSetup = require('../../lib/test-setup.js');

var browser;

var email1, email2;

runner.run(module, {
  "setup": function(done) {
    // XXX: allocate a testidp domain here
    testSetup.setup({browsers: 1}, function(err, fixtures) {
      if (fixtures) {
        browser = fixtures.browsers[0];
      }
      done(err);
    });
  },
  "disable idp so we can create secondary users": function(done) {
    // XXX
    done();
  },
  "create two secondary users using the domain": function(done) {
    email1 = 'test1@doesnotexist.testidp.org';
    email2 = 'test2@doesnotexist.testidp.org';

    userMaker({
      email: email1,
      password: 'password'
    }, function(err) {
      if (err) return done(err);
      userMaker({
        email: email2,
        password: 'password'
      }, done);
    });

  },
  "create a new selenium session": function(done) {
    testSetup.newBrowserSession(browser, done);
  },
  "enable primary support on our domain": function(done, el) {
    // XXX
    done();
  },
  "load 123done, spawn dialog, switch to it": function(done) {
    browser.chain()
      .get(persona_urls["123done"])
      .wclick(CSS['123done.org'].signinButton, done)
      .wwin(CSS["persona.org"].windowName, done);
  },
  "enter previously secondary email address": function(done) {
    broswer.chain()
      .wtype(CSS['dialog'].emailInput, opts.email)
      .wclick(CSS['dialog'].newEmailNextButton);
    // XXX: now we should be transitioned to the "this site
    // is now a primary" screen
  },
},
{
  suiteName: path.basename(__filename),
  cleanup: function(done) { testSetup.teardown(done) }
});
