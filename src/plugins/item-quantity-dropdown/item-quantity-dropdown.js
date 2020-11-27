/* global jQuery */

// plugin styles
import './item-quantity-dropdown.css';

/* eslint-disable func-names */
(function ($) {
  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    totalTextForms: ['пункт', 'пункта', 'пунктов'],
    controls: {
      position: 'right',
      controlsCls: 'iqdropdown-item-controls',
      counterCls: 'counter',
    },
    items: [],
    onChange: () => {},
    onShow: () => {},
    onHide: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true,
  };

  $.fn.iqDropdown = function (options) {
    this.each(function () {
      const $this = $(this);
      const $input = $this.find('input');
      const $menu = $('<div class="iqdropdown"></div>').insertAfter($this);
      const settings = $.extend(true, {}, defaults, options);
      const $items = $(settings.items);
      let items = [];
      const itemCount = {};
      var itemCountApplied = {};
      const $counterHtml = {};
      let totalItems = 0;
      var visible = false;
      var actions = {};
      var inFocus = false;
      var elAreaInFocus = false;
      var applyOption = false;
      const $buttons = {};

      if (settings.buttons) {
        applyOption = settings.buttons.some(item => item.action === 'apply') ? true : false;
      }

      $items.each(function () {
        const $item = $(`<div class="iqdropdown-option">
        <div class ="iqdropdown-content">
          <p class="iqdropdown-item">${this.itemText}</p>
        </div>
      </div>`).appendTo($menu);

        if (this.itemDescription) {
          $(`<p class="iqdropdown-description">${this.itemDescription}</p>`).appendTo($item.children())
        }

        const id = this.id;
        const defaultCount = Number(this.defaultCount || '0');

        itemCount[id]  = defaultCount;
        itemCountApplied[id]  = defaultCount;
        totalItems += defaultCount;
        setItemSettings(this);
        addControls(id, $item);
      });

      $('body').on('mouseup.adp', _onMouseUpBody.bind(this))
      $input.on('blur', _onBlur.bind(this))
      $input.on('mouseenter', function() {elAreaInFocus = true;})
      $input.on('mouseleave', function() {elAreaInFocus = false;})
      $menu.on('mouseenter', function(){ elAreaInFocus = true})
      $menu.on('mouseleave', function(){ elAreaInFocus = false})
      $menu.on('mousedown', function(){inFocus = true;})
      $menu.on('mouseup', function(){inFocus = false;})

      function _onMouseUpBody() {
        if (elAreaInFocus) return
        if (!inFocus && visible) {
          hide();
        }
      }

      function _onBlur() {
        if (!inFocus && visible) {
          hide()
        }
      }

      function show () {
        $menu.addClass('iqdropdown--opened');
        settings.onShow($this);
        visible = true;
      }

      function hide () {
        $menu.removeClass('iqdropdown--opened');
        settings.onHide($this);
        visible = false;
        inFocus = false;
        $input.blur();
        updateCounters();
        clearButtonVisibility();
      }

      function updateDisplay () {
        let inputValueArray = [];
        let combinedItems = 0;
        let inputString;

        if (totalItems > 0) {
          items.forEach(function(item) {
            if (itemCount[item.id] > 0) {
              if (!item.combine) {
                inputValueArray.push(buildItemString(itemCount[item.id], item.itemTextForms));
              }
              else {
                combinedItems += itemCount[item.id];
              }
            }
          });

          if (combinedItems > 0) {
            inputValueArray.unshift(buildItemString(combinedItems, settings.totalTextForms))
          }

          inputString = inputValueArray.join(settings.itemsSeparator)


          $input.val(inputString);

        } else {
          $input.val('');
        }
        updateCounters();
        clearButtonVisibility();
      }

      function updateCounters() {
        totalItems = 0;
        items.forEach(function(item){
          if (applyOption) {
            itemCount[item.id] = itemCountApplied[item.id];
          }
          totalItems += itemCount[item.id];
          updateCounterButtons(item.id);
          $counterHtml[item.id].html(itemCount[item.id]);
        })
      }

      function updateCounterButtons(id) {
        const decrementButton = $counterHtml[id].siblings('.button-decrement');
        const incrementButton = $counterHtml[id].siblings('.button-increment');
        if (itemCount[id] === items.find(item => item.id == id).minCount) {
          decrementButton.addClass('disabled')
        } else if (decrementButton.hasClass('disabled')) {
          decrementButton.removeClass('disabled');
        }
        if (itemCount[id] === items.find(item => item.id == id).maxCount) {
          incrementButton.addClass('disabled')
        } else if (incrementButton.hasClass('disabled')) {
          incrementButton.removeClass('disabled');
        }
      }

      function buildItemString(quantity, textForms) {
        var text = textForms[getCaseIndex(quantity)];
        var string = `${quantity} ${text}`;
        return string;
      }

      function getCaseIndex (counter) {
        if (Math.floor(counter / 10) % 10 === 1) {
          return 2;
        } else {
          if (counter % 10 === 1) {
            return 0;
          } else if (1 < (counter % 10) && (counter % 10) <= 4) {
            return 1;
          } else {
            return 2;
          }
        }
      }

      function setItemSettings (item) {
        const minCount = item.minCount;
        const maxCount = item.maxCount;

        items.push({
          id: item.id,
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
          itemTextForms: item.itemTextForms,
          combine: item.combine,
        });
      }

      function addControls (id, $item) {
        const $controls = $('<div />').addClass(settings.controls.controlsCls);
        const $decrementButton = $(`
          <button type="button" class="button-decrement"><span>-</span></button>
        `);
        const $incrementButton = $(`
          <button type="button" class="button-increment"><span>+</span></button>
        `);
        $counterHtml[id] = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);
        $controls.append($decrementButton, $counterHtml[id], $incrementButton);

        if (settings.controls.position === 'right') {
          $item.append($controls);
        } else {
          $item.prepend($controls);
        }

        $decrementButton.click((event) => {
          const {minItems, beforeDecrement, onChange } = settings;
          const allowClick = beforeDecrement(id, itemCount);

          if (allowClick && totalItems > minItems && itemCount[id] > items.find(item => item.id == id).minCount) {
            itemCount[id] -= 1;
            totalItems -= 1;
            updateCounterButtons(id);
            $counterHtml[id].html(itemCount[id]);
            if (!applyOption) {
              updateDisplay();
            }
            clearButtonVisibility();
            onChange(id, itemCount[id], totalItems);
          }
          event.preventDefault();
        });


        $incrementButton.click((event) => {
          const { maxItems, beforeIncrement, onChange } = settings;
          const allowClick = beforeIncrement(id, itemCount);

          if (allowClick && totalItems < maxItems && itemCount[id] < items.find(item => item.id == id).maxCount) {
            itemCount[id] += 1;
            totalItems += 1;
            updateCounterButtons(id);
            $counterHtml[id].html(itemCount[id]);
            if (!applyOption) {
              updateDisplay();
            }
            clearButtonVisibility();
            onChange(id, itemCount[id], totalItems);
          }
          event.preventDefault();
        });

        $item.click(event => event.stopPropagation());

        return $item;
      }

      actions.apply = function () {
        items.forEach(function(item) {
          itemCountApplied[item.id] = itemCount[item.id];
        });
        updateDisplay();
        hide();
      }

      actions.clear = function () {
        totalItems = 0;
        items.forEach(function(item) {
          if (applyOption) {
            itemCountApplied[item.id] = item.minCount;
          }
          totalItems += item.minCount;
          itemCount[item.id] = item.minCount;
          });
        updateDisplay();
      }

      function _onButtonClick(e) {
        var action = $(e.target).data('action');
        actions[action]();
      }


      function addButtons() {
          var $buttonsContainer = $('<div class="iqdropdown-buttons"></div>').appendTo($menu);
          settings.buttons.forEach(function(button) {
            $buttons[button.action] = $(`<button type="button" class="iqdropdown-button" data-action="${button.action}">${button.text}</button>`).appendTo($buttonsContainer)
            $buttons[button.action].on('click', _onButtonClick.bind(this))
          })
      }

      function clearButtonVisibility() {
        if ($buttons['clear']) {
          if (totalItems === 0) $buttons['clear'].removeClass('iqdropdown-button--visible')
          else if (!$buttons['clear'].hasClass('iqdropdown-button--visible')) {
            $buttons['clear'].addClass('iqdropdown-button--visible')
          }
        }
      }
      $input.on('click', function() {
        if (!visible) {
          show();
        }
        else {
          hide();
        }
      });

      if (settings.buttons) {
        addButtons();
      }
      updateDisplay();
    });

    return this;
  };
}(jQuery));
