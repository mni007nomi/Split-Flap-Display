const Arrivals = [
  { code: "PK-302", from: "Karachi", time: "06:15" },
  { code: "EY-243", from: "Abu Dhabi", time: "06:40" },
  { code: "QR-610", from: "Doha", time: "07:05" },
  { code: "EK-622", from: "Dubai", time: "07:25" },
  { code: "PK-764", from: "Jeddah", time: "07:55" },
  { code: "SV-721", from: "Riyadh", time: "08:10" },
  { code: "TK-714", from: "Istanbul", time: "08:35" },
  { code: "GF-766", from: "Bahrain", time: "09:00" },
  { code: "PA-401", from: "Lahore", time: "09:20" },
  { code: "PK-307", from: "Islamabad", time: "09:45" },
  { code: "WY-325", from: "Muscat", time: "10:05" },
  { code: "KU-205", from: "Kuwait", time: "10:30" },
  { code: "EK-624", from: "Dubai", time: "11:00" },
  { code: "QR-632", from: "Doha", time: "11:25" },
  { code: "PK-341", from: "Quetta", time: "11:50" },
  { code: "TK-716", from: "Istanbul", time: "12:10" },
  { code: "EY-241", from: "Abu Dhabi", time: "12:35" },
  { code: "PK-536", from: "Multan", time: "13:00" },
  { code: "SV-723", from: "Jeddah", time: "13:25" },
  { code: "GF-768", from: "Bahrain", time: "13:50" }
]

const Departures = [
  { code: "PK-303", to: "Karachi", time: "06:30" },
  { code: "EY-244", to: "Abu Dhabi", time: "06:55" },
  { code: "QR-611", to: "Doha", time: "07:20" },
  { code: "EK-623", to: "Dubai", time: "07:45" },
  { code: "PK-765", to: "Jeddah", time: "08:10" },
  { code: "SV-722", to: "Riyadh", time: "08:35" },
  { code: "TK-715", to: "Istanbul", time: "09:00" },
  { code: "GF-767", to: "Bahrain", time: "09:25" },
  { code: "PA-402", to: "Lahore", time: "09:50" },
  { code: "PK-308", to: "Islamabad", time: "10:15" },
  { code: "WY-326", to: "Muscat", time: "10:40" },
  { code: "KU-206", to: "Kuwait", time: "11:05" },
  { code: "EK-625", to: "Dubai", time: "11:30" },
  { code: "QR-633", to: "Doha", time: "11:55" },
  { code: "PK-342", to: "Quetta", time: "12:20" },
  { code: "TK-717", to: "Istanbul", time: "12:45" },
  { code: "EY-242", to: "Abu Dhabi", time: "13:10" },
  { code: "PK-537", to: "Multan", time: "13:35" },
  { code: "SV-724", to: "Jeddah", time: "14:00" },
  { code: "GF-769", to: "Bahrain", time: "14:25" }
]

const maxLocationLength = 9
const maxArrayLength = 10
const animationTimer = 250 //milliseconds

let randomArrivals = []
let randomDepartures = []
let arrivalsFlightCodeColor = "orange"
let arrivalsTimeColor = "green"
let departuresFlightCodeColor = "lightblue"
let departuresTimeColor = "tomato"

function getRandomRows(array, count) {
  // Clone the array to avoid mutating the original
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// <div class="flap">
//     <div class="top-flap"><span class="flap-item-top">0</span></div>
//     <div class="bottom-flap"><span class="flap-item-bottom">0</span></div>
// </div>
function addFlap(parent, character, color = "white"){
    const newFlap = document.createElement("div")
    newFlap.classList.add("flap")
    
    const topFlap = document.createElement("div")
    topFlap.classList.add("top-flap")

    const topFlapText = document.createElement("span")
    topFlapText.classList.add("flap-item-top")
    topFlapText.innerText = character
    topFlapText.style.color = color
    topFlap.appendChild(topFlapText)
    
    newFlap.appendChild(topFlap)

    const bottomFlap = document.createElement("div")
    bottomFlap.classList.add("bottom-flap")

    const bottomFlapText = document.createElement("span")
    bottomFlapText.classList.add("flap-item-bottom")
    bottomFlapText.innerText = character
    bottomFlapText.style.color = color
    bottomFlap.appendChild(bottomFlapText)

    newFlap.appendChild(bottomFlap)

    parent.appendChild(newFlap)
}

function restartAnimation(element, newAnimation){
    element.style.animation = "none"
    void element.offsetWidth // force reflow
    element.style.animation = newAnimation
}

function constructScheduleRow(parent, index){
    const row = document.createElement("div")
    row.classList.add("row")

    const arrivalsRow = document.createElement("div")
    arrivalsRow.classList.add("row-half")

    const flightCodeFlapsA = document.createElement("div")
    flightCodeFlapsA.classList.add("row-half-group")

    for(let i = 0; i < randomArrivals[index].code.length; i++)
        addFlap(flightCodeFlapsA, randomArrivals[index].code[i], arrivalsFlightCodeColor)

    const locationFlapsA = document.createElement("div")
    locationFlapsA.classList.add("row-half-group")

    //Padding
    fromLocation = randomArrivals[index].from
    if(fromLocation.length < maxLocationLength){
        for(let i = 0; i < maxLocationLength - fromLocation.length; i++)
            addFlap(locationFlapsA, " ")
    }
    for(let i = 0; i < randomArrivals[index].from.length; i++)
        addFlap(locationFlapsA, randomArrivals[index].from[i])

    const timeFlapsA = document.createElement("div")
    timeFlapsA.classList.add("row-half-group")

    for(let i = 0; i < randomArrivals[index].time.length; i++)
        addFlap(timeFlapsA, randomArrivals[index].time[i], arrivalsTimeColor)

    arrivalsRow.appendChild(flightCodeFlapsA)
    arrivalsRow.appendChild(locationFlapsA)
    arrivalsRow.appendChild(timeFlapsA)

    const departuresRow = document.createElement("div")
    departuresRow.classList.add("row-half")

    const flightCodeFlapsD = document.createElement("div")
    flightCodeFlapsD.classList.add("row-half-group")

    for(let i = 0; i < randomDepartures[index].code.length; i++)
        addFlap(flightCodeFlapsD, randomDepartures[index].code[i], departuresFlightCodeColor)

    const locationFlapsD = document.createElement("div")
    locationFlapsD.classList.add("row-half-group")

    //Padding
    toLocation = randomDepartures[index].to
    if(toLocation.length < maxLocationLength){
        for(let i = 0; i < maxLocationLength - toLocation.length; i++)
            addFlap(locationFlapsD, " ")
    }
    for(let i = 0; i < randomDepartures[index].to.length; i++)
        addFlap(locationFlapsD, randomDepartures[index].to[i])

    const timeFlapsD = document.createElement("div")
    timeFlapsD.classList.add("row-half-group")

    for(let i = 0; i < randomDepartures[index].time.length; i++)
        addFlap(timeFlapsD, randomDepartures[index].time[i], departuresTimeColor)

    departuresRow.appendChild(flightCodeFlapsD)
    departuresRow.appendChild(locationFlapsD)
    departuresRow.appendChild(timeFlapsD)

    row.appendChild(arrivalsRow)
    row.appendChild(departuresRow)

    parent.appendChild(row)
}

function displaySplitFlapBoard(){
    randomArrivals = getRandomRows(Arrivals, maxArrayLength)
    randomDepartures = getRandomRows(Departures, maxArrayLength)
    
    const container = document.querySelector(".flap-container")
    container.innerHTML = ""

    for(let i = 0; i < maxArrayLength; i++)
        constructScheduleRow(container, i)
    
}

setInterval(() => {
  document.querySelectorAll(".top-flap").forEach((item) => {
    const randomDelay = Math.random() * 1000 // random delay up to 1s
    setTimeout(() => {
      restartAnimation(item, "flip-top var(--animation-timing) ease-in")
    }, randomDelay)
  })

  document.querySelectorAll(".bottom-flap").forEach((item) => {
    const randomDelay = Math.random() * 1000 // random delay up to 1s
    setTimeout(() => {
      restartAnimation(item, "flip-bottom var(--animation-timing) ease-out var(--animation-timing)")
    }, randomDelay)
  })
}, animationTimer * 3)

let visible = false

setInterval(() => {
    displaySplitFlapBoard()
}, animationTimer * 6)

setInterval(() => {
    visible = !visible
    document.querySelectorAll(".top-flap").forEach((item) => {
        item.querySelector("span").style.visibility = visible ? "visible" : "hidden"
    })
    document.querySelectorAll(".bottom-flap").forEach((item) => {
        item.querySelector("span").style.visibility = visible ? "visible" : "hidden"
    })
}, animationTimer * 8)

displaySplitFlapBoard()
