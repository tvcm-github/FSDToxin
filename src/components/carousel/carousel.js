import './carousel.scss'

(function() {
    $('.carousel').each(function() {
    let $this = $(this)
    let gallery = $this.children('.carousel__gallery')
    let images = gallery.children('.carousel__image')

    images.eq(0).addClass('carousel__image--active')

    if (images.length > 1) {
      $this
        .prepend('<a href="#" class="carousel__arrow carousel__arrow--right"></a>')
        .append('<div class="carousel__dots"></div>')
        .append('<a href="#" class="carousel__arrow carousel__arrow--left"></a>')

      let dots = $this.children('.carousel__dots')

      images.each(i => {
        if (!i) {
          dots.append('<div class="carousel__dot carousel__dot--active"></div>')
        }
        else {
          dots.append('<div class="carousel__dot"></div>')
        }
      })


      $this.on('click', '.carousel__arrow', function(e) {
        e.preventDefault()
        let arrow = $(this)
        let activeImage = $this.find('.carousel__image--active')
        let currentIndex = activeImage.index()
        let nextIndex;

        let left = false;

        if (arrow.hasClass('carousel__arrow--left')) {
          nextIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : images.length - 1
          left = true;
        } else {
          nextIndex = (currentIndex + 1) % images.length
        }

        if (left) {
          images
            .eq(nextIndex)
            .css({
              display: 'inline-block',
              left: '100%'})
            .animate({left : 0}, 300, function() { this.removeAttribute('style')})

          activeImage.animate({right: '100%'}, 300, function() {
            this.removeAttribute('style')
            $(this).removeClass('carousel__image--active')
          })

        } else {
          images
            .eq(nextIndex)
            .css({
              display: 'inline-block',
              right: '100%'})
            .animate({right : 0}, 300, function() {this.removeAttribute('style')})

          activeImage.animate({left: '100%'}, 300, function() {
            this.removeAttribute('style')
            $(this).removeClass('carousel__image--active')
          })
        }

        dots.find('.carousel__dot--active').removeClass('carousel__dot--active')
        images
          .eq(nextIndex)
          .addClass('carousel__image--active')
        dots.children('.carousel__dot')
          .eq(nextIndex)
          .addClass('carousel__dot--active')

      })
    }
  })
})();
