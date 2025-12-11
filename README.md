# Ответы на вопросы по тестовому заданию
---

## 1. Распространение событий в JavaScript (Event Propagation)

**Event Propagation** — это процесс, по которому события в DOM проходят через разные уровни элементов. Основные фазы:

1. **Capture phase (фаза захвата)** – событие движется от корня документа к целевому элементу
2. **Target phase (фаза цели)** – событие достигает целевого элемента
3. **Bubble phase (фаза всплытия)** – событие распространяется от целевого элемента вверх к корню

**Применение на практике:**
- Можно обрабатывать события на родительском элементе вместо множества дочерних (`event delegation`)
- Возможность остановить распространение события с помощью `event.stopPropagation()` или `event.stopImmediatePropagation()`.

**Пример:**
```javascript
document.querySelector('#parent').addEventListener('click', (event) => {
  console.log('Parent clicked!');
});

document.querySelector('#child').addEventListener('click', (event) => {
  console.log('Child clicked!');
  event.stopPropagation(); // останавливает всплытие
});
```
## 2. Promise в JavaScript
Promise — объект, представляющий результат асинхронной операции, который может быть выполнен или отклонён

Состояния:
pending – ожидание результата
fulfilled – успешно выполнено
rejected – отклонено

Обработка асинхронного кода:
С помощью .then() и .catch()
Или через async/await
Event Loop обеспечивает асинхронное выполнение кода: задачи из call stack и task queue выполняются по очереди, что позволяет не блокировать основной поток

**Пример:**
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

## 3. ООП (Объектно-ориентированное программирование) в JavaScript
Ключевые принципы ООП:
Инкапсуляция – скрытие внутренней логики и данных объекта
Наследование – создание новых классов на основе существующих
Полиморфизм – объекты могут реализовывать один и тот же интерфейс по-разному
Абстракция – выделение только важной информации и интерфейса

**Пример:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} издает звук`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} лает`);
  }
}

const dog = new Dog('Шарик');
dog.speak(); // Шарик лает
```

## 4. Обработка URL браузером

### Основные шаги:
1. Пользователь вводит URL в адресную строку
2. Браузер проверяет кэш и DNS (переводит домен в IP)
3. Устанавливается TCP-соединение и HTTPS (если нужно)
4. Отправляется HTTP-запрос на сервер
5. Сервер возвращает HTML, CSS, JS, изображения и т.д
6. Браузер парсит HTML → строит DOM
7. CSS парсится → строится CSSOM
8. JS исполняется → возможна модификация DOM
9. Формируется **Render Tree**, layout и painting → отображение страницы

### Ускорение загрузки:
- Использование CDN
- Сжатие ресурсов (gzip, brotli)
- Кэширование и Service Workers
- Минификация и бандлинг JS/CSS

### Потенциальные проблемы и безопасность:
- Cross-Origin Resource Sharing (CORS)
- XSS и CSRF
- Mixed content (http/https)
- Медленные DNS или серверы
