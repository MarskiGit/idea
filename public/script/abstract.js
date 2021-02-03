'use strict';
export {
    eventWindowScroll,
};


const eventWindowScroll = fn => {
    window.addEventListener('scroll', fn);
};