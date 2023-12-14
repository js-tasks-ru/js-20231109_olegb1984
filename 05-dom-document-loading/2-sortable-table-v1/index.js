export default class SortableTableBase {
  constructor(headerConfig = [], data = []) {

    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
    this.subElements = {
      body: this.element.querySelector('[data-element="body"]'),
      header: this.element.querySelector('[data-element="header"]')
    };
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplate() {
    return `${this.createTableTemplate()}`;
  }

  createTableTemplate() {
    return `<div class="sortable-table">${this.createHeaderRowTemplate() + this.createBodyTemplate()}</div>`
  }

  createHeaderRowTemplate() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">${this.createHeaderTemplate()}</div>`
  }

  createHeaderTemplate() {
    return this.headerConfig.map(({id, title, sortable}) =>
      `<div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
      <span>${title}</span>
      ${this.createLinkTemplate(sortable)}
      </div>`)
      .join('');
  }

  createBodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">${this.createRowsTemplate()}</div>`;
  }

  createRowsTemplate() {
    return this.data.map((item) => `<a href="/products/${item.id}" class="sortable-table__row">${this.createCellTemplate(item)}</a>`).join('');
  }

  createCellTemplate = (item) => {
    return this.headerConfig.map((key) => {
      return key.template ? key.template(item[key.id])
        : `<div class="sortable-table__cell">${item[key.id]}</div>`;
    })
      .join('');
  }

  createLinkTemplate(sortable) {
    return sortable
      ? `<span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`
      : "";
  }

  sort(field, order) {
    this.sortData(field, order);
    this.updateTable();
  }

  sortData(field, order) {
    const sortingAsc = (a, b) => a[field].toString().localeCompare(b[field].toString(), ["ru", "en"], {
      numeric: true,
      caseFirst: "upper"
    });
    const sortingDesc = (a, b) => b[field].toString().localeCompare(a[field].toString(), ["ru", "en"], {
      numeric: true,
      caseFirst: "upper"
    });
    return this.data.sort(order === 'desc' ? sortingDesc : sortingAsc);
  }

  updateTable() {
    this.subElements.body.innerHTML = this.createRowsTemplate()
  }

  remove = () => {
    this.element.remove();
  }

  destroy = () => {
    this.remove();
  }
}
