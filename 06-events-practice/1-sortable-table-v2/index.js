import SortableTableBase from "../../05-dom-document-loading/2-sortable-table-v1/index.js";

export default class SortableTable extends SortableTableBase {

    constructor(headerConfig, {data = [], sorted = {}} = {}) {
        super(headerConfig, data);
        this.isSortLocally = true;
        this.sorted = sorted;

        if (sorted) {
            const {id, order} = sorted;
            this.data = super.sortData(id, order);
        }

        this.element = this.createElement(this.createTemplate());
        this.subElements = {
            body: this.element.querySelector('[data-element="body"]'),
            header: this.element.querySelector('[data-element="header"]')
        };

        this.createEventListener();
    }

    sort(field, order) {
        if (this.isSortLocally) {
            this.sortOnClient(field, order);
        } else {
            this.sortOnServer();
        }
    }

    sortOnClient(field, order) {
        super.sort(field, order);
    }

    sortOnServer() {
    }

    sortByClick = (event) =>{
        const headerElem = event.target.closest('.sortable-table__cell');

        if(headerElem.dataset.sortable == 'false'){
            return;
          }

        this.sorted.id = headerElem.dataset.id;
        this.sorted.order = headerElem.dataset.order == 'desc' ? 'asc' : 'desc';

        this.sort(this.sorted.id, this.sorted.order);
      }

    createEventListener() {
        this.subElements.header.addEventListener("pointerdown", this.sortByClick);
    }

    destroyEventListener() {
        this.subElements.header.removeEventListener("pointerdown", this.sortByClick);
    }

    remove() {
        this.element.remove();
    }

    destroy() {
        this.destroyEventListener();
        this.remove();
    }
}
