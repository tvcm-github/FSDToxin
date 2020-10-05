import '../../plugins/item-quantity-dropdown/item-quantity-dropdown'

$(document).ready(() => {
  $('.dropdown--guests').iqDropdown({
    onShow(inst) {
      inst.addClass('dropdown--active').trigger('toggleActive'); //toggleActive is text-field--dropdown event
    },
    onHide(inst) {
      inst.removeClass('dropdown--active').trigger('toggleActive');
    },
    totalTextForms: ['гость', 'гостя', 'гостей'],
    itemsSeparator: ', ',
    items: [
      {
        id: 'adults',
        itemText: 'Взрослые',
        itemTextForms: ['взрослый', 'взрослых', 'взрослых'],
        combine: true,
      },
      {
        id: 'kids',
        itemText: 'Дети',
        itemTextForms: ['ребёнок', 'ребёнка', 'детей'],
        combine: true,
      },
      {
        id: 'babies',
        itemText: 'Младенцы',
        itemTextForms: ['младенец', 'младенца', 'младенцев'],
      }
    ],
    buttons: [
      {
        action: 'clear',
        text: 'Очистить'
      },
      {
        action: 'apply',
        text: 'Применить'
      },
    ]
  });
});
