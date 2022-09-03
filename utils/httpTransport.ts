enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE'
};

function queryStringify(data : object) {
    let str = '?';
    
    for (const [key, value] of Object.entries(data)) {
        str += key + "=" + value + "&";
    }
    str = str.slice(0, str.length - 1)
    
    return str
}

export default class HTTPTransport {

    get = (url : string, options : Object, timeout : number) => {
        return this.request(url, {data : options, method: METHODS.GET}, timeout);
    };

    put = (url : string, options : Object, timeout : number) => {
        return this.request(url, {data : options, method: METHODS.PUT}, timeout);
    };

    post = (url : string, options : Object, timeout : number) => {
        return this.request(url, {data : options, method: METHODS.POST}, timeout);
    };

    delete = (url : string, options : Object, timeout : number) => {
        return this.request(url, {data : options, method: METHODS.DELETE}, timeout);
    };

    request = (url : string, options : {data : Object; method: string}, timeout = 5000) => {
        let {data, method} = options;
      
        if(method == METHODS.GET){
          url += queryStringify(data);
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
            xhr.send(JSON.stringify(Object.entries(data)));
          }
      });
    };
}