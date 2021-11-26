//=============================== SetInterval, SetTimeOut

const printNumbersSI = (from, to) => {
    let count = from
    let timerId = setInterval(() => {
        if (count <= to) {
            console.log(count)
            count++
        } else clearInterval(timerId)

    }, 1000)
}

const printNumbersST = (from, to) => {
    let count = from
    let timerId = setTimeout(function tick() {
        if (count <= to) {
            console.log(count)
            count++
            timerId = setTimeout(tick, 1000)
        } else clearTimeout(timerId)

    }, 1000)
}

//=============================== Closure

const sum = (a) => {
    return function (b) {
        return a + b
    }
}

//-------------
let arr = [1, 2, 3, 4, 5, 6, 7]

const inBetween = (a, b) => {
    return function (item) {
        if (item >= a && item <= b) return true
    }
}

const inArray = (array) => {
    return function (item) {
        return array.includes(item)
    }
}

let res = arr.filter(inArray([1, 4, 22]))

//----------

let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];


const byField = (fieldName) => {
    return function(a, b){
        return a.fieldName > b.fieldName ? 1 : -1
    }
}

users.sort(byField('surname'));

//============== EventListeners






