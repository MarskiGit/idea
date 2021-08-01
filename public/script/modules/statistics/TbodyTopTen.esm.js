'use strict';
import SortingTopTen from './SortingTopTen.esm.js';

export default class TbodyTopTen {
    #tbody;
    #ListMixed;
    #ListSortet;
    #place = 1;
    constructor(list) {
        this.#ListMixed = new SortingTopTen(list);
        this.#ListSortet = this.#ListMixed.get();
        this.#tbody = document.createElement('tbody');
        this.#renderTbody();
    }
    get = () => this.#tbody;
    #renderTbody() {
        let i = 0;
        for (const td of this.#ListSortet) {
            this.#tbody.insertAdjacentHTML('beforeend', this.#renderTr(i, td));
            i++;
            this.#place++;
        }
    }
    #renderTr(i, { full_name, offers, points }) {
        if (i) this.#exAequo(i, offers, points);
        return `
        <tr>
        <td class="${this.#classPlace(this.#place).class}">${this.#place}</td>
        <td>${full_name}</td>
        <td>${offers}</td>
        <td>${points.replace(/(\.0|\.00)$|(0)$/, '')}</td> 
        </tr>
        `;
    }
    #exAequo(i, offers, points) {
        let exOffers = Number(this.#ListSortet[i - 1]['offers']) || null;
        let exPoints = Number(this.#ListSortet[i - 1]['points']) || null;

        if (exOffers === Number(offers) && exPoints === Number(points)) this.#place--;
    }
    #classPlace(place) {
        switch (place) {
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
