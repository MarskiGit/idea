'use strict';
export default class SortingTopTen {
    #sortedTbody = document.createElement('tbody');
    #dataObject;
    #firstIn = [];
    #lastIn = [];
    #onlyPoints = [];
    #pointsToSort;
    #sortedResults = [];
    #nextToSort = 0;
    #iterator = 1;
    constructor(dataAjax) {
        this.#dataObject = dataAjax;
        this.#init();
    }
    getSortedHTML = () => this.#sortedTbody;
    #init() {
        this.#firstSorting();
        this.#selectPoints();
        this.#sorting();
    }
    #firstSorting() {
        this.#dataObject.sort((a, b) => b.points - a.points);
    }
    #selectPoints() {
        for (const td of this.#dataObject) {
            this.#onlyPoints.push(parseInt(td.points));
        }
    }
    #sorting() {
        for (const [l, { points }] of this.#dataObject.entries()) {
            let intPoint = parseInt(points);

            this.#firstIn.push(this.#onlyPoints.indexOf(intPoint));
            this.#lastIn.push(this.#onlyPoints.lastIndexOf(intPoint));

            if (this.#onlyPoints[l + 1] === intPoint && l > this.#nextToSort) {
                this.#sortedResults = [...this.#dataObject];

                this.#pointsToSort = [];
                this.#pointsToSort = this.#sortedResults.slice(this.#firstIn[l], this.#lastIn[l] + 1);

                this.#pointsToSort.sort((a, b) => b.offers - a.offers);

                this.#sortedResults.splice(this.#firstIn[l], this.#pointsToSort.length, ...this.#pointsToSort);

                this.#nextToSort = this.#pointsToSort.length + l - 1;
            }
        }
        if (this.#sortedResults.length !== 0) {
            this.#createHtml(this.#sortedResults);
        } else {
            this.#createHtml(this.#dataObject);
        }
    }
    #createHtml(dataObject) {
        for (const td of dataObject) {
            this.#sortedTbody.insertAdjacentHTML('beforeend', this.#renderTr(this.#iterator, td));
            this.#iterator++;
        }
    }
    // wyzbaczenie miejsc egzekfo
    #renderTr(i, { full_name, offers, points }) {
        return `
        <tr>
        <td class="${this.#statusInformation(i).class}">${i}</td>
        <td>${full_name}</td>
        <td>${offers}</td>
        <td>${points}</td>
        </tr>
        `;
    }
    #statusInformation(st) {
        switch (st) {
            case 1:
                return {
                    class: 'win_top gold',
                };
            case 2:
                return {
                    class: 'win_top silver',
                };
            case 3:
                return {
                    class: 'win_top brown',
                };
            default:
                return {
                    class: '',
                };
        }
    }
}
