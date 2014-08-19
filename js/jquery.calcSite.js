; (function($) {
  var defaults = {
    blocks: [
      {
        desc: 'Калькулятор расчета стоимости разработки сайта',
        type: 'none',
        group: 'desc',
        text: [
          'При помощи формы ниже, Вы можете получить приблизительную стоимость разработки сайта'
        ],
        price: [1000, 2000, 3000, 4000, 5000],
        discount: [1, 1, 1, 1, 1]
      },
      {
        desc: 'Выберите тип сайта',
        type: 'radio', // select
        group: 'type-site',
        text: [
          'Визитка',
          'Бизнес',
          'Интернет магазин',
          'Корпоративный'
        ],
        price: [1000, 2000, 3000, 4000],
        discount: [1, 1, 1, 1]
      },
      {
        desc: 'Дизайн',
        type: 'checkbox',
        group: 'design',
        text: [
          'Разработать логотип',
          'Эксклюзивный дизайн',
          'Адаптивный дизайн сайта',
          'Простая анимация',
          'Сложная анимация'
        ],
        price: [1000, 2000, 3000, 4000, 5000],
        discount: [1, 1, 1, 1, 1]
      },
      {
        desc: 'Функциональность сайта',
        type: 'checkbox',
        group: 'func-site',
        text: [
          'Новости',
          'Комментарии',
          'Регистрация'
        ],
        price: [1000, 2000, 3000],
        discount: [1, 1, 1]
      },
      {
        desc: 'Функциональность бизнес портала',
        type: 'checkbox',
        group: 'func-port',
        text: [
          'Калькулятор',
          'Поиск по сайту',
          'Регистрация пользователей',
          'Личный кабинет',
          'Веб-чат'
        ],
        price: [1000, 2000, 3000, 4000, 5000],
        discount: [1, 1, 1, 1, 1]
      },
      {
        desc: 'Функциональность интернет магазина',
        type: 'checkbox',
        group: 'func-magaz',
        text: [
          'Регистрация пользователей',
          'Поиск по сайту',
          'Корзина товаров',
          'Фильтр товаров',
          'Слайд-шоу',
          'Гостевая книга',
          'Калькулятор',
          'Личный кабинет',
          'Веб-чат'
        ],
        price: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000],
        discount: [1, 1, 1, 0.15, 1, 1, 0.10, 1, 1]
      },
      {
        desc: 'Услуги копирайтера',
        type: 'checkbox',
        group: 'copyright',
        text: [
          'Готовый дизайн сайта из каталога',
          'Эксклюзивный дизайн сайта',
          'Адаптивный дизайн сайта',
          'Простая анимация',
          'Сложная анимация'
        ],
        price: [1000, 2000, 3000, 4000, 5000],
        discount: [1, 1, 1, 1, 1]
      },
      {
        desc: 'Условия хостинга',
        type: 'radio', // select
        group: 'case',
        text: [
          'Базовый',
          'Стандартный',
          'Бизнес'
        ],
        price: [1000, 2000, 3000],
        discount: [1, 0.3, 1]
      },
      {
        desc: 'Условия хостинга',
        type: 'sum',
        group: 'sum',
        text: [
          'Без скидки:',
          'Сумма скидки:',
          'Итого:'
        ],
        price: [0, 0, 0],
        discount: [0, 0, 0]
      }
    ]};
  
  function createBlock(tag, className, visible) {
    var $block = $(tag, {
      class: className
    });
    
    return $block;
  }
  
  function createElement(type, text, price, group, discount, i, j) {
    var $li = createBlock('<div/>', 'li');
    switch (type) {
      case 'checkbox':
        var r = $('<input/>', {
              type: type,
              name: group,
              value: price,
              'data-discount': discount,
              id: type+'-'+i+'-'+j
            }),
            l = $('<label/>', {
              for: type+'-'+i+'-'+j
            }).text(text+' (цена: '+price+') *'+discount*100+'%');
        r.appendTo($li);
        l.appendTo($li);
        break;
      case 'radio':
        var r = $('<input/>', {
              type: type,
              name: group,
              value: price,
              'data-discount': discount,
              id: type+'-'+i+'-'+j
            }),
            l = $('<label/>', {
              for: type+'-'+i+'-'+j
            }).text(text+' (цена: '+price+') *'+discount*100+'%');
        r.appendTo($li);
        l.appendTo($li);
        break;
      case 'number':
        var r = $('<input/>', {
              type: type,
              value: 1,
              min: 1,
              max: 100,
              step: 1
            });
        r.appendTo($li);
        break;
      case 'sum':
        $li = createBlock('<div/>', 'li sum').text(text+' '+price);
        break;
      case 'none':
        $li.text(text);
        break;
    }
    
    return $li;
  }
  
  $.fn.calcSite = function(options) {
    var config = $.extend({}, defaults, options),
        len = config.blocks.length,
        i, j;
    
    for(i = 0; i < len; i++) {
      var $block = createBlock('<div/>', 'block', config.blocks[i].visible),
          $descBlock = createBlock('<div/>', 'desc-block'),
          $mainBlock = createBlock('<div/>', 'main-block');
      
      $descBlock.html(config.blocks[i].desc);
      for(j = 0; j < config.blocks[i].text.length; j++) {
        var $li = createElement(config.blocks[i].type, config.blocks[i].text[j], config.blocks[i].price[j], config.blocks[i].group, config.blocks[i].discount[j], i, j);
        $li.appendTo($mainBlock);
      }
      
      $descBlock.appendTo($block);
      $mainBlock.appendTo($block);
      
      $block.appendTo(this);
    }
    
    $block = createBlock('<div/>', 'block');
    $block.addClass('last');
    $('<button/>', {
      id: 'calculate',
      class: 'calculate'
    }).text('Расчитать').appendTo($block);
    
    $block.appendTo(this);
    
    
    $('#calculate').on('click', function() {
      var length = $('.block input:checked').length,
          price = [],
          priceDiscount = [],
          sum = 0,
          sumDiscount = 0;
      for(i = 0; i < length; i++) {
        price[i] = parseInt($('.block input:checked').eq(i).attr('value'), 10);
        priceDiscount[i] = parseFloat($('.block input:checked').eq(i).attr('data-discount'), 10);
      }
      
      for(i = 0; i < length; i++) {
        sum += price[i];
        if(priceDiscount[i] < 1) {
          sumDiscount += price[i] * priceDiscount[i];
        }
        
      }
      
      
      $('.sum').eq(0).html('Без скидки: '+sum);
      $('.sum').eq(1).html('Сумма скидки: '+sumDiscount);
      $('.sum').eq(2).html('Итого: '+(sum - sumDiscount));
    });
  };
})(jQuery);