import { UI } from './view.js'

UI.TABS_BTN.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        UI.TABS_BTN.forEach((el) => {
            el.classList.remove('tab__activated')
        })
        e.currentTarget.classList.add('tab__activated')
    })
})

UI.TABS_BTN[0].click()

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f'

UI.INPUT_CITY.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getDataAndRenderNow(UI.INPUT_CITY.value)
    }
})

UI.NOW_BOOKMARK.addEventListener('click', (e) => {
    UI.LOCATIONS.insertAdjacentHTML('afterbegin', `<li><button class="locations__btn">${UI.NOW_CITY.textContent}</button></li>`);
    UI.NOW_BOOKMARK.setAttribute('hidden', 'true')
    UI.LOCATIONS_CITY = document.querySelector('.locations__btn')
    UI.LOCATIONS_CITY.addEventListener('click', (e) => {
        getDataAndRenderNow()
    })
    console.log(UI.LOCATIONS_CITY)

})


function getDataAndRenderNow(city) {
    const cityName = city
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const img = `http://openweathermap.org/img/wn/${data.weather.find(elem => elem.icon).icon}@2x.png`
            const temp = Math.round(data.main.temp - 273.15)
            const city = data.name
            UI.NOW_TEMP.textContent = `${temp}°`
            UI.NOW_CITY.textContent = city
            UI.NOW_IMG.src = img
            UI.NOW_BOOKMARK.removeAttribute('hidden')

        })
        .catch(error => alert(error.message))
}


console.log(UI.LOCATIONS);
