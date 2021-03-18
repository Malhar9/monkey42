var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana ,bananaImage, obstacle, obstacleImage
var END =0;
var PLAY =1;
var gamestate = PLAY;
var foodGroup, obstacleGroup
var score=0;
var bgimg
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
 bgimg=loadImage("jungle.jpg")
 monkeyimg=loadImage("Monkey_01.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  foodGroup=new Group()
  obstacleGroup=new Group()
}

function draw() { 
  background(0);

  if(gamestate===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

  }
  spawnFood();
  spawnObstacles();
  if (foodGroup.isTouching(player)){
    foodGroup.destroyEach();
   score=score+2
    if(score%2==0&&score>0){
      player.scale=0.2
    }
  }
  if(obstacleGroup.isTouching(player)){
    gamestate=END
    }
     
   else if(gamestate===END){
          bgimg.velocityX = 0;
          player.velocityY = 0;
          player.addImage(monkeyimg)
          obstacleGroup.destroyEach();
          foodGroup.destroyEach();
          obstacleGroup.setLifetimeEach(-1);
          foodGroup.setLifetimeEach(-1);
       textSize(30);
       fill(255)
       text("Game over",300,220)
   
   }
  drawSprites();

function spawnFood() {
  
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    banana.addImage(bananaImage);
    banana.scale=0.05;
    foodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}
}
