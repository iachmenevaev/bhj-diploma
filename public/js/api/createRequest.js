/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest =  (options = {}) => {

    if(!options.data){
        return;
    }
    const f = function () {},
    {
        method = 'GET',
        responseType,
        async = true,
        data = {}
    } = options,
    xhr = new XMLHttpRequest;
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
        xhr.addEventListener('readystatechange', () => {
            if (this.readyState === xhr.DONE && xhr.status === 200)
          
             callback(xhr.response.error, xhr.response);
             });
    xhr.send(options.method === 'GET' ? null : formData);
    console.log(options);
  }

  catch (err) {
    console.log(err);
  }
}
function searchParams(arrdata){
    let symbol = '?';
    return symbol + Object.entries(arrdata).map(([key,value]) => `${key} = ${value}`).join('&');
}
// const createRequest = async (options = {}) => {
//     if (!options.data) {
//       return;
//     }
//     const formData = new FormData();
//     let requestURL = options.url;
//     if (options.method === 'GET') {
//       requestURL = `${options.url}${encodeURL(options.data)}`
//     }
//     if (options.method === 'POST') {
//       Object.entries(options.data).forEach(([key, value]) => formData.append(`${key}`, `${value}`));
//     }
//     try {
//       let response = await fetch(requestURL, {
//         method: options.method,
//         body: options.method === 'GET' ? null : formData,
//       });
//       response = await response.json();
//       options.callback(response);
//       console.log(response);
//       return response;
//     } catch (err) {
//       return Promise.reject(err)
//     }
//   }
//   function encodeURL(url) {
//     let firstSymbol = '?';
//     return firstSymbol + Object.entries(url).map(([key, value]) => `${key}=${value}`).join('&');
//   }