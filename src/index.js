import nx from 'next-js-core2';

export default function(inHttp, inConfig){
  const { APIS } = inOptions;
  nx.each(APIS.items, (key, item) => {
    this[key] = function (inData) {
      const action = String(item[0]).toLocaleLowerCase();
      let apiPath = item[1];
      if(apiPath.indexOf('{') > -1){
        apiPath = nx.tmpl( apiPath, inData );
      }
      return inHttp[action](`${APIS.baseUrl}${apiPath}`, inData);
    };
  });
};
