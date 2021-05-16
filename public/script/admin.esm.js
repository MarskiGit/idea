import Registration from './modules/admin/Registration.esm.js';

const areaObjects = {
    registration: false,
    request: 'addArea',
    url: 'index.php',
    form: document.querySelector('[data-registration="form_area"]'),
    errorMessage: document.querySelector('[data-registration="area_error"]'),
};
const userObjects = {
    registration: false,
    request: 'addUser',
    url: 'index.php',
    form: document.querySelector('[data-registration="form_account"]'),
    errorMessage: document.querySelector('[data-registration="account_error"]'),
};

const addArea = new Registration(areaObjects);

const addUser = new Registration(userObjects);
addArea.init();
addUser.init();
