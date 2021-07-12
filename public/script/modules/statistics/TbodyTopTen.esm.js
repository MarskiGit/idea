'use strict';
import SortingTopTen from './SortingTopTen.esm.js';

export default class TbodyTopTen {
    #tbody;
    #ListMixed;
    #ListSortet;
    constructor(list) {
        this.#ListMixed = new SortingTopTen(list);
        this.#ListSortet = this.#ListMixed.get();
        this.#tbody = document.createElement('tbody');
        this.#renderTbody();
    }
    get = () => this.#tbody;
    #renderTbody() {
        let i = 1;
        for (const td of this.#ListSortet) {
            this.#tbody.insertAdjacentHTML('beforeend', this.#renderTr(i, td));
            i++;
        }
    }
    #renderTr(i, { full_name, offers, points }) {
        return `
        <tr>
        <td class="${this.#checkWinner(i).class}">${i}</td>
        <td>${full_name}</td>
        <td>${offers}</td>
        <td>${parseFloat(points).toFixed(2)}</td> 
        </tr>
        `;
    }
    #checkWinner(st) {
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
