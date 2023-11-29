export default class ColumnChart {

 chartHeight = 50;

  constructor({data = [], label = "", link = "", value = "", formatHeading = (data) => data} = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = formatHeading(value);
    this.element = this.createElement(this.createTemplate());
    this.toggleLoaderStatus();
  }

  createElement(template) {
    const element = document.createElement("div");
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createTemplateLink(link) {
    return this.link ? `<a href="${link}" class="column-chart__link">View all</a>` : ``;
  }

  createTemplate() {
    return `
        <div class="column-chart" style="--chart-height: ${this.chartHeight}">
          <div class="column-chart__title">Total ${this.label}${this.createTemplateLink()}</div>
          <div class="column-chart__container">
            <div data-element="header" class="column-chart__header">${this.value}</div>
            <div data-element="body" class="column-chart__chart">${this.renderTemplate()}</div>
          </div>
        </div>
`;
  }

  toggleLoaderStatus = () => {
    const isDataEmpty = this.data.length === 0;
    this.element.classList.toggle('column-chart_loading', isDataEmpty);
  }

  renderTemplate() {
    const maxDataValue = Math.max(...this.data);

    return this.data
      .map(value =>
        `<div style="--value: ${Math.floor(value * (this.chartHeight / maxDataValue)).toFixed()}" data-tooltip="${((value/maxDataValue) * 100).toFixed()}%"></div>`
      )
      .join('');
  }

  update(data) {
    this.data = data;
    const columnChartBody = this.element.querySelector('[data-element="body"]');

    columnChartBody.innerHTML = this.renderTemplate();

    this.toggleLoaderStatus();
  }

  remove = () => {
    this.element.remove();
  }
  destroy = () => {
    this.remove();
  }
}
