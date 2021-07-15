'use strict';
import AjaxRequest from './modules/AjaxRequest.esm.js';
import { quarterYear } from './modules/seting.esm.js';
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

class TopTen {
    #AjaxRequest;
    #requestParam = {};
    #userDOM;
    #areaDOM;
    #flagQuarter = 0;
    #flagButton = 0;
    #ajaxOject;
    constructor(statisticsDOM) {
        this.#userDOM = statisticsDOM.users;
        this.#areaDOM = statisticsDOM.area;
        this.#AjaxRequest = new AjaxRequest(statisticsDOM.request);
    }
    init() {
        this.#requestParam.quarter = quarterYear();
        this.#sendRequest();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#userDOM.quarter.addEventListener('click', this.#changeQuarter);
        this.#areaDOM.quarter.addEventListener('click', this.#changeQuarter);
    }
    #changeQuarter = (event) => {
        if (event.target.nodeName === 'BUTTON') {
            this.#requestParam.quarter = event.target.getAttribute('data-quarter');
            this.#requestParam.request = event.target.getAttribute('data-request');
            if (this.#flagQuarter != this.#requestParam.quarter || this.#flagButton != this.#requestParam.request) this.#sendRequest();
        }
    };
    #sendRequest = () => {
        document.body.style.cursor = 'progress';
        this.#AjaxRequest
            .getJson(this.#requestParam)
            .then((data) => {
                this.#ajaxOject = this.#AjaxRequest.getData(data);
                if (typeof this.#ajaxOject === 'object') this.#viewTopTen();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #viewTopTen() {
        if (this.#requestParam.request !== this.#flagButton || this.#ajaxOject.quarter !== this.#flagQuarter) {
            const { user, area, quarter } = this.#ajaxOject;
            this.#flagQuarter = quarter;
            this.#flagButton = this.#requestParam.request;

            switch (this.#flagButton) {
                case 'topUsers':
                    this.#displayTopTen(user, this.#userDOM);
                    break;
                case 'topArea':
                    this.#displayTopTen(area, this.#areaDOM);
                    break;
                case 'topTen':
                    this.#displayTopTen(user, this.#userDOM);
                    this.#displayTopTen(area, this.#areaDOM);
                    break;
            }
        }
    }
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

new TopTen(statisticsDOM).init();
