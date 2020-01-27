import '../datepicker/datepicker'
import '../datepicker/datepicker.css'

$(document).ready(function(){
  var $this = $('.dropdown--range-date').children('input');
  $this.datepicker({clearButton: true, applyButton: true, showEvent: 'click', range: true, multipleDatesSeparator: ' - ', dateFormat: 'dd M'});
  $this.datepicker({
    onShow: function(inst, animationCompleted){
      inst.inputs.map(input => input.parent().addClass('dropdown--active'))},
    onHide: function(inst, animationCompleted) {
      inst.inputs.map(input => input.parent().removeClass('dropdown--active'))
    }
  })
})
