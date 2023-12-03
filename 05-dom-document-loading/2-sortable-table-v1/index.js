export default class SortableTable {
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
      <span>${title}</span></div>`).join('');
  }

  createBodyTemplate() {
    return `<div data-element="body" class="sortable-table__body">${this.createRowTemplate()}</div>`;
  }

  createRowTemplate(data = this.data) {
    return data.map((item) => `<a href="/products/${item.id}" class="sortable-table__row">${this.createCellTemplate(item)}</a>`).join('');
  }

  createCellTemplate = (item) => {
    return this.headerConfig.map((key) => {
      return key.template ? key.template(item[key.id])
        : `<div class="sortable-table__cell">${item[key.id]}</div>`;
    })
      .join('');
  }

  sort(field, order) {
    const sortedType = order === "asc" ? 1 : -1;
    const fields = Array.prototype.slice.call(this.subElements.header.children);
    const elem = this.subElements.header.querySelector(`[data-id="${field}"]`);
    const index = fields.indexOf(elem);
    const sortedTable = [...this.subElements.body.children];

    const sortingAsc = (a, b) => a.children[index].textContent.localeCompare(b.children[index].textContent, ["ru", "en"], {
      numeric: true,
      caseFirst: "upper"
    });
    const sortingDesc = (a, b) => b.children[index].textContent.localeCompare(a.children[index].textContent, ["ru", "en"], {
      numeric: true,
      caseFirst: "upper"
    });

    sortedTable.sort(order === 'desc' ? sortingDesc : sortingAsc)

    this.updateTable(sortedTable);
  }

  updateTable(sortedTable) {
    this.subElements.body.innerHTML = '';
    this.subElements.body.append(...sortedTable);
  }

  remove = () => {
    this.element.remove();
  }

  destroy = () => {
    this.remove();
  }
}
