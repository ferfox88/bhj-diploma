/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';

    if (options.method === 'GET') {
        for (let item in options.data) {
            let urlData = item + '=' + options.data[item] + '&';
            options.url = (options.url + '?' + urlData).slice(0, -1);
        }
    } else {
        for (let item in options.data) {
            formData.append(item, options.data[item]);
        }
    }

    try {
        xhr.open(options.method, options.url);
        options.method === 'GET' ? xhr.send() : xhr.send(formData);
    }
    catch (err) {
        console.error(err);
    }

    xhr.onload = () => options.callback(null, xhr.response);
}
