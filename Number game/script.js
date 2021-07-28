const startButton = document.querySelector(".startGame") // переменная для кнопки старт

document.addEventListener("DOMContentLoaded", function(event) {
    startButton.addEventListener("click", enableField) // активация GuessField при клике на старт после загрузки ДОМа
    function enableField() {
            document.getElementById("guessField").disabled = false
         }
         
})

document.addEventListener("DOMContentLoaded", function(event) {
    startButton.addEventListener("click", enableField) //активация Submit при клике на старт после загрузки ДОМа
    function enableField() {
            document.getElementById("guessSubmit").disabled = false
            guessField.focus()
         }
})
//переменные
let randomNumber = Math.floor(Math.random() * 1000) + 1
//console.log(randomNumber)

let lastResult = document.querySelector(".lastResult")
let lowOrHigh = document.querySelector(".lowOrHigh")
let allAttempts = document.querySelector(".allAttempts")

let guessField = document.querySelector(".guessField")
let guessSubmit = document.querySelector(".guessSubmit")

let guessCount = 1
let resetButton

let userGuesses = []
const url = "http://127.0.0.1:8081/game"
// if (localStorage.getItem("game")) {
//     userGuesses = JSON.parse(localStorage.getItem("game"))
// }
let xhr = new XMLHttpRequest()
xhr.open("GET", url)
xhr.send()
xhr.onload = function() {
    userGuesses = JSON.parse(xhr.response).userGuesses
    for (let i = 0; i < userGuesses.length; i++) {
        let userGuess = addGuess(userGuesses[i])
        allAttempts.appendChild(userGuess)
    }
}


guessSubmit.addEventListener("click", function() {
    let userGuess = addGuess(guessField.value)
    let xhr = new XMLHttpRequest()
    xhr.open("POST", url)
    xhr.send(JSON.stringify({userGuess: guessField.value}))
    xhr.onload = function() {
        allAttempts.appendChild(userGuess)
        userGuesses.push(guessField.value)
        //localStorage.setItem("game", JSON.stringify(userGuesses))
    }
    
})
function addGuess(userGuess) {
    let li = document.createElement("li")
    li.innerText = userGuess
    return li
}



//главная функция
function checkGuess () {
    let SomeGuess = Number(guessField.value)


//случай победы
if (SomeGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right:)"
    lastResult.style.backgroundColor = "#93f0a0"
    lowOrHigh.textContent = ""
    setGameOver()
    removeList()
}
else {
    lastResult.textContent = "Wrong:("
    lastResult.style.backgroundColor = "#f19779"
    if(SomeGuess < randomNumber) {
        lowOrHigh.textContent = "Last guess was too LOW."
    } else if(SomeGuess > randomNumber) {
        lowOrHigh.textContent = "Last guess was too HIGH"
    }
}
    guessCount++
    guessField.value = ""
    guessField.focus()
}
    guessSubmit.addEventListener('click', checkGuess)
// функция окончания игры и добавления кнопки "Начать заново"

    function setGameOver() {
        guessField.disabled = true
        guessSubmit.disabled = true
        resetButton = document.createElement("Button")
        resetButton.textContent = "Start again"
        resetButton.style.backgroundColor = "#95a0ac"
        resetButton.style.width = "140px"
        resetButton.style.height = "45px"
        resetButton.style.fontFamily = "Montserrat"
        resetButton.style.fontSize = "15px"
        resetButton.style.letterSpacing = "3px"
        resetButton.style.fontWeight = "600"
        resetButton.style.borderRadius = "45px"
        document.body.appendChild(resetButton)
        resetButton.addEventListener("click", resetGame)
        resetButton.addEventListener("click", removeList)
    }

// функция перезапуска
function resetGame() {
    guessCount = 1

    let resetData = document.querySelectorAll(".resultsInfo p")
    for (var i = 0; i < resetData.length; i++) {
        resetData[i].textContent = ""
    }
    resetButton.parentNode.removeChild(resetButton)
    guessField.disabled = false
    guessSubmit.disabled = false
    guessField.value = ""
    guessField.focus()
    localStorage.clear() 
    

 lastResult.style.backgroundColor = "white"
    randomNumber = Math.floor(Math.random() * 1000) + 1
    //console.log(randomNumber)

}

function removeList() {
      let removeList = document.querySelectorAll("ul")
for (var i = 0; i < removeList.length; i++) {
    removeList[i].textContent = ""
}
}

