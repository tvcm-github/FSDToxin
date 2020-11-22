import './like-button.scss'

$(function(){

  $('.like-button').click(function(){
      let $this = $(this)
      let $value = $this.find('.like-button__value')
      let currentVal = $value.text()

      currentVal = $this.hasClass('like-button--active') ? +currentVal - 1 : +currentVal + 1
      $value.text(currentVal)
      $this.toggleClass('like-button--active')
  })

})
