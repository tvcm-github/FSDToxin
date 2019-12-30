import '../text-field/text-field'
import './dropdown.scss'

$(document).ready(function(){
  $('.text-field--range-date').datepicker({clearButton: true, applyButton: true, range: true, multipleDatesSeparator: ' - ', dateFormat: 'dd M', inline: true});
  $('.text-field--separated-date').datepicker({clearButton: true, applyButton: true, showEvent: 'click', range: true, twoInputsIdDiff: 'checkin checkout', dateFormat: 'dd.mm.yyyy'});
  $('.text-field--separated-date').each(function() {
    var _this = $(this);
    var datepicker = _this.data('datepicker')
      _this.parent().on('mouseup', function (e) {
        e.originalEvent.inFocus = true;
        _this.off('blur');
      });
      datepicker.$secondEl.on('click', function(e) {
        if (datepicker.visible) {
          datepicker.hide();
        }
        else {
          datepicker.show();
        }
      })
      datepicker.$secondEl.on('mouseup', function(e) {
        e.originalEvent.inFocus = true;
      })
      datepicker.$secondEl.parent().on('mouseup', function(e) {
        e.stopPropagation();
      })
  });
})

