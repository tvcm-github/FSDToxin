import '../text-field/text-field'
import './dropdown.scss'
import './dropdown--dates'

$(document).ready(function(){
  $('.text-field--dropdown').keypress(function(event) {
    if (event.keyCode === 13) {
      $(this).click()
    }
  });
  $('.dropdown').on('mouseup', function(e) {
    e.originalEvent.inFocus = true;
    $(this).children().off('blur');
  });
})

