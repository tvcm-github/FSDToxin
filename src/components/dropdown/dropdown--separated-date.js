import '../datepicker/datepicker'
import '../datepicker/datepicker.css'

$(document).ready(function(){
  var $this = $('.dropdown--separated-date').children('input');
  $this.datepicker({clearButton: true, applyButton: true, showEvent: 'click', range: true, twoInputsIdDiff: 'checkin checkout', dateFormat: 'dd.mm.yyyy'}); //twoInputsIdDiff - the difference between start and end date inputs of one block (for example dates-block)
  $this.datepicker({
    onShow: function(inst, animationCompleted){
      inst.inputs.map(input => input.parent().addClass('dropdown--active'))},
    onHide: function(inst, animationCompleted) {
      inst.inputs.map(input => input.parent().removeClass('dropdown--active'))
    }
  })
})
