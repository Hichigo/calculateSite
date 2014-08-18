; (function($) {
  var defaults = {
    calc: [
      {
        desc: 'Калькулятор расчета стоимости разработки сайта',
        type: 'none',
        group: 'desc',
        text: [
          'При помощи формы ниже, Вы можете получить приблизительную стоимость:',
          ' - разработки сайта',
          ' - создания логотипа',
          ' - разработки фирменного стиля',
          ' - регистрации хостинга'
        ],
        price: [1000, 2000, 3000, 4000, 5000]
      },
      {
        desc: 'Выберите тип сайта',
        type: 'radio', // select
        group: 'type-site',
        text: [
          'Визитка',
          'Корпоративный',
          'Бизнес'
        ],
        price: [1000, 2000, 3000]
      },
      {
        desc: 'Дизайн',
        type: 'checkbox',
        group: 'design',
        text: [
          'Разработать логотип',
          'Фирменный дизайн'
        ],
        price: [1000, 2000]
      },
      {
        desc: 'Функциональность бизнес портала',
        type: 'checkbox',
        group: 'func-port',
        text: [
          'Регистрация пользователей',
          'Личный кабинет',
          '3D экскурсия офиса'
        ],
        price: [1000, 2000, 3000]
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
        price: [1000, 2000, 3000]
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
        price: [1000, 2000, 3000, 4000, 5000]
      },
      {
        desc: 'У вас есть хостинг?',
        type: 'radio',
        group: 'host',
        text: [
          'Да',
          'Нет'
        ],
        price: [100, 200]
      },
      {
        desc: 'Введите количество страниц',
        type: 'number',
        group: 'count',
        text: ['text'],
        price: [10]
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
        price: [1000, 2000, 3000]
      }
    ]};
  
  function createBlock(tag, className) {
    var $block = $(tag, {
      class: className
    });
    
    return $block;
  }
  
  function createElement(type, text, price, group, i, j) {
    var $li = createBlock('<div/>', 'li');
    switch (type) {
      case 'checkbox':
        var r = $('<input/>', {
              type: type,
              name: group,
              value: price,
              id: type+'-'+i+'-'+j
            }),
            l = $('<label/>', {
              for: type+'-'+i+'-'+j
            }).text(text+' цена: '+price);
        r.appendTo($li);
        l.appendTo($li);
        break;
      case 'radio':
        var r = $('<input/>', {
              type: type,
              name: group,
              value: price,
              id: type+'-'+i+'-'+j
            }),
            l = $('<label/>', {
              for: type+'-'+i+'-'+j
            }).text(text+' цена: '+price);
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
//      case 'select':
//        var s = $('<select/>'),
//            o = $('<option>').text(text);
//        
//        break;
      case 'none':
        $li.text(text);
        break;
    }
    
    return $li;
  }
  
  $.fn.calcSite = function(options) {
    var config = $.extend({}, defaults, options);
    var len = config.length;
    
    console.log(config.calc[0].price[0]);
    
    for(var i = 0; i < 9; i++) {
      var $block = createBlock('<div/>', 'block'),
          $descBlock = createBlock('<div/>', 'desc-block'),
          $mainBlock = createBlock('<div/>', 'main-block');
      
      $descBlock.html(config.calc[i].desc);
      for(var j = 0; j < config.calc[i].text.length; j++) {
        var $li = createElement(config.calc[i].type, config.calc[i].text[j], config.calc[i].price[j], config.calc[i].group, i, j);
        $li.appendTo($mainBlock);
      }
      
      $descBlock.appendTo($block);
      $mainBlock.appendTo($block);
      
      $block.appendTo(this);
    }
    
    $block = createBlock('<div/>', 'block');
    $block.addClass('last');
    $('<button/>', {
      class: 'calculate'
    }).text('Расчитать').appendTo($block);
    
    $block.appendTo(this);
    
  };
})(jQuery);