import { UI } from './view.js'
// import { compareAsc, format } from '../../node_modules/date-fns'

const API_KEY = '75242b2638b19851dd7e8d440ed85dc2'
let bookmarks = new Set()
let storage = {}
storage.forecast = {}
onLoad()

function onLoad() {
    const NOW_TAB = UI.TABS_BTN[0]
    const DETAILS_TAB = UI.TABS_BTN[1]
    const FORCAST_TAB = UI.TABS_BTN[2]
    getDataFromLocalStorage()
    UI.TABS_BTN.forEach(makeCurrentTabActviated)
    UI.INPUT_CITY.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            getData(e)
                .then(() => {
                    renderNow()
                    renderDetails()
                })

        }
    })
    UI.NOW_BOOKMARK.addEventListener('click', addToBookmarks)
    renderNow()
    renderDetails()
    renderBookmarks()
    renderForecast()
    NOW_TAB.click()
}

function renderNow() {
    if (Object.keys(storage).length === 0) {
        UI.NOW_TEMP.textContent = '°'
    } else {
        UI.NOW_TEMP.textContent = `${storage.temperature}°`
        UI.NOW_CITY.textContent = storage.city
        UI.NOW_IMG.src = storage.img
        if (Array.from(bookmarks).includes(storage.city.toLowerCase())) UI.NOW_BOOKMARK.setAttribute('hidden', 'true')
        else UI.NOW_BOOKMARK.removeAttribute('hidden')
        UI.INPUT_CITY.value = ''
    }



}

function renderDetails() {
    UI.DETAILS.textContent = ''
    UI.DETAILS.insertAdjacentHTML('afterbegin',
        `<p>${storage.city}</p>
        <ul>
            <li>Temperature: ${storage.temperature}</li>
            <li>Feels like: ${storage.feelsLike}</li>
            <li>Weather: ${storage.weather}</li>
            <li>Sunrise: ${convertDate(storage.sunrise)}</li>
            <li>Sunset: ${convertDate(storage.sunset)}</li>
        </ul>`)
}

function renderForecast() {
    UI.FORECAST.textContent = ''
    if (storage.forecast.list !== '') {
        storage.forecast.list.forEach(elem => {
            const img = `https://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`
            UI.FORECAST.insertAdjacentHTML('afterbegin',
                `<div>
                <p>${elem.dt_txt}</p>
                <p>Temperature: ${elem.main.temp}°</p>
                <p>Feels like: ${elem.main.feels_like}°</p>
                <p>${elem.weather[0].description}</p>
                <img src=${img} alt="${elem.weather[0].description}">
            </div>`)
        })
        UI.FORECAST.insertAdjacentHTML('afterbegin', `<p>${storage.forecast.city}</p>`)
    }

}

function renderBookmarks() {
    UI.LOCATIONS.textContent = ''
    bookmarks.forEach((elem) => {
        UI.LOCATIONS.insertAdjacentHTML('afterbegin', `<li><button class="locations__btn">${elem}</button><button class="btn__close">X</button></li>`);
        UI.LOCATIONS_CITY = document.querySelector('.locations__btn')
        UI.LOCATIONS_CITY_DELETE = document.querySelector('.btn__close')
        UI.LOCATIONS_CITY_DELETE.addEventListener('click', deleteBookmark)
        UI.LOCATIONS_CITY.addEventListener('click', (e) => {
            getData(e)
                .then(() => {
                    renderNow()
                    renderDetails()
                    renderForecast()
                })
        })
    })
}

function getData(e) {
    const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather'
    let cityName
    if (e.currentTarget.className === 'search__input') cityName = e.currentTarget.value
    else cityName = e.currentTarget.textContent
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
    const weatherUrl = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`
    return fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            storage.img = `https://openweathermap.org/img/wn/${data.weather.find(elem => elem.icon).icon}@2x.png`
            storage.temperature = Math.round(data.main.temp - 273.15)
            storage.city = data.name
            storage.feelsLike = data.main.feels_like
            storage.weather = data.weather[0].main
            storage.sunrise = data.sys.sunrise
            storage.sunset = data.sys.sunset
        }).then(() => fetch(forecastURL)
            .then(response => response.json())
            .then(data => {
                
                storage.forecast.city = data.city.name
                storage.forecast.list = data.list
                saveToLocalStorage('data', storage)
            }))
        .catch(error => alert(error.message))
}

function addToBookmarks(e) {
    bookmarks.add(UI.NOW_CITY.textContent.toLowerCase())
    // bookmarks.push(UI.NOW_CITY.textContent.toLowerCase())
    UI.NOW_BOOKMARK.setAttribute('hidden', 'true')
    saveToLocalStorage('bookmarks', [...bookmarks])
    renderBookmarks()
}

function makeCurrentTabActviated(elem) {
    elem.addEventListener('click', (e) => {
        UI.TABS_BTN.forEach((el) => {
            el.classList.remove('tab__activated')
        })
        e.currentTarget.classList.add('tab__activated')
    })
}

function deleteBookmark(e) {
    // const bookmarkToDelete = bookmarks.findIndex((el, index) => el == e.currentTarget.previousSibling.textContent.toLowerCase())
    // bookmarks.splice(bookmarkToDelete, 1)
    bookmarks.delete(e.currentTarget.previousSibling.textContent.toLowerCase())
    saveToLocalStorage('bookmarks', [...bookmarks])
    renderBookmarks()
}

function getDataFromLocalStorage() {
    if (localStorage.data) storage = JSON.parse(localStorage.data)
    else {
        storage.img = ''
        storage.temperature = ''
        storage.city = ''
        storage.feelsLike = ''
        storage.weather = ''
        storage.sunrise = ''
        storage.sunset = ''
        
        storage.forecast.city = ''
        storage.forecast.list = ''
    }
    if (localStorage.bookmarks) bookmarks = new Set(JSON.parse(localStorage.bookmarks))
    
}

function saveToLocalStorage(name, storage) {
    localStorage[name] = JSON.stringify(storage)
}

function convertDate(params) {
    const date = new Date(params * 1000)
    const covertedDate = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    return covertedDate
}

convertDate(1642128331)
