let calendarBox = document.querySelector('.calendar');
let btnNextWeek = document.querySelector('.nextWeek');
let currentStartDate = new Date(); // Текущая начальная дата для отображения

function updateCalendar(daysToAdd = 0) {
    currentStartDate.setDate(currentStartDate.getDate() + daysToAdd);
    calendarBox.innerHTML = ''; // Очищаем календарь перед обновлением
    
    const options = { weekday: 'short' };
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Обнуляем время для точного сравнения
    
    let html = '';

    for (let i = 0; i < 7; i++) { // Показываем 7 дней (неделю)
        const futureDate = new Date(currentStartDate);
        futureDate.setDate(currentStartDate.getDate() + i);

        const dayNumber = futureDate.getDate(); 
        const dayName = futureDate.toLocaleDateString('ru-RU', options);
        const day = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        
        // Сбрасываем время для сравнения дат
        const futureDateForCompare = new Date(futureDate);
        futureDateForCompare.setHours(0, 0, 0, 0);
        
        if (futureDateForCompare.getTime() === today.getTime()) {
            html += `<div class='day today'><span>Сегодня<br>${dayNumber} ${day}</span></div>`;
        } else {
            html += `<div class='day'><span>${dayNumber}<br>${day}</span></div>`;
        }
    }

    calendarBox.insertAdjacentHTML('afterbegin', html);
}

// Инициализация календаря при загрузке
updateCalendar();

// Перелистывание вперед
btnNextWeek.addEventListener('click', (e) => {
    e.preventDefault();
    updateCalendar(7); // Добавляем 7 дней для следующей недели
});


