let gameWindow = document.getElementById('game-window')
let bricks = []

// Add divs
for (let i = 1; i <= 18; i++) {
    let div = document.createElement('div')
    div.id = 'brick'
    if (i <= 6) {
        div.style.gridRowStart = 1
        div.style.gridRowEnd = 2
        div.style.gridColumnStart = i
        div.style.gridColumnEnd = i + 1
    } else if (i <= 12) {
        div.style.gridRowStart = 2
        div.style.gridRowEnd = 3
        div.style.gridColumnStart = i - 6
        div.style.gridColumnEnd = i - 5
    } else if (i <= 18) {
        div.style.gridRowStart = 3
        div.style.gridRowEnd = 4
        div.style.gridColumnStart = i - 12
        div.style.gridColumnEnd = i - 11
    }
    gameWindow.appendChild(div)
    bricks.push(div)
}

// Add player and set its position
let player = document.createElement('div')
player.id = 'player'
gameWindow.appendChild(player)
player.style.top = 'calc(' + gameWindow.offsetTop + 'px + 41vw)'
player.style.left = 'calc(' + gameWindow.offsetLeft + 'px + 34vw)'

// Add ball and set its position
let ball = document.createElement('div')
ball.id = 'ball'
gameWindow.appendChild(ball)
ball.style.top = 'calc(' + gameWindow.offsetTop + 'px + 40vw)'
ball.style.left = 'calc(' + gameWindow.offsetLeft + 'px + 41.5vw)'

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

let playerSpeed = 0.8
let playerMoved = 0
let ballSpeed = 0.8
let ballMovedX = 0
let ballMovedY = 0
let ballMovingUp = true
let ballMovingLeft = true
let hitBrick = false
setInterval(() => {
    // Move player
    if (movingLeft) {
        player.style.left = 'calc(' + gameWindow.offsetLeft + 'px + 34vw + ' + playerMoved + 'vw)'
        playerMoved -= playerSpeed
    }
    else if (movingRight) {
        player.style.left = 'calc(' + gameWindow.offsetLeft + 'px + 34vw + ' + playerMoved + 'vw)'
        playerMoved += playerSpeed
    }
    if (playerMoved > 34) {
        playerMoved = 34
    }
    else if (playerMoved < -34) {
        playerMoved = -34
    }
    // Set ball movement variables
    if (gameWindow.offsetTop > ball.offsetTop || gameWindow.offsetHeight + gameWindow.offsetTop - ball.offsetHeight < ball.offsetTop) {
        ballMovingUp = !ballMovingUp
    }
    if (ball.offsetLeft < gameWindow.offsetLeft || gameWindow.offsetWidth + gameWindow.offsetLeft - ball.offsetWidth < ball.offsetLeft) {
        ballMovingLeft = !ballMovingLeft
    }
    for (i of bricks) {
        if (ball.offsetTop < i.offsetTop + i.offsetHeight && ball.offsetLeft > i.offsetLeft && ball.offsetLeft < i.offsetLeft + i.offsetWidth && !hitBrick) {
            ballMovingUp = !ballMovingUp
            i.remove()
            hitBrick = true
        }
        else {
            hitBrick = false
        }
    }
    // Move ball
    if (ballMovingLeft) {
        ballMovedX -= ballSpeed
    } else {
        ballMovedX += ballSpeed
    }
    if (ballMovingUp) {
        ballMovedY -= ballSpeed
    } else {
        ballMovedY += ballSpeed
    }
    ball.style.top = 'calc(' + gameWindow.offsetTop + 'px + 40vw + ' + ballMovedY + 'vw)'
    ball.style.left = 'calc(' + gameWindow.offsetLeft + 'px + 41.5vw + ' + ballMovedX + 'vw)'
}, 16.666);