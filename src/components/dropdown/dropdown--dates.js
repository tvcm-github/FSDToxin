import './datepicker'
import './datepicker.css'

$(document).ready(function(){
  $('.text-field--range-date').datepicker({clearButton: true, applyButton: true, showEvent: 'click', range: true, multipleDatesSeparator: ' - ', dateFormat: 'dd M', inline: true});
  $('.text-field--separated-date').datepicker({clearButton: true, applyButton: true, showEvent: 'click', range: true, twoInputsIdDiff: 'checkin checkout', dateFormat: 'dd.mm.yyyy'}); //twoInputsIdDiff - the difference between start and end date inputs of one block (for example dates-block)
  $('.text-field--range-date, .text-field--separated-date').datepicker({
    onShow: function(inst, animationCompleted){
      inst.inputs.map(input => input.parent().addClass('dropdown--active'))},
    onHide: function(inst, animationCompleted) {
      inst.inputs.map(input => input.parent().removeClass('dropdown--active'))
    }
  })
})
