let gameWindow = document.getElementById('game-window')

// Add divs
for (let i = 1; i <= 18; i++) {
    let div = document.createElement('div')
    div.id = 'brick'
    if (i <= 6) {
        div.style.gridColumn = `${i} / ${i + 1}`
        if (i <= 6) {
            div.style.gridRow = 1
        } else if (i <= 12) {
            div.style.gridRow = 2
        } else if (i <= 18) {
            div.style.gridRow = 3
        }
    }
    gameWindow.appendChild(div)
}

// Add player and set its position
let player = document.createElement('div')
player.id = 'player'
gameWindow.appendChild(player)
player.style.top = 'calc(' + gameWindow.offsetTop + 'px + 41vw)'
player.style.left = 'calc(' + gameWindow.offsetLeft + 'px + 34vw)'

// Get inputs
let movingRight = false
let movingLeft = false
window.addEventListener('keydown', (key) => {
    if (key.code === 'ArrowRight') {
        movingRight = true
        movingLeft = false
    }
    else if (key.code === 'ArrowLeft') {
        movingRight = false
        movingLeft = true
    }
})
window.addEventListener('keyup', (key) => {
    if (key.code === 'ArrowRight') {
        movingRight = false
    }
    else if (key.code === 'ArrowLeft') {
        movingLeft = false
    }
})

// Move player
let speed = 0.8
let moved = 0
setInterval(() => {
    if (movingLeft) {
        player.style.left = 'calc(' + gameWindow.offsetLeft + 'px + 34vw + ' + moved + 'vw)'
        moved -= speed
    }
    else if (movingRight) {
        player.style.left = 'calc(' + gameWindow.offsetLeft + 'px + 34vw + ' + moved + 'vw)'
        moved += speed
    }
    if (moved > 34) {
        moved = 34
    }
    else if (moved < -34) {
        moved = -34
    }
}, 16.666);