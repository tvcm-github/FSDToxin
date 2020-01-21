import '../text-field/text-field'
import './dropdown.scss'
import './dropdown--range-date'
import './dropdown--separated-date'
import './dropdown--room-features'
import './dropdown--guests'

$(document).ready(function(){
<<<<<<< HEAD
  $('.dropdown').children('input').keypress(function(event) {
=======
  $('.text-field--range-date').datepicker({clearButton: true, applyButton: true, showEvent: 'click', range: true, multipleDatesSeparator: ' - ', dateFormat: 'dd M', inline: true});
  $('.text-field--separated-date').datepicker({clearButton: true, applyButton: true, showEvent: 'click', range: true, twoInputsIdDiff: 'checkin checkout', dateFormat: 'dd.mm.yyyy'});
  $('.text-field--range-date, .text-field--separated-date').datepicker({
    onShow: function(inst, animationCompleted){
      inst.inputs.map(input => input.parent().addClass('dropdown--active'))},
    onHide: function(inst, animationCompleted) {
      inst.inputs.map(input => input.parent().removeClass('dropdown--active'))
    }
  })
  $('.text-field--dropdown').keypress(function(event) {
>>>>>>> Datepicker block finished
    if (event.keyCode === 13) {
      $(this).click()
    }
  });
})

