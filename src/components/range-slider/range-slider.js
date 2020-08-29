import './range-slider.scss'

let sliders = document.querySelectorAll('.range-slider');
sliders.forEach(slider => {
  let inputHidden = slider.querySelector('.range-slider__input-hidden'),
      inputTop = slider.querySelector('.range-slider__input-top'),
      outputLow = slider.querySelector('.range-slider__output-low'),
      outputHigh = slider.querySelector('.range-slider__output-high'),
      thumbLeft = slider.querySelector('.range-slider__thumb--left'),
      thumbRight = slider.querySelector('.range-slider__thumb--right'),
      range = slider.querySelector('.range-slider__range'),
      min = parseInt(inputTop.min),
      max = parseInt(inputTop.max),
      highValue = inputTop.value,
      leftThumbPos = thumbLeftPercentPos(inputHidden.value),
      rightThumbPos = thumbRightPercentPos(inputTop.value), // position from right to left, so the actual position in percent is (100 - this)
      perPercentValue = (max - min) / 100,
      minRangePercent = 10,
      moveLeft = false;

  function passClick(e) {
    let clickPercentPoint = (e.offsetX / this.offsetWidth) * 100;
    let thumbsMiddlePercent = ((100 - rightThumbPos - leftThumbPos) / 2) + leftThumbPos;

    if (clickPercentPoint < thumbsMiddlePercent) {
      moveLeft = true;
    }
    else {
      moveLeft = false;
    }
  }

  function update() {
    if (moveLeft) {
      inputHidden.value = Math.min(parseInt(inputTop.value), parseInt(highValue) - perPercentValue * minRangePercent);
      inputTop.value = highValue;

      leftThumbPos = thumbLeftPercentPos(inputHidden.value);

      outputLow.value = inputHidden.value;
      thumbLeft.style.left = leftThumbPos + '%';
      range.style.left = leftThumbPos + '%';
    }
    else {
      inputTop.value = Math.max(parseInt(inputTop.value), parseInt(inputHidden.value) + perPercentValue * minRangePercent);
      highValue = inputTop.value;

      rightThumbPos = thumbRightPercentPos(inputTop.value);

      outputHigh.value = inputTop.value;
      thumbRight.style.right = rightThumbPos + '%';
      range.style.right = rightThumbPos + '%';
    }
  }

  function thumbLeftPercentPos(value) {
    return (value - min) / (max - min) * 100;
  }

  //calculate position from the right side
  function thumbRightPercentPos(value) {
    return (max - value) / (max - min) * 100;
  }

  inputTop.addEventListener('mousedown', passClick); //Event listener for an overlapping item
  inputTop.addEventListener('input', update);
})
