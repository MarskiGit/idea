import Registration from '../../public/script/modules/admin/Registration.esm.js';

const formObjects = {
    registration: true,
    request: 'addUser',
    url: '../../index.php',
    form: document.querySelector('[data-registration="form"]'),
    errorMessage: document.querySelector('[data-registration="form_error"]'),
    strengthMeter: document.querySelector('[data-registration="strength_meter"]'),
    strengthMessage: document.querySelector('[data-registration="strength_message"]'),
};

new Registration(formObjects).init();

// ../../index.php
