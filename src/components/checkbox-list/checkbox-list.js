import '../checkbox/checkbox'
import '../toggle-button/toggle-button'
import './checkbox-list.scss'

$(document).ready(function(){
  $('.checkbox-list--expandable').children('.checkbox-list__title').on('click', function() {
    $(this).parent().toggleClass('checkbox-list--active')
  });
})
