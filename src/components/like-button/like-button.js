import './like-button.scss'

$(document).ready(function(){

  $('.like-button').click(function(){
      $(this).toggleClass('like-button--active');
  })

})
