'use strict';
import { setingRequest } from '../../public/script/modules/seting.esm.js';
import FormHandling from '../../public/script/modules/FormHandling.esm.js';

setingRequest.url = '../../index.php';

const formObjects = {
    isPassword: true,
    request: 'addUser',
    form: document.querySelector('[data-form="admin"]'),
    errorMessage: document.querySelector('[data-form="admin_message"]'),
    strengthMeter: document.querySelector('[data-registration="strength_meter"]'),
    strengthMessage: document.querySelector('[data-registration="strength_message"]'),
    identicalMessage: document.querySelector('[data-registration="identical_message"]'),
};

new FormHandling(formObjects, setingRequest).init();
