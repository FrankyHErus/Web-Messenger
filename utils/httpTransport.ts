const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE'
};

function queryStringify(data) {
    let str = '?';
    
    for (const [key, value] of Object.entries(data)) {
        str += key + "=" + value + "&";
    }
    str = str.slice(0, str.length - 1)
    
    return str
}

export default class HTTPTransport {
    get = (url, options = {}, timeout) => {
        return this.request(url, {...options, method: METHODS.GET}, timeout);
    };

    put = (url, options = {}, timeout) => {
        return this.request(url, {...options, method: METHODS.PUT}, timeout);
    };

    post = (url, options = {}, timeout) => {
        return this.request(url, {...options, method: METHODS.POST}, timeout);
    };

    delete = (url, options = {}, timeout) => {
        return this.request(url, {...options, method: METHODS.DELETE}, timeout);
    };

    request = (url, options, timeout = 5000) => {
        let {data, method} = options;
      
        if(method == METHODS.GET){
          data = queryStringify(data);
          url += data;
        }

        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.timeout = timeout;

          xhr.open(method, url);

          xhr.onload = () => {
            resolve(xhr);
          }

          xhr.onabort = reject;
          xhr.onerror = reject;
          xhr.ontimeout = reject;
        
          if (method === METHODS.GET || !data) {
            xhr.send();
          } else {
            xhr.send(data);
          }
      });
    };
};