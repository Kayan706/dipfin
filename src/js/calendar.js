let calendarBox = document.querySelector('.calendar');
let btnNextWeek =document.querySelector('.nextWeek')
let dayaf = document.querySelector('.day')

const now = new Date();
const options = { weekday: 'short' };

let html = '';
let a= 6



for (let i = 0; i < a; i++) {
    const futureDate = new Date(now);
    futureDate.setDate(now.getDate() + i);

    const dayNumber = futureDate.getDate(); 
    const dayName = futureDate.toLocaleDateString('ru-RU', options);
    const day = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    if(dayNumber == now.getDate()){
        html+=`<div class='day'><span> Сегодня <br>${dayNumber} ${day}</span> </div>`
    }
    
    html += `<div class='day'><span>${dayNumber}<br>${day}</span> </div>`;
}

let pre = calendarBox.insertAdjacentHTML('afterbegin', html);


btnNextWeek.addEventListener('click', (e)=>{
        let dayoff = document.querySelector('.day')
        e.preventDefault()
        a + 1

        dayoff.remove()
        
    }) //после открисовки новых дней надо удалить предыдущие