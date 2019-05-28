document.querySelector('.LocateOnMap-title').onclick = function () {
    document.querySelector('.Map').classList.toggle('open');
    document.querySelector('.arrow-change').classList.toggle('arrow-up');
};
const WOW = require('wowjs');

window.wow = new WOW.WOW({
    live: false
});
window.wow.init();