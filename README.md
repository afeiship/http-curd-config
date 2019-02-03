# http-rest-config
> A simple rest config for react project.

## expamle http:
```js
import nx from 'next-js-core2';
import NxAxios from 'next-axios';
const MyHttp = nx.declare({
  extends: NxAxios,
  methods: {
    getToken: function () {
      const {login} = AppBase.$.session;
      if (login) {
        return 'Bearer ' + login.token;
      }
      return null;
    },
    setRequestInterceptor: function () {
      this.axios.interceptors.request.use((config) => {
        const bearerToken = this.getToken();
        bearerToken && nx.mix(config.headers.common, {Authorization: bearerToken});
        return config;
      });
    },
    contentType: function () {
      return 'application/json; charset=utf-8';
    },
    transformParam: function (inData) {
      return JSON.stringify(inData);
    },
    toData: function (inResponse) {
      return inResponse.data;
    },
    error: function (inError) {
      //todo: search error:
    }
  }
});
```

## example config:
```js
export default {
  host: 'https://app.demo.com',
  request: ['/backend', 'urlencode'],
  items: [
    {
      items: {
        'login':  ['post', '/adminUser/login'],
        'logout': ['post', '/adminUser/logout']
      }
    },
    {
      request: ['/admin', 'json'],
      items: {
        'article_create': ['post', '/article/create'],
        'article_update': ['post', '/article/update'],
        'article_page':   ['get', '/article/page'],
      }
    },
    {
      request: ['/backend/pmall', 'json'],
      items: {
        'article_create': ['post', '/article/create'],
        'article_update': ['post', '/article/update'],
        'article_page':   ['get', '/article/page'],
      }
    }
  ]
};
```

## usage:
```js
import httpRestConfig from 'http-rest-config';

export default nx.declare({
  statics: {
    init () {
      httpRestConfig(this, MyHttp, APIS);
    }
  }
});
```
