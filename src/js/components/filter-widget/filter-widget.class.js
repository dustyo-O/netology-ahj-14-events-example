export default class FilterWidget {
  constructor(element, onFilter) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;

    this.onSubmit = this.onSubmit.bind(this);
    this.onFilter = onFilter;

    this.submitBtn = this.element.querySelector(`.${this.blockName}__btn`);
    this.input = this.element.querySelector(`.${this.blockName}__input`);
    this.form = this.element.querySelector(`.${this.blockName}__form`);

    this.form.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    console.log(this);

    console.log('submit');
    e.preventDefault();

    this.onFilter(this.input.value);
  }
}

FilterWidget.prototype.blockName = 'filter-widget';
