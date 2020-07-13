import '../item-quantity-dropdown/item-quantity-dropdown'

$(document).ready(() => {
  $('.dropdown--room-features').iqDropdown({
    onShow(inst) {
      inst.addClass('dropdown--active').trigger('toggleActive')
    },
    onHide(inst) {
      inst.removeClass('dropdown--active').trigger('toggleActive');
    },
    totalTextForms: ['удобство', 'удобства', 'удобств'],
    itemsSeparator: ', ',
    items: [
      {
        id: 'bedrooms',
        itemText: 'Спальни',
        itemTextForms: ['спальня', 'спальни', 'спален'],
      },
      {
        id: 'beds',
        itemText: 'Кровати',
        itemTextForms: ['кровать', 'кровати', 'кроватей']
      },
      {
        id: 'bathrooms',
        itemText: 'Ванные комнаты',
        itemTextForms: ['ванная комната', 'ванных комнаты', 'ванных комнат']
      }
    ],
  });
});
