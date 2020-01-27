import '../text-field/text-field'
import './dropdown.scss'
import './dropdown--range-date'
import './dropdown--separated-date'

$(document).ready(function(){
  $('.dropdown').children('input').keypress(function(event) {
    if (event.keyCode === 13) {
      $(this).click()
    }
  });
  $('.dropdown').on('mouseup', function(e) {
    e.originalEvent.inFocus = true;
    $(this).children().off('blur');
  });
})

