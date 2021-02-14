/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest =  (options = {}) => {
    if(!options.data){
        return;
    }
   const xhr = new XMLHttpRequest;
    let requestURL = options.url;
    const formData = new FormData;
    if (options.method === 'GET'){
      requestURL = `${options.url}${searchParams(options.data)}`
    }
    if (options.method === 'POST') {
           Object.entries(options.data).forEach(([key, value]) => formData.append(`${key}`, `${value}`));
    }
    try {
        xhr.open( options.method, requestURL );
        xhr.addEventListener('readystatechange', function ()  {
    if (this.readyState === xhr.DONE && xhr.status === 200) {
      const response = JSON.parse(xhr.response);
      options.callback(null,response);
      return response;
    }
  });         
      xhr.send(options.method === 'GET' ? null : formData);
         
  }
  catch (err) {
    console.log(err);
 }
}
function searchParams(url){
    let symbol = '?';
    return symbol + Object.entries(url).map(([key,value]) => `${key}=${value}`).join('&');
}

