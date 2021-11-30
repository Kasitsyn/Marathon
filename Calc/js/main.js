let number1 = 0
let number2 = 0
let operation
let result = 0

const calc = () => {
    number2 = input.value
    if (operation === "div") {
        return result = number1 / number2
    } else if (operation === "mult") {
        return result = number1 * number2
    } else if (operation === "subtr") {
        return result = number1 - number2
    } else if (operation === "sum") {
        return result = +number1 + +number2
    }
}

// change font-size if no space
const checkFontSize = () => {
    if (input.value.length >= 5) input.style.fontSize = "50px"
    if (input.value.length >= 10) input.style.fontSize = "25px"
}

onkeydown = (e) => {
    checkFontSize()
    input.focus()
    if (e.key === 'Escape') input.value = ''
    if (e.key === 'Enter') input.value = ''

}

onclick = (e) => {
    checkFontSize()

    // buttons events
    switch (e.target.innerHTML) {
        case "0":
            input.value = input.value + e.target.innerHTML
            break
        case "1":
            input.value = input.value + e.target.innerHTML
            break
        case "2":
            input.value = input.value + e.target.innerHTML
            break
        case "3":
            input.value = input.value + e.target.innerHTML
            break
        case "4":
            input.value = input.value + e.target.innerHTML
            break
        case "5":
            input.value = input.value + e.target.innerHTML
            break
        case "6":
            input.value = input.value + e.target.innerHTML
            break
        case "7":
            input.value = input.value + e.target.innerHTML
            break
        case "8":
            input.value = input.value + e.target.innerHTML
            break
        case "9":
            input.value = input.value + e.target.innerHTML
            break
        case "C":
            input.style.fontSize = "96px"
            input.value = ""
            break
        case "⌫":
            input.value = input.value.slice(0, input.value.length - 1)
            break
        case "÷":
            number1 = input.value
            operation = "div"
            input.value = ''
            break
        case "×":
            number1 = input.value
            operation = "mult"
            input.value = ''
            break
        case "−":
            number1 = input.value
            operation = "subtr"
            input.value = ''
            break
        case "+":
            number1 = input.value
            operation = "sum"
            input.value = ''
            break
        case "=":
            input.value = calc()
            checkFontSize()
            break
    }

}







