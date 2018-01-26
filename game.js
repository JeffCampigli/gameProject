function Game(ctx) {
  this.ctx = ctx;
  this.windows = [
    { x: 131, y: 213 },
    { x: 269, y: 175 },
    { x: 379, y: 175 },
    { x: 481, y: 143 },
    { x: 137, y: 315 },
    { x: 282, y: 303 },
    { x: 386, y: 284 },
    { x: 486, y: 289 },
    { x: 139, y: 427 },
    { x: 275, y: 425 },
    { x: 474, y: 420 }
  ];
  this.babies = [];
}
Game.prototype.drawWindows = function() {
  this.ctx.fillRect(this.windows[0].x, this.windows[0].y, 10, 10);
  this.ctx.fillRect(this.windows[1].x, this.windows[1].y, 10, 10);
  this.ctx.fillRect(this.windows[2].x, this.windows[2].y, 10, 10);
  this.ctx.fillRect(this.windows[3].x, this.windows[3].y, 10, 10);
  this.ctx.fillRect(this.windows[4].x, this.windows[4].y, 10, 10);
  this.ctx.fillRect(this.windows[5].x, this.windows[5].y, 10, 10);
  this.ctx.fillRect(this.windows[6].x, this.windows[6].y, 10, 10);
  this.ctx.fillRect(this.windows[7].x, this.windows[7].y, 10, 10);
  this.ctx.fillRect(this.windows[8].x, this.windows[8].y, 10, 10);
  this.ctx.fillRect(this.windows[9].x, this.windows[9].y, 10, 10);
  this.ctx.fillRect(this.windows[10].x, this.windows[10].y, 10, 10);
};

Game.prototype.addNewBaby = function() {
  baby.createBaby(this.windows[Math.floor(Math.random() * 10 + 1)]);
};

Game.prototype.addNewBottle = function() {
  bottle.createBottle(this.windows[Math.floor(Math.random() * 10 + 1)]);
};

//

function Person(name, birthYear, nationality) {
  this.name = name;
  this.birthYear = birthYear;
  this.nationality = nationality;
}
Person.prototype.getAge = function() {
  return 2018 - this.birthYear;
};
Person.prototype.becomeGerman = function() {
  this.nationality = "de";
};

var maxence = new Person("Maxence", 1992, "fr");
//
maxence.name = "Maxence";
maxence.birthYear = 1992;
maxence.nationality = "fr";
//
var jeff = new Person("Jean-François", 1978, "fr");

// console.log(maxence.getAge()); // 26
