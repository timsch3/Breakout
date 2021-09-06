let gameWindow = document.getElementById('game-window')
let player = document.getElementById('player')

// Create and append divs
for (let i = 0; i < 18; i++) {
    let div = document.createElement('div')
    div.id = 'brick'
    gameWindow.prepend(div)
}

// Set player position
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