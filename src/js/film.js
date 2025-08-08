const fetcResult = async () => {
    try {
        const response = await fetch('https://shfe-diplom.neto-server.ru/alldata');

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ошибка');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка загрузки данных:', error.message);
        alert(error.message);
        throw error;
    }
}


fetcResult()
    .then(data => {
        const films = data.result.films;
        const halls = data.result.halls;
        const seances = data.result.seances;
        console.log('Список фильмов:', films, halls, seances);
        const card = document.querySelector('.filmList');
        card.innerHTML = films.map(film => {
            const filmHalls = halls.filter(hall => {
                return hall.hall_open !== 0 && 
                       seances.some(s => s.seance_filmid == film.id && s.seance_hallid == hall.id);
            });

            
            const seancesHTML = filmHalls.map(hall => {
                const hallSeances = seances.filter(s => {
                    return s.seance_filmid == film.id &&
                           s.seance_hallid == hall.id;
                }).sort((a, b) => a.seance_time.localeCompare(b.seance_time));
                
                return `
                    <div class="hall">
                        <h3>${hall.hall_name}</h3>
                        <div class="seances">
                            ${hallSeances.map(s => `<a href="#" class="time">${s.seance_time}</a>`).join('')}
                        </div>
                    </div>
                `;
            }).join('');

            return `
                <div class="filmsCard">
                    <img class="filmImg" src="${film.film_poster}" alt="${film.film_name}">
                    <div class="cardInfo">
                        <h3 class="filmTitle">${film.film_name}</h3>
                        <p class="filmInfo">${film.film_description}</p>
                        <span class="duration">${film.film_duration} мин.</span>
                    </div>
                    <div class="halls">
                        ${seancesHTML}
                    </div>
                </div>
            `;
        }).join('');
    })
    