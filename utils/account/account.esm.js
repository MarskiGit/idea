'use strict';
import { setingRequest } from '../../public/script/modules/seting.esm.js';
import Registration from '../../public/script/modules/Registration.esm.js';

setingRequest.url = '../../index.php';

const formObjects = {
    isPassword: true,
    request: 'addUser',
    form: document.querySelector('[data-registration="form"]'),
    errorMessage: document.querySelector('[data-registration="form_error"]'),
    strengthMeter: document.querySelector('[data-registration="strength_meter"]'),
    strengthMessage: document.querySelector('[data-registration="strength_message"]'),
    identicalMessage: document.querySelector('[data-registration="identical_message"]'),
};

new Registration(formObjects, setingRequest).init();
