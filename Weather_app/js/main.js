import { UI } from './view.js'
const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f'
const bookmarks = getBookmarks()

const storage = {
    img: '',
    temperature: '',
    city: ''
}

UI.TABS_BTN.forEach(makeCurrentTabActviated)
UI.INPUT_CITY.addEventListener('keydown', (e) => e.key === 'Enter' ? renderNow(e) : '')
UI.NOW_BOOKMARK.addEventListener('click', addToBookmarks)
UI.TABS_BTN[0].click()
renderBokkmarks()

function renderNow(e) {
    getData(e).then((resp) => {
        UI.NOW_TEMP.textContent = `${storage.temperature}°`
        UI.NOW_CITY.textContent = storage.city
        UI.NOW_IMG.src = storage.img

        UI.INPUT_CITY.value = ''

    })

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
            // localStorage.getDataStorage = JSON.stringify(storage)

        })
        .catch(error => alert(error.message))

}

function addToBookmarks(e) {

    bookmarks.push(UI.NOW_CITY.textContent.toLowerCase())
    UI.NOW_BOOKMARK.setAttribute('hidden', 'true')
    localStorage.bookmarks = JSON.stringify(bookmarks)


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
    renderBokkmarks()


}

function renderBokkmarks() {
    UI.LOCATIONS.textContent = ''
    bookmarks.forEach((elem) => {
        UI.LOCATIONS.insertAdjacentHTML('afterbegin', `<li><button class="locations__btn">${elem}</button><button class="btn__close">X</button></li>`);
        UI.LOCATIONS_CITY = document.querySelector('.locations__btn')
        UI.LOCATIONS_CITY_DELETE = document.querySelector('.btn__close')
        UI.LOCATIONS_CITY_DELETE.addEventListener('click', deleteBookmark)
        UI.LOCATIONS_CITY.addEventListener('click', renderNow)
    })
    if (!bookmarks.includes(storage.city.toLowerCase())) UI.NOW_BOOKMARK.removeAttribute('hidden')

}

// storage.saveFavoriteCities(favoriteCities)
// const favoriteCities = storage.getFavoriteCities();
// const currentCity = storage.getCurrentCity();

function saveBookmarks() {
    localStorage.bookmarks = JSON.stringify(bookmarks)
}

function getBookmarks() {
    if (localStorage.bookmarks) return JSON.parse(localStorage.bookmarks)
    else return []
}