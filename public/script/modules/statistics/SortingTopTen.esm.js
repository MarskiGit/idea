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
        this.#pointFixed();
        this.#firstSorting();
        this.#selectPoints();
        this.#sorting();
    }
    #pointFixed() {
        for (const winer of this.#mixed) for (let key in winer) if (key == 'points') winer[key] = Number(winer[key]).toFixed(2);
    }
    #firstSorting() {
        this.#mixed.sort((a, b) => Number(b.points) - Number(a.points));
    }
    #selectPoints() {
        for (const winer of this.#mixed) this.#onlyPoints.push(Number(winer.points));
    }
    #sorting() {
        console.time('Sorted');
        for (const [mixIndex, { points }] of this.#mixed.entries()) {
            let intPoint = Number(points);

            //this.#firstIndex.push(this.#onlyPoints.indexOf(intPoint));
            // this.#lastIndex.push(this.#onlyPoints.lastIndexOf(intPoint));

            if (this.#onlyPoints[mixIndex + 1] === intPoint && mixIndex > this.#nextSortedStep) {
                let lastIndex = this.#onlyPoints.lastIndexOf(intPoint) + 1;

                this.#score = [...this.#mixed];

                this.#sortedScore = [];
                this.#sortedScore = this.#score.slice(mixIndex, lastIndex);

                this.#sortedScore.sort((a, b) => b.offers - a.offers);

                this.#score.splice(mixIndex, this.#sortedScore.length, ...this.#sortedScore);

                this.#nextSortedStep = this.#sortedScore.length + mixIndex - 1;
            }
        }
        console.timeEnd('Sorted');
    }
}
