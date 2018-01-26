var img = new Image();
img.src = "./coloredBuilding.jpg";

var backgroundImage = {
  img: img,
  x: 0,

  draw: function() {
    ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
  }
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var g = new Game(ctx);

window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    setInterval(function() {
      var random = Math.random();
      if (random < 0.7) g.addNewBaby();
      else g.addNewBottle();
    }, 1000);

    startGame();
  };

  function startGame() {
    updateCanvas();
  }
};
//to update the frame of the canvas

var player = {
  x: canvas.width / 2,
  y: canvas.height - 135,
  width: 110,
  height: 160,
  speedX: 10,
  score: 0,
  playerSrc: {
    dad: "DAD.png",
    mom: "mom.PNG"
  },

  move: function(direction) {
    if (direction === "right") {
      this.x += this.speedX;
    } else if (direction === "left") {
      this.x -= this.speedX;
    }

    this.x = Math.min(canvas.width - this.width, Math.max(0, this.x));
    //this.y = Math.min(canvas.height - this.height, Math.max(0, this.y));
  },

  /*
  draw: function() {
    //ctx.drawImage(flappyImg, this.x, this.y, 50 * imgScale, 50);
    ctx.fillStyle = "maroon";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  */

  draw: function(parent = "dad") {
    var playerImg = new Image();
    playerImg.src = this.playerSrc[parent];
    ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
  },

  isColliding: function(baby) {
    return (
      this.x < baby.x + baby.w &&
      this.x + this.width > baby.x &&
      this.y < baby.y + baby.h &&
      this.height + this.y > baby.y
    );
  }
};

var keysPressed = {
  right: false,
  left: false
};

var left = 37;
var right = 39;

document.onkeydown = function(event) {
  event.preventDefault();
  switch (event.keyCode) {
    case left:
      keysPressed.left = true;
      break;
    case right:
      keysPressed.right = true;
      break;
  }
};

document.onkeyup = function(event) {
  switch (event.keyCode) {
    case left:
      keysPressed.left = false;
      break;
    case right:
      keysPressed.right = false;
      break;
  }
};

canvas.onclick = function(e) {
  console.log("x", e.offsetX, "y", e.offsetY);
};
var baby = {
  babys: [],
  minSpeed: 2,
  maxSpeed: 4,
  gravity: 0.9,
  babyId: 0,
  width: 40,
  height: 40,
  image: babyImage,
  y: 150,

  createBaby: function(position) {
    this.babys.push({
      id: this.babyId++,
      x: position.x,
      y: position.y,
      w: this.width,
      h: this.height,
      speed: Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed
    });
  },
  moveBaby: function(baby) {
    baby.y += baby.speed;
    if (baby.y >= canvas.height - player.height / 2) this.check(baby);
  },
  check: function(baby) {
    //miss or caught
    var caught =
      player.x <= baby.x && baby.x <= player.x + player.width - baby.w;
    if (!caught) {
      player.crashedBaby++;
      if (player.crashedBaby > 6) {
        player.isGameOver = true;
        return "Game over";
      }
    } else {
      player.score++;
    }

    for (let i = 0; i < this.babys.length; i++) {
      if (this.babys[i].id === baby.id) {
        this.babys.splice(i, 1);
        break;
      }
    }
  },
  move: function() {
    this.babys.forEach(this.moveBaby.bind(this));
  },
  drawRectangle: function(baby) {
    ctx.drawImage(babyImage, baby.x, baby.y, baby.w, baby.h);

    // ctx.fillRect(baby.x, baby.y, baby.w, baby.h);
  },
  draw: function() {
    ctx.fillStyle = "chartreuse";
    this.babys.forEach(this.drawRectangle);
  }
};

var babyImage = new Image();
babyImage.src = "./bebeVector.png";

function updateCanvas() {
  if (player.isGameOver) return;
  Object.keys(keysPressed).forEach(function(direction) {
    if (keysPressed[direction]) {
      player.move(direction);
    }
  });
  baby.move();
  bottle.move();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  backgroundImage.draw();
  ctx.font = "20px serif";
  ctx.fillStyle = "black";
  ctx.fillText("love amount : " + player.score, 367, 74);
  player.draw("dad");
  baby.draw();
  bottle.draw();
  requestAnimationFrame(updateCanvas);
}

var bottleImage = new Image();
bottleImage.src = "./chartreuse.PNG";

var bottle = {
  bottles: [],
  minSpeed: 2,
  maxSpeed: 4,
  gravity: 0.9,
  bottleId: 0,
  width: 50,
  height: 60,
  image: bottleImage,
  y: 150,

  createBottle: function(position) {
    this.bottles.push({
      id: this.bottleId++,
      x: position.x,
      y: position.y,
      w: this.width,
      h: this.height,
      speed: Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed
    });
  },
  moveBottle: function(bottle) {
    bottle.y += bottle.speed;
    if (bottle.y >= canvas.height - player.height / 2) this.check(bottle);
  },
  check: function(bottle) {
    //miss or caught
    var caught =
      player.x <= bottle.x && bottle.x <= player.x + player.width - bottle;
    if (!caught) {
      player.crashedBottle++;
      if (player.crashedBottle > 10) {
        player.isGameOver = true;
        return "Game over";
      }
    } else {
      player.score++;
    }

    for (let i = 0; i < this.bottles.length; i++) {
      if (this.bottles[i].id === bottle.id) {
        this.bottles.splice(i, 1);
        break;
      }
    }
  },
  move: function() {
    this.bottles.forEach(this.moveBottle.bind(this));
  },
  drawRectangle: function(bottle) {
    ctx.drawImage(bottleImage, bottle.x, bottle.y, bottle.w, bottle.h);

    //
  },
  draw: function() {
    ctx.fillStyle = "chartreuse";
    this.bottles.forEach(this.drawRectangle);
  }
};
