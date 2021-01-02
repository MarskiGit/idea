'use strict';
export {
    dataFetch
};
/////// FETCH \\\\\\\ 
const handleError = err => {
    console.warn(err);
    let resp = new Response(
        JSON.stringify({
            code: 400,
            message: "Stupid network Error. Refresh the page in 30 seconds."
        })
    );
    return resp;
};

const dataFetch = async (url = '', data = {}, tx = 1) => {
    const opt = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    };

    const response = await fetch(url, opt).catch(handleError);
    const res = await response;

    return response.code && response.code == 400 ? onsole.log("AJAX CODE 400") : tx ? res.text() : res.json()

};