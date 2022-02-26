import { UI } from './view.js'
import { parse, intervalToDuration, formatDuration } from "../node_modules/date-fns"

UI.SUBMIT.onclick = (event) => {
    event.preventDefault()
    const dateNow = new Date().getTime()
    const dateFuture = parse(UI.INPUT.value, 'yyyy-MM-dd', new Date()).getTime()
    const interval = intervalToDuration({ start: dateNow, end: dateFuture })
    const formatedInterval = formatDuration({
        years: interval.years,
        days: interval.days,
        minutes: interval.minutes
    })
    UI.OUTPUT.textContent = `After ${formatedInterval}`
}