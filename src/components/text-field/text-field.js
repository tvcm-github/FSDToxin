import IMask from 'imask'
import './text-field.scss'

var $dropdownField = $('.text-field--dropdown');
$dropdownField.parent().on('toggleActive', function(){
  $(this).children().toggleClass('text-field--focused text-field--no-radius')
})

var elements = document.getElementsByClassName('birthday-mask')
Array.prototype.forEach.call(elements, function(element){
  var dateMask = IMask(element, {
    mask: Date,
    min: new Date(1900, 0, 1),
    max: new Date(2010, 0, 1),
    lazy: true,
    autofix: true
  });
});


