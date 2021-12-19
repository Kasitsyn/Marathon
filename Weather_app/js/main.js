import { UI } from './view.js'
const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f'
const bookmarks = []

UI.TABS_BTN.forEach(makeCurrentTabActviated)
UI.INPUT_CITY.addEventListener('keydown', (e) => e.key === 'Enter' ? getDataAndRenderNow(UI.INPUT_CITY.value) : '')
UI.NOW_BOOKMARK.addEventListener('click', addToBookmarks)
UI.TABS_BTN[0].click()

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
            if (!bookmarks.includes(city.toLowerCase())) UI.NOW_BOOKMARK.removeAttribute('hidden')
        })
        .catch(error => alert(error.message))
        .finally(() => UI.INPUT_CITY.value = '')
}

function addToBookmarks(e) {
    bookmarks.push(UI.NOW_CITY.textContent.toLowerCase())
    UI.LOCATIONS.insertAdjacentHTML('afterbegin', `<li><button class="locations__btn">${UI.NOW_CITY.textContent}</button><button class="btn__close">X</button></li>`);
    UI.NOW_BOOKMARK.setAttribute('hidden', 'true')
    UI.LOCATIONS_CITY = document.querySelector('.locations__btn')
    UI.LOCATIONS_CITY_DELETE = document.querySelector('.btn__close')
    UI.LOCATIONS_CITY_DELETE.addEventListener('click', (e) => {
        // bookmarks.find(e.currentTarget.textContent.toLowerCase())
    })
    UI.LOCATIONS_CITY.addEventListener('click', (e) => {
        getDataAndRenderNow(e.currentTarget.textContent)
    })
}

function makeCurrentTabActviated(elem) {
    elem.addEventListener('click', (e) => {
        UI.TABS_BTN.forEach((el) => {
            el.classList.remove('tab__activated')
        })
        e.currentTarget.classList.add('tab__activated')
    })
}