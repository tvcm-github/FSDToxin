import '../datepicker/datepicker'

$(document).ready(function(){
  var $this = $('.dropdown--range-date').children('input');
  $this.datepicker({clearButton: true, applyButton: true, showEvent: 'click', range: true, multipleDatesSeparator: ' - ', dateFormat: 'dd M'});
  $this.datepicker({
    onShow: function(inst, animationCompleted){
      if (!animationCompleted){
        $(inst.target).parent().addClass('dropdown--active');
      }
    },
    onHide: function(inst, animationCompleted) {
      if (!animationCompleted){
        $(inst.target).parent().removeClass('dropdown--active');
      }
    }
  })
})
