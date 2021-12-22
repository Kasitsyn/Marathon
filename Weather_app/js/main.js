import { UI } from './view.js'
const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f'
const bookmarks = getBookmarks()
const storage = getDataFromLocalStorage()
console.log(storage);
onLoad()


function onLoad() {
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
    // UI.TABS_BTN[0].click()
    renderNow()
    renderDetails()
    renderBokkmarks()
}

function renderNow() {
    UI.NOW_TEMP.textContent = `${storage.temperature}°`
    UI.NOW_CITY.textContent = storage.city
    UI.NOW_IMG.src = storage.img
    if (bookmarks.includes(storage.city.toLowerCase())) UI.NOW_BOOKMARK.setAttribute('hidden', 'true')
    else UI.NOW_BOOKMARK.removeAttribute('hidden')
    UI.INPUT_CITY.value = ''

}

function getData(e) {
    let cityName
    if (e.currentTarget.className === 'search__input') cityName = e.currentTarget.value
    else cityName = e.currentTarget.textContent
    const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            storage.img = `http://openweathermap.org/img/wn/${data.weather.find(elem => elem.icon).icon}@2x.png`
            storage.temperature = Math.round(data.main.temp - 273.15)
            storage.city = data.name
            storage.feelsLike = data.main.feels_like
            storage.weather = data.weather[0].main
            storage.sunrise = data.sys.sunrise
            storage.sunset = data.sys.sunset
            saveDataToLocalStorage()
        })
        .catch(error => alert(error.message))
}

function addToBookmarks(e) {
    bookmarks.push(UI.NOW_CITY.textContent.toLowerCase())
    UI.NOW_BOOKMARK.setAttribute('hidden', 'true')
    saveBookmarks()
    renderBokkmarks()
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
    const bookmarkToDelete = bookmarks.findIndex((el, index) => el == e.currentTarget.previousSibling.textContent.toLowerCase())
    bookmarks.splice(bookmarkToDelete, 1)
    saveBookmarks()
    renderBokkmarks()
}

function renderBokkmarks() {
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
                })
        })
    })
}

function saveBookmarks() {
    localStorage.bookmarks = JSON.stringify(bookmarks)
}

function getBookmarks() {
    if (localStorage.bookmarks) return JSON.parse(localStorage.bookmarks)
    else return []
}

function renderDetails() {
    UI.DETAILS.textContent = ''
    UI.DETAILS.insertAdjacentHTML('afterbegin',
        `<p>${storage.city}</p>
    <ul>
        <li>Temperature: ${storage.temperature}</li>
        <li>Feels like: ${storage.feelsLike}</li>
        <li>Weather: ${storage.weather}</li>
        <li>Sunrise: ${storage.sunrise}</li>
        <li>Sunset: ${storage.sunset}</li>
    </ul>`);
}

function saveDataToLocalStorage() {
    localStorage.data = JSON.stringify(storage)
}

function getDataFromLocalStorage() {
    if (localStorage.data) return JSON.parse(localStorage.data)
    else return {}
}