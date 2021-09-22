'use strict';
import { TimeApp, handleRequestParams } from './modules/modules.esm.js';
import TbodyTopTen from './modules/statisticsModules/TbodyTopTen.esm.js';

const statisticsDOM = {
    request: 'topTen',
    users: {
        quarterUl: document.querySelector('[data-users="change_quarter"]'),
        table: document.querySelector('[data-users="table"]'),
    },
    areas: {
        quarterUl: document.querySelector('[data-areas="change_quarter"]'),
        table: document.querySelector('[data-areas="table"]'),
    },
    year: {
        table: document.querySelector('[data-year="table"]'),
    },
};

export default class StatisticsController {
    #Api;
    #Api_data;
    #Api_topTen;
    #Api_annualStatistics;
    #Api_chosenQuarter = 0;

    #requestParam = handleRequestParams(statisticsDOM.request);
    #userDOM = statisticsDOM.users;
    #areaDOM = statisticsDOM.areas;
    #selectTop = statisticsDOM.request;

    #selectQuarter = TimeApp.quarterYear();
    #isFirstClick = { topUsers: { quarter: this.#selectQuarter }, topAreas: { quarter: this.#selectQuarter } };

    init(Api) {
        this.#requestParam.set('quarter', this.#selectQuarter);
        this.#requestParam.set('year', TimeApp.year());
        this.#Api = new Api();

        this.#Api_request();
        this.#eventListeners();
    }
    #eventListeners() {
        this.#userDOM.quarterUl.addEventListener('click', this.#changeQuarter);
        this.#areaDOM.quarterUl.addEventListener('click', this.#changeQuarter);
    }
    #Api_request = () => {
        document.body.style.cursor = 'progress';
        this.#Api
            .getJson(this.#requestParam.getUrl())
            .then((data) => {
                this.#Api_data = data;
                this.#Api_response();
            })
            .finally((document.body.style.cursor = 'default'));
    };
    #Api_response() {
        const { top_ten, select_quarter, annual_statistics } = this.#Api_data;
        this.#Api_chosenQuarter = Number(select_quarter);
        this.#Api_topTen = top_ten;
        this.#Api_annualStatistics = annual_statistics;

        this.#controlerViewTopTen();
        this.#controlerAnnualStatement();
    }
    #controlerViewTopTen() {
        switch (this.#selectTop) {
            case 'topUsers':
                this.#isFirstClick.topUsers.quarter = this.#Api_chosenQuarter;
                view.displayTopTen(this.#Api_chosenQuarter, this.#Api_topTen.users, this.#userDOM);
                break;
            case 'topAreas':
                this.#isFirstClick.topAreas.quarter = this.#Api_chosenQuarter;
                view.displayTopTen(this.#Api_chosenQuarter, this.#Api_topTen.areas, this.#areaDOM);
                break;
            case 'topTen':
                view.displayTopTen(this.#Api_chosenQuarter, this.#Api_topTen.users, this.#userDOM);
                view.displayTopTen(this.#Api_chosenQuarter, this.#Api_topTen.areas, this.#areaDOM);
                break;
        }
    }
    #controlerAnnualStatement() {
        if (this.#Api_annualStatistics !== void 0) annualStatistics.render(this.#Api_annualStatistics);
    }
    #changeQuarter = (event) => {
        if (event.target.nodeName === 'BUTTON') {
            this.#selectQuarter = Number(event.target.getAttribute('data-quarter'));
            this.#selectTop = event.target.getAttribute('data-request');

            this.#requestParam.set('quarter', this.#selectQuarter);
            this.#requestParam.set('request', this.#selectTop);
            this.#requestParam.deletePatam('year');

            if (this.#isClick()) this.#Api_request();
        }
    };
    #isClick = () => {
        switch (this.#selectTop) {
            case 'topUsers':
                return this.#isFirstClick.topUsers.quarter === this.#selectQuarter ? false : true;
            case 'topAreas':
                return this.#isFirstClick.topAreas.quarter === this.#selectQuarter ? false : true;
        }
    };
}

class AnnualStatistics {
    #table = statisticsDOM.year.table;

    #tableTr;
    #numberEmployeesTr;
    #numberOffersTr;
    #numberApplicantsTr;
    #employeeEngagementTr;

    #numberEmployees;
    #numberOffers;
    #committedEmployees;

    #numberEmployeesMonth = [];
    #calculationMonth = [];

    render(annual_statistics) {
        this.#tableTr = [...this.#table.tBodies[0].querySelectorAll('tr')];

        this.#numberEmployeesTr = this.#tableTr[0];
        this.#numberOffersTr = this.#tableTr[1];
        this.#numberApplicantsTr = this.#tableTr[3];
        this.#employeeEngagementTr = this.#tableTr[7];

        this.#numberEmployees = annual_statistics.number_employees;
        this.#numberOffers = annual_statistics.number_offers;
        this.#committedEmployees = annual_statistics.committed_employees;

        this.#employeeCalculations();
        this.#monthlyCalculation(this.#numberOffers, this.#numberOffersTr);
        view.displayYear(this.#committedEmployees, this.#numberApplicantsTr);

        this.employeeEngagement();
    }
    #monthlyCalculation(data, td) {
        let total = 0;
        this.#calculationMonth = [];
        for (const obj of data) {
            let index = Number(obj.month);
            total += Number(obj.total);
            this.#calculationMonth.push({ year: '2021', month: index, total: total });
        }
        view.displayYear(this.#calculationMonth, td);
    }
    #employeeCalculations() {
        let total = 0;
        let year,
            inMonth = null;
        for (const obj of this.#numberEmployees) {
            year = Number(obj.year);
            if (TimeApp.year() > year) total += Number(obj.total);
        }
        for (let index = 0; index < 12; index++) {
            for (const obj of this.#numberEmployees) {
                year = Number(obj.year);
                inMonth = Number(obj.month) - 1;
                if (TimeApp.year() === year && inMonth === index) {
                    total += Number(obj.total);
                }
            }

            this.#numberEmployeesMonth.push({ year: '2021', month: index + 1, total: total });
        }
        view.displayYear(this.#numberEmployeesMonth, this.#numberEmployeesTr);
    }
    employeeEngagement() {
        let numberEmployees = 0;
        let numberCommitted = 0;
        let monthEmploye = 0;
        let monthCommitted = 0;
        let array = [];
        for (let index = 0; this.#committedEmployees.length > index; index++) {
            monthCommitted = Number(this.#committedEmployees[index].month);
            numberCommitted = Number(this.#committedEmployees[index].total);

            for (const obj of this.#numberEmployeesMonth) {
                monthEmploye = Number(obj.month);
                if (monthCommitted === monthEmploye) {
                    numberEmployees = Number(obj.total);
                    let procent = (((numberCommitted * 10) / (numberEmployees * 10)) * 100).toFixed();
                    array.push({ year: obj.year, month: monthCommitted, total: `${procent}%` });
                }
            }
        }
        view.displayYear(array, this.#employeeEngagementTr);
    }
}

class View {
    #tbodyTopTen = new TbodyTopTen();
    #table;
    displayTopTen(chosenQuarter, data, dom) {
        this.#table = dom.table;
        if (data.length > 0) {
            this.#tbodyTopTen.render(data);
            this.#cleanTable();
            this.#table.appendChild(this.#tbodyTopTen.get(data));
        } else {
            this.#cleanTable();
        }
        this.#changeOrnament(chosenQuarter, dom.quarterUl);
    }
    displayYear(data, tr) {
        for (const obj of data) {
            let index = Number(obj.month);
            tr.children[index].innerHTML = obj.total;
        }
    }
    #changeOrnament(chosenQuarter, quarter) {
        [...quarter.children].forEach((li) => {
            if (li.classList.contains('ornament_line')) li.classList.remove('ornament_line');
        });

        [...quarter.children][chosenQuarter - 1].classList.add('ornament_line');
    }
    #cleanTable() {
        if (this.#table.tBodies.length > 0) {
            const tbody = this.#table.tBodies[0];
            tbody.parentNode.removeChild(tbody);
        }
    }
}

const annualStatistics = new AnnualStatistics();
const view = new View();
