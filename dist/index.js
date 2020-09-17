/*!
 * name: @feizheng/http-rest-config
 * description: A simple rest config for react project.
 * homepage: 
 * version: 2.5.0
 * date: 2020-09-17T09:01:43.464Z
 * license: MIT
 */


(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataTransform = nx.DataTransform || require('@feizheng/next-data-transform');
  var nxTmpl = nx.tmpl || require('@feizheng/next-tmpl');
  var nxContentType = nx.contentType || require('@feizheng/next-content-type');

  function httpRestConfg(inApiContext, inHttp, inConfig) {
    var host = inConfig.host;
    var request = inConfig.request;
    var items = inConfig.items;
    var baseUrl = host || ('//' + location.host);

    items.forEach(function (item) {
      var _request = item.request;
      var _items = item.items;
      var _prefix = item.prefix || '';
      var _host = item.host;

      nx.each(_items, function (key, _item) {
        var apiKey = _prefix + key;
        inApiContext[apiKey] = function (inData, inOptions) {
          var data = Array.isArray(inData) ? nx.mix.apply(nx, inData) : inData;
          var action = String(_item[0]).toLowerCase();
          var requestData = _request || request;
          var context = requestData[0];
          var dataType = requestData[1];
          var contentType = nxContentType(dataType);
          var apiPath = nxTmpl(_item[1], data);
          var options = nx.mix({ headers: { 'Content-Type': contentType } }, _item[2], inOptions);

          return inHttp[action](
            (_host || baseUrl) + context + apiPath,
            NxDataTransform[dataType](data),
            options
          );
        };
      });
    });
  }


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = httpRestConfg;
  }
})();

//# sourceMappingURL=index.js.map
