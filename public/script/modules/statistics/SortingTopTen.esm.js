'use strict';
export default class SortingTopTen {
    #mixed;
    #onlyPoints = [];
    #firstIndex = [];
    #lastIndex = [];
    #score = [];
    #sortedScore;
    #nextSortedStep = 0;
    constructor(data) {
        this.#mixed = data;
        this.#init();
    }
    get = () => (this.#score.length !== 0 ? this.#score : this.#mixed);
    #init() {
        this.#firstSorting();
        this.#selectPoints();
        this.#sorting();
    }
    #firstSorting() {
        this.#mixed.sort((a, b) => b.points - a.points);
    }
    #selectPoints() {
        for (const td of this.#mixed) {
            this.#onlyPoints.push(Number(td.points));
        }
    }
    #sorting() {
        console.time('Sorted');
        for (const [mixIndex, { points }] of this.#mixed.entries()) {
            let intPoint = Number(points);

            this.#firstIndex.push(this.#onlyPoints.indexOf(intPoint));
            this.#lastIndex.push(this.#onlyPoints.lastIndexOf(intPoint));

            if (this.#onlyPoints[mixIndex + 1] === intPoint && mixIndex > this.#nextSortedStep) {
                this.#score = [...this.#mixed];

                this.#sortedScore = [];
                this.#sortedScore = this.#score.slice(this.#firstIndex[mixIndex], this.#lastIndex[mixIndex] + 1);

                this.#sortedScore.sort((a, b) => b.offers - a.offers);

                this.#score.splice(this.#firstIndex[mixIndex], this.#sortedScore.length, ...this.#sortedScore);

                this.#nextSortedStep = this.#sortedScore.length + mixIndex - 1;
            }
        }
        console.timeEnd('Sorted');
    }
}
