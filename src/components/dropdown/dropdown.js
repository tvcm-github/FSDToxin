import '../text-field/text-field'
import './dropdown.scss'
import './dropdown--range-date'
import './dropdown--separated-date'
import './dropdown--room-features'

$(document).ready(function(){
  $('.dropdown').children('input').keypress(function(event) {
    if (event.keyCode === 13) {
      $(this).click()
    }
  });
})

