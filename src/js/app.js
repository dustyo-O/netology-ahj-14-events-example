import ContactList from './components/contact-list/contact-list.class';
import FilterWidget from './components/filter-widget/filter-widget.class';

const contactList = document.querySelector('.contact-list');

window.contactList = new ContactList(contactList);

document.documentElement.addEventListener('click', () => {
  console.log(`click ${performance.now()}`);
}, true);

const filterWidgetEl = document.querySelector('.filter-widget');

window.filter = new FilterWidget(filterWidgetEl, window.contactList.onDataFilter);
