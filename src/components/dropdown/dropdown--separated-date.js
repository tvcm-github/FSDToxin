import '../../plugins/datepicker/datepicker'

$(document).ready(function(){
  var $this = $('.dropdown--separated-date').children('input');
  $this.datepicker({clearButton: true, showEvent: 'click', range: true, twoInputsIdDiff: 'checkin checkout', dateFormat: 'dd.mm.yyyy'}); //twoInputsIdDiff - the difference between start and end date inputs of one block (for example dates-block)
  $this.datepicker({
    onShow: function(inst, animationCompleted){
      if (!animationCompleted){
        $(inst.target).parent().addClass('dropdown--active');
      }
    },
    onHide: function(inst, animationCompleted) {
      if (!animationCompleted){
        $(inst.target).parent().removeClass('dropdown--active');
      } else {
      }
    }
  })
})
