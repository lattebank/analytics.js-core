
var integration = require('../integration');
var onBody = require('on-body');
var load = require('load-script');


/**
 * Expose `Chartbeat` integration.
 */

var Chartbeat = module.exports = integration('Chartbeat');


/**
 * Loaded state.
 */

var loaded = false;


/**
 * Default options.
 */

Chartbeat.prototype.defaults = {
  // the domain of the site your installing chartbeat on (required)
  domain: '',
  // your chartbeat uid (required)
  uid: null
};


/**
 * Load the library.
 *
 * http://chartbeat.com/docs/adding_the_code/
 */

Chartbeat.prototype.load = function () {
  var endpoints = {
    https: 'https://a248.e.akamai.net/chartbeat.download.akamai.com/102508/js/chartbeat.js',
    http: 'http://static.chartbeat.com/js/chartbeat.js'
  };
  load(endpoints, this.ready);
};


/**
 * Initialize.
 *
 * http://chartbeat.com/docs/configuration_variables/
 *
 * @param {Object} options
 */

Chartbeat.prototype.initialize = function (options) {
  window._sf_async_config = options;
  onBody(function () {
    window._sf_endpt = new Date().getTime();
  });
};


/**
 * Page.
 *
 * http://chartbeat.com/docs/handling_virtual_page_changes/
 *
 * @param {String} name (optional)
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 */

Chartbeat.prototype.page = function (name, properties, options) {
  if (!loaded) {
    this.load();
    loaded = true;
  }

  window.pSUPERFLY.virtualPage(properties.path);
};