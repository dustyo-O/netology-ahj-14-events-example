export default function contactListItem({ id, avatar, name, phone }) {
  return `
    <li data-contact data-contact-id="${id}" class="contact-list__item contact-list-item">
      <div data-section="main" class="contact-main">
        <img src="${avatar}" class="contact-list-item-img" alt="">
        <span class="contact-list-item-name">${name}</span>
        <span class="contact-list-item-phone">${phone}</span>
        <a href="tel:${phone}" data-phone="${phone}" data-action="call" class="contact-list-item-action">Звонок</a>
      </div>
      <div data-section="details" class="contact-list__details contact-details contact-list__details_hidden">Подробная информация о клиенте</div>
    </li>
  `;
}
