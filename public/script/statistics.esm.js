'use strict';
import { TimeApp, handleRequestParams } from './modules/modules.esm.js';
import TbodyTopTen from './modules/statistics/TbodyTopTen.esm.js';

const statisticsDOM = {
    request: 'topTen',
    users: {
        quarter: document.querySelector('[data-statistics="user_quarter"]'),
        list: document.querySelector('[data-statistics="users_list"]'),
    },
    area: {
        quarter: document.querySelector('[data-statistics="area_quarter"]'),
        list: document.querySelector('[data-statistics="areas_list"]'),
    },
};

export default class TopTen {
    #requestParam = handleRequestParams(statisticsDOM.request);
    #Api;
    #userDOM = statisticsDOM.users;
    #areaDOM = statisticsDOM.area;
    #flagQuarter = 0;
    #flagButton = 0;

    init(Api) {
        this.#requestParam.set('quarter', TimeApp.quarterYear());
        this.#Api = new Api();
        this.#requestAPI();
        this.#eventListeners();
    }
    #requestAPI = () => {
        document.body.style.cursor = 'progress';
        this.#Api
            .getJson(this.#requestParam.getUrl())
            .then((data) => {
                this.apiData = data;
                this.#responseAPI();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #responseAPI() {
        const request = this.#requestParam.getParam('request');
        if (request !== this.#flagButton || this.apiData.quarter !== this.#flagQuarter) {
            const { user, area, quarter } = this.apiData;
            this.#flagQuarter = quarter;
            this.#flagButton = request;

            switch (this.#flagButton) {
                case 'topUsers':
                    this.#displayTopTen(user, this.#userDOM);
                    break;
                case 'topAreas':
                    this.#displayTopTen(area, this.#areaDOM);
                    break;
                case 'topTen':
                    this.#displayTopTen(user, this.#userDOM);
                    this.#displayTopTen(area, this.#areaDOM);
                    break;
            }
        }
    }
    #eventListeners() {
        this.#userDOM.quarter.addEventListener('click', this.#changeQuarter);
        this.#areaDOM.quarter.addEventListener('click', this.#changeQuarter);
    }
    #changeQuarter = (event) => {
        if (event.target.nodeName === 'BUTTON') {
            let dataQuarter = event.target.getAttribute('data-quarter');
            let dataRequest = event.target.getAttribute('data-request');

            this.#requestParam.set('quarter', dataQuarter);
            this.#requestParam.set('request', dataRequest);

            if (this.#flagQuarter != dataQuarter || this.#flagButton != dataRequest) this.#requestAPI();
        }
    };

    #displayTopTen(data, view) {
        const viewList = view.list;
        if (data.length > 0) {
            this.#cleanTable(viewList);
            viewList.appendChild(new TbodyTopTen(data).get());
        } else {
            this.#cleanTable(viewList);
        }
        this.#changeOrnament(view.quarter);
    }
    #changeOrnament(quarter) {
        [...quarter.children].forEach((li) => {
            if (li.classList.contains('ornament_line')) li.classList.remove('ornament_line');
        });

        [...quarter.children][this.#flagQuarter - 1].classList.add('ornament_line');
    }
    #cleanTable(viewList) {
        if (viewList.tBodies.length > 0) {
            const tbody = viewList.tBodies[0];
            tbody.parentNode.removeChild(tbody);
        }
    }
}
