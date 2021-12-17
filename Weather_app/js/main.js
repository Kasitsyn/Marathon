import { UI } from './view.js'

// UI.TABS_BTN[0].classList.add('tab__activated')
// UI.TABS_CONTENT[0].classList.add('tabs__block:target')


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
        const cityName = UI.INPUT_CITY.value
        const url = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}`
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const img = `http://openweathermap.org/img/wn/${data.weather.find(elem => elem.icon).icon}.png`
                const temp = Math.round(data.main.temp - 273.15)
                const city = data.name
                UI.NOW_TEMP.textContent = `${temp}°`
                UI.NOW_CITY.textContent = city
                UI.NOW_IMG.src = img
                
                
            })
    }
})



console.log(UI.NOW_IMG.src);
