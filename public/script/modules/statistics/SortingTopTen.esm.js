'use strict';
export default class SortingTopTen {
    #sortedList;
    #dataObject;
    #firstIn = [];
    #lastIn = [];
    #onlyPoints = [];
    #pointsToSort;
    #sortedResults = [];
    #nextToSort = 0;
    constructor(data) {
        this.#dataObject = data;
        this.#init();
    }
    get = () => this.#sortedList;
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
            this.#sortedList = this.#sortedResults;
        } else {
            this.#sortedList = this.#dataObject;
        }
    }
}
