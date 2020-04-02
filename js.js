window.addEventListener('DOMContentLoaded', function () {
    
    'use strict';

    let deadline = '2020-07-03';
    // Создали переменную, куда внесли дату окончания отсчета

    function getTimeRemaining (endtime) { // Cоздали функцию, которая будет определять сколько времени осталось до окончания deadline 
        let t = Date.parse(endtime) - Date.parse(new Date()), // Создали переменную Т, которая будет вычислять из даты deadline сегодняшнюю дату. Получаем все данные в миллисекундах
            seconds = Math.floor((t/1000) % 60), // Получаем количество секунд
            minutes = Math.floor((t/1000/60) % 60), // Минут 
            hours = Math.floor(t/1000/60/60); // Часов
            // Если нужно получить количество дней, то тогда:
            // hours = minutes = Math.floor((t/1000/60/60) % 24);
            // days = Math.floor(t/1000/60/60/24);

            return { // Возвращаем данные, их потом передадим в другую функцию, которая будет обновлять время
                'total' : t, // Общее количество миллисекунд
                'hours' : hours, // Часы
                'minutes' : minutes, // Минуты
                'seconds' : seconds, // Секунды
            };
    };

    function setClock(id, endtime) { // Функция с двумя параметрами, первое куда будет записывать, второе что будем записывать
        let timer = document.getElementById(id), // Переменная, которая хранит в себе обертку HTML, куда будут записываться данные 
            hours = timer.querySelector('.hours'), // Куда будут записываться часы
            minutes = timer.querySelector('.minutes'), // Куда будут записываться минуты
            seconds = timer.querySelector('.seconds'), // Куда будут записываться секунды
            timeInterval = setInterval(updateClock, 1000); // Это таймер, через какой интервал будет обновляться время, 1 раз в 1 секунду
        
        function updateClock() { // Функция, которая принимает данные с getTimeRemaining, чтобы записать в HTML
            let t = getTimeRemaining(endtime); // Создали переменную, которая обращается к объекту, чтобы получить доступ к общему времени, часам, минутам и секундам

            function addZero(num) { // Сюда передаем время час, минуты и секунду
                if(num <= 9) { // Если час, минута и секунда меньше девяти, тогда 
                    return '0' + num; //сперва прибавляем 0 к часу, минуте и секунде
                } else { // если условие неверно
                    return num; // просто возращаем число
                }
            };

            hours.textContent = addZero(t.hours); // Заменяем в HTML  часы на полученные данные из функции getTimeRemaining и приверяем, полученная цифра меньше или больше девяти
            minutes.textContent = addZero(t.minutes); // Точно так же но с минутами
            seconds.textContent = addZero(t.seconds); // и секундами

            if (t.total <= 0) { // Делаем проверку, если общее количество миллисекунд меньше или равно 0, тогда
                clearInterval(timeInterval); // Останавливаем интервал срабатывания
                hours.textContent = '00' // и указываем, чему будут равны часы
                minutes.textContent = '00' // минуты
                seconds.textContent = '00' // и секунды
            }

        };
      
    };

    setClock('timer', deadline); // Вызываем функцию, которая запустит польностью весь механизм таймера
    
});