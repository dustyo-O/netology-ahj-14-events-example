/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
import { containsPhone, containsText, filterBy } from './filter';
import contactListItem from './templates/contactListItem';

class FilterWidget {
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


const contactList = document.querySelector('.contact-list');
class ContactList {
  constructor(element) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;

    this.onItemClick = this.onItemClick.bind(this);
    this.onDetailsClick = this.onDetailsClick.bind(this);
    this.onDataFilter = this.onDataFilter.bind(this);

    this.fetchData();
    this.renderJson.bind(this);

    this.element.addEventListener('click', this.onItemClick);
  }

  fetchData() {
    fetch('https://raw.githubusercontent.com/pixelastic/fakeusers/master/data/final.json')
      .then((res) => res.json())
      .then((json) => this.renderJson(json));
  }

  renderJson(data) {
    console.log(data);
    this.templateData = data
      .map(this.mapDataToTemplate);

    this.render(this.templateData);
  }

  render(data) {
    this.element.innerHTML = data
      .map(contactListItem)
      .join('');
  }

  mapDataToTemplate(rawData) {
    return {
      id: rawData.username,
      avatar: `https://github.com/pixelastic/fakeusers/raw/master/pictures/${rawData.picture}`,
      name: `${rawData.first_name} ${rawData.last_name}`,
      phone: rawData.phone_number,
    };
  }

  onItemClick(e) {
    console.log('onItemClick');
    const { target } = e;

    if (target.dataset.phone) {
      e.stopPropagation();

      return;
    }

    const item = target.closest(`.${this.blockName}__item`);

    if (!item) return;

    const details = item.querySelector(`.${this.blockName}__details`);

    if (!details.classList.contains(`${this.blockName}__details_hidden`)) return;

    details.classList.remove(`${this.blockName}__details_hidden`);
    details.addEventListener('click', this.onDetailsClick);
  }

  onDetailsClick(e) {
    e.stopPropagation();
    console.log('onDetailsClick');
    const details = e.currentTarget;

    details.classList.add(`${this.blockName}__details_hidden`);
    details.removeEventListener('click', this.onDetailsClick);
  }

  onDataFilter(filterText) {
    this.render(filterText ?
      filterBy(this.templateData, (item) => {
        return containsPhone(item.phone, filterText) || containsText(item.name, filterText);
      }) : this.templateData);
  }
}

ContactList.prototype.blockName = 'contact-list';


window.contactList = new ContactList(contactList);

document.documentElement.addEventListener('click', () => {
  console.log(`click ${performance.now()}`);
}, true);

FilterWidget.prototype.blockName = 'filter-widget';

const filterWidgetEl = document.querySelector('.filter-widget');

window.filter = new FilterWidget(filterWidgetEl, window.contactList.onDataFilter);
