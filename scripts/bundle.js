!function(e){var n={};function a(m){if(n[m])return n[m].exports;var t=n[m]={i:m,l:!1,exports:{}};return e[m].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=e,a.c=n,a.d=function(e,n,m){a.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:m})},a.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(n,"a",n),n},a.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},a.p="",a(a.s=0)}([function(e,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var m=a(1),t=(a.n(m),a(2)),r=a.n(t);function i(e){return""!==$(e).val()}function o(e){let n;return $(e).each(a=>{$(e[a]).prop("checked")&&(n=!0)}),n}function c(e,n){if(void 0===e||void 0===n)return;const a=e.parents();let m;return a.each(e=>{$(a[e]).hasClass(n)&&(m=$(a[e]))}),m}document.addEventListener("DOMContentLoaded",function(){const e=document.querySelectorAll('.grip-item input[type="radio"]'),n=document.querySelectorAll(".grip");$("#input-phone").mask("+38(099)999-99-99"),n.forEach(n=>{n.addEventListener("click",n=>{if("INPUT"===n.target.nodeName.toUpperCase()){const a=n.target.getAttribute("name"),m=n.target.getAttribute("value");e.forEach(e=>{e.getAttribute("name")===a&&(e.parentNode.classList.remove("grip-item_active"),e.getAttribute("value")===m&&e.parentNode.classList.add("grip-item_active"))})}})});const a=[{name:"subj_name",msg:"Вы не ввели имя",validator:i},{name:"age",msg:"Вы не выбрали возраст",validator:o},{name:"staj",msg:"Вы не выбрали стаж",validator:o},{name:"trudo",msg:"Вы не выбрали трудоустройство",validator:o},{name:"spravka",msg:"Вы не указали наличие справки",validator:o},{name:"sum",msg:"Вы не указали сумму",validator:i},{name:"city",msg:"Вы не указали город",validator:i},{name:"tel",msg:"Вы не указали номер телефона",validator:i}];document.getElementById("main-form").addEventListener("submit",function(e){let n;e.preventDefault();for(let m of a)m.validator(e.target[m.name])?(console.log(e.target),c($(e.target[m.name]),"input-item").find(".error").remove()):(n=c($(e.target[m.name]),"input-item").children())[n.length-1].classList.contains("error")||c($(e.target[m.name]),"input-item").append(`<div class="error">${m.msg}</div>`)});const m=document.querySelector(".percentage-line"),t=document.querySelectorAll(".percentage-line__item"),s=m.dataset.total;t.forEach((e,n)=>{let a=(100*e.dataset.part/s+"").substring(0,4)+"%";window.innerWidth>550?(e.style.backgroundColor=e.dataset.color,e.style.width=a):e.style.width=100/t.length+"%"}),window.innerWidth<550&&console.log(t[0].parentNode.classList.add("mobile"));const l=$("#input-city"),u=$("#city-list");let d;d=[],r.a.forEach(e=>{e.city.forEach(e=>{d.push(function(e,n,...a){const m=document.createElement(e);void 0!==n&&Object.keys(n).forEach(e=>{m.setAttribute(e,n[e])});return a.forEach(e=>{"string"!=typeof e&&"number"!=typeof e||(e=document.createTextNode(e)),m.appendChild(e)}),m}("option",{class:"select-city",value:e.name}))})}),d=d.reverse(),l.on("input",function(e){e.target.value.length<3?u.html(""):u.append(d)})})},function(e,n){},function(e,n){e.exports=[{name:"Автономная Республика Крым",city:[{name:"Алупка"},{name:"Алушта"},{name:"Армянск"},{name:"Бахчисарай"},{name:"Белогорск"},{name:"Джанкой"},{name:"Евпатория"},{name:"Керчь"},{name:"Красноперекопск"},{name:"Саки"},{name:"Севастополь"},{name:"Симферополь"},{name:"Старый Крым"},{name:"Судак"},{name:"Феодосия"},{name:"Щёлкино"},{name:"Ялта"}]},{name:"Винницкая область",city:[{name:"Бар"},{name:"Бершадь"},{name:"Винница"},{name:"Гайсин"},{name:"Жмеринка"},{name:"Казатин"},{name:"Калиновка"},{name:"Ладыжин"},{name:"Могилёв-Подольский"},{name:"Немиров"},{name:"Погребище"},{name:"Тульчин"},{name:"Хмельник"},{name:"Шаргород"},{name:"Ямполь"}]},{name:"Волынская область",city:[{name:"Берестечко"},{name:"Владимир-Волынский"},{name:"Горохов"},{name:"Камень-Каширский"},{name:"Киверцы"},{name:"Ковель"},{name:"Луцк"},{name:"Любомль"},{name:"Нововолынск"},{name:"Рожище"},{name:"Устилуг"}]},{name:"Днепропетровская область",city:[{name:"Апостолово"},{name:"Верхнеднепровск"},{name:"Вольногорск"},{name:"Днепродзержинск"},{name:"Днепропетровск"},{name:"Жёлтые Воды"},{name:"Кривой Рог"},{name:"Марганец"},{name:"Никополь"},{name:"Новомосковск"},{name:"Орджоникидзе"},{name:"Павлоград"},{name:"Перещепино"},{name:"Першотравенск"},{name:"Подгородное"},{name:"Пятихатки"},{name:"Синельниково"},{name:"Терновка"}]},{name:"Донецкая область",city:[{name:"Авдеевка"},{name:"Артёмовск"},{name:"Волноваха"},{name:"Горловка"},{name:"Дзержинск"},{name:"Дебальцево"},{name:"Димитров"},{name:"Доброполье"},{name:"Докучаевск"},{name:"Донецк"},{name:"Дружковка"},{name:"Енакиево"},{name:"Ждановка"},{name:"Зугрэс"},{name:"Кировское"},{name:"Краматорск"},{name:"Красноармейск"},{name:"Красный Лиман"},{name:"Константиновка"},{name:"Мариуполь"},{name:"Макеевка"},{name:"Новогродовка"},{name:"Селидово"},{name:"Славянск"},{name:"Снежное"},{name:"Соледар"},{name:"Торез"},{name:"Угледар"},{name:"Харцызск"},{name:"Шахтёрск"},{name:"Ясиноватая"}]},{name:"Житомирская область",city:[{name:"Андрушёвка"},{name:"Барановка"},{name:"Бердичев"},{name:"Житомир"},{name:"Коростень"},{name:"Коростышев"},{name:"Малин"},{name:"Новоград-Волынский"},{name:"Овруч"},{name:"Радомышль"}]},{name:"Закарпатская область",city:[{name:"Берегово"},{name:"Виноградов"},{name:"Иршава"},{name:"Мукачево"},{name:"Перечин"},{name:"Рахов"},{name:"Свалява"},{name:"Тячев"},{name:"Ужгород"},{name:"Хуст"},{name:"Чоп"}]},{name:"Запорожская область",city:[{name:"Бердянск"},{name:"Васильевка"},{name:"Вольнянск"},{name:"Гуляйполе"},{name:"Днепрорудное"},{name:"Запорожье"},{name:"Каменка-Днепровская"},{name:"Мелитополь"},{name:"Молочанск"},{name:"Орехов"},{name:"Пологи"},{name:"Приморск"},{name:"Токмак"},{name:"Энергодар"}]},{name:"Ивано-Франковская область",city:[{name:"Болехов"},{name:"Бурштын"},{name:"Галич"},{name:"Городенка"},{name:"Долина"},{name:"Ивано-Франковск"},{name:"Калуш"},{name:"Коломыя"},{name:"Косов"},{name:"Надворная"},{name:"Рогатин"},{name:"Снятын"},{name:"Тысменица"},{name:"Тлумач"},{name:"Яремче"}]},{name:"Киевская область",city:[{name:"Белая Церковь"},{name:"Березань"},{name:"Богуслав"},{name:"Борисполь"},{name:"Боярка"},{name:"Бровары"},{name:"Буча"},{name:"Васильков"},{name:"Вишнёвое"},{name:"Вышгород"},{name:"Ирпень"},{name:"Кагарлык"},{name:"Киев"},{name:"Мироновка"},{name:"Обухов"},{name:"Переяслав-Хмельницкий"},{name:"Припять"},{name:"Ржищев"},{name:"Сквира"},{name:"Славутич"},{name:"Тараща"},{name:"Тетиев"},{name:"Узин"},{name:"Украинка"},{name:"Фастов"},{name:"Чернобыль"},{name:"Яготин"}]},{name:"Кировоградская область",city:[{name:"Александрия"},{name:"Бобринец"},{name:"Гайворон"},{name:"Долинская"},{name:"Знаменка"},{name:"Кировоград"},{name:"Малая Виска"},{name:"Новомиргород"},{name:"Новоукраинка"},{name:"Светловодск"}]},{name:"Луганская область",city:[{name:"Александровск"},{name:"Алмазная"},{name:"Алчевск"},{name:"Антрацит"},{name:"Брянка"},{name:"Вахрушево"},{name:"Горное"},{name:"Зимогорье"},{name:"Золотое"},{name:"Зоринск"},{name:"Краснодон"},{name:"Красный Луч"},{name:"Лисичанск"},{name:"Луганск"},{name:"Лутугино"},{name:"Миусинск"},{name:"Молодогвардейск"},{name:"Новодружеск"},{name:"Новопсков"},{name:"Первомайск"},{name:"Перевальск"},{name:"Петровское"},{name:"Попасная"},{name:"Приволье"},{name:"Ровеньки"},{name:"Рубежное"},{name:"Сватово"},{name:"Свердловск"},{name:"Северодонецк"},{name:"Старобельск"},{name:"Стаханов"},{name:"Суходольск"},{name:"Счастье"},{name:"Теплогорск"},{name:"Червонопартизанск"}]},{name:"Львовская область",city:[{name:"Белз"},{name:"Бобрка"},{name:"Борислав"},{name:"Броды"},{name:"Буск"},{name:"Великие Мосты"},{name:"Глиняны"},{name:"Городок"},{name:"Добромиль"},{name:"Дрогобыч"},{name:"Дубляны"},{name:"Жидачов"},{name:"Жолква"},{name:"Золочев"},{name:"Каменка-Бугская"},{name:"Львов"},{name:"Мостиска"},{name:"Перемышляны"},{name:"Пустомыты"},{name:"Рава-Русская"},{name:"Радехов"},{name:"Рудки"},{name:"Самбор"},{name:"Сколе"},{name:"Сокаль"},{name:"Старый Самбор"},{name:"Стрый"},{name:"Трускавец"},{name:"Угнев"},{name:"Хыров"},{name:"Червоноград"},{name:"Яворов"}]},{name:"Николаевская область",city:[{name:"Баштанка"},{name:"Вознесенск"},{name:"Николаев"},{name:"Новая Одесса"},{name:"Новый Буг"},{name:"Очаков"},{name:"Первомайск"},{name:"Снигирёвка"},{name:"Южноукраинск"}]},{name:"Одесская область",city:[{name:"Ананьев"},{name:"Арциз"},{name:"Балта"},{name:"Белгород-Днестровский"},{name:"Болград"},{name:"Измаил"},{name:"Ильичёвск"},{name:"Килия"},{name:"Кодыма"},{name:"Котовск"},{name:"Одесса"},{name:"Татарбунары"},{name:"Теплодар"},{name:"Южное"}]},{name:"Полтавская область",city:[{name:"Гадяч"},{name:"Глобино"},{name:"Гребёнка"},{name:"Зеньков"},{name:"Карловка"},{name:"Кременчуг"},{name:"Кобеляки"},{name:"Комсомольск"},{name:"Лохвица"},{name:"Лубны"},{name:"Миргород"},{name:"Пирятин"},{name:"Полтава"},{name:"Хорол"},{name:"Червонозаводское"}]},{name:"Ровенская область",city:[{name:"Березне"},{name:"Дубно"},{name:"Дубровица"},{name:"Здолбунов"},{name:"Корец"},{name:"Костополь"},{name:"Кузнецовск"},{name:"Острог"},{name:"Радивилов"},{name:"Ровно"},{name:"Сарны"}]},{name:"Сумская область",city:[{name:"Ахтырка"},{name:"Белополье"},{name:"Бурынь"},{name:"Глухов"},{name:"Кролевец"},{name:"Конотоп"},{name:"Лебедин"},{name:"Путивль"},{name:"Ромны"},{name:"Середина-Буда"},{name:"Сумы"},{name:"Тростянец"},{name:"Шостка"}]},{name:"Тернопольская область",city:[{name:"Бережаны"},{name:"Борщёв"},{name:"Бучач"},{name:"Залещики"},{name:"Збараж"},{name:"Зборов"},{name:"Кременец"},{name:"Лановцы"},{name:"Монастыриска"},{name:"Подволочиск"},{name:"Подгайцы"},{name:"Почаев"},{name:"Скалат"},{name:"Тернополь"},{name:"Теребовля"},{name:"Чортков"},{name:"Шумск"}]},{name:"Харьковская область",city:[{name:"Балаклея"},{name:"Барвенково"},{name:"Богодухов"},{name:"Валки"},{name:"Великий Бурлук"},{name:"Волчанск"},{name:"Дергачи"},{name:"Змиев"},{name:"Изюм"},{name:"Красноград"},{name:"Купянск"},{name:"Лозовая"},{name:"Люботин"},{name:"Мерефа"},{name:"Первомайский"},{name:"Харьков"},{name:"Чугуев"}]},{name:"Херсонская область",city:[{name:"Берислав"},{name:"Геническ"},{name:"Голая Пристань"},{name:"Каховка"},{name:"Новая Каховка"},{name:"Скадовск"},{name:"Таврийск"},{name:"Херсон"},{name:"Цюрупинск"}]},{name:"Хмельницкая область",city:[{name:"Волочиск"},{name:"Городок"},{name:"Деражня"},{name:"Дунаевцы"},{name:"Изяслав"},{name:"Каменец-Подольский"},{name:"Красилов"},{name:"Нетешин"},{name:"Полонное"},{name:"Славута"},{name:"Староконстантинов"},{name:"Хмельницкий"},{name:"Шепетовка"}]},{name:"Черкасская область",city:[{name:"Ватутино"},{name:"Городище"},{name:"Жашков"},{name:"Звенигородка"},{name:"Золотоноша"},{name:"Каменка"},{name:"Канев"},{name:"Корсунь-Шевченковский"},{name:"Монастырище"},{name:"Смела"},{name:"Тальное"},{name:"Умань"},{name:"Христиновка"},{name:"Черкассы"},{name:"Чигирин"},{name:"Шпола"}]},{name:"Черниговская область",city:[{name:"Бахмач"},{name:"Бобровица"},{name:"Борзна"},{name:"Городня"},{name:"Десна"},{name:"Ичня"},{name:"Корюковка"},{name:"Мена"},{name:"Нежин"},{name:"Новгород-Северский"},{name:"Носовка"},{name:"Прилуки"},{name:"Седнев"},{name:"Семёновка"},{name:"Чернигов"},{name:"Щорс"}]},{name:"Черновицкая область",city:[{name:"Вашковцы"},{name:"Вижница"},{name:"Герца"},{name:"Заставна"},{name:"Кицмань"},{name:"Новоднестровск"},{name:"Новоселица"},{name:"Сокиряны"},{name:"Сторожинец"},{name:"Хотин"},{name:"Черновцы"}]}]}]);