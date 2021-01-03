var backImage;
var car, carImage;
var gameState;
const PLAY=0;
const END=1;
var obstaclesGroup;
var score=0;
var obstacleImage;
var edges;
var highScore;

function preload(){
  backImage=loadImage("Road.png");
  carImage=loadImage("car.png");
  obstacleImage=loadImage("obstacle.png");
}

function setup(){
  createCanvas(600, 600);
  
  background=createSprite(300,350,20,20);
  background.addImage(backImage);
  background.scale=2.5;

  car=createSprite(300,480,100,50);
  car.addImage(carImage);
  car.scale=0.15;
  
  obstaclesGroup=new Group();
  
  gameState=PLAY;
  
  edges=createEdgeSprites();
  
  highScore=0;
  
}


function windowImage(){
  
  if(gameState===PLAY){
  
  if(frameCount%20==0){
var obstacle=createSprite(Math.round(random(10, 590)), -2, 100, 7);  
    obstacle.velocityY=20;
    obstacle.shapeColor="red";
    obstacle.lifeTime=600;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.5;
    obstacle.setCollider("rectangle",0,5,100, 180);
    
    obstaclesGroup.add(obstacle);
    
  }
}
  

  
}

function draw(){
  
  if(highScore<score){
    highScore=score;
  }
 
  
  if(gameState===PLAY){
    car.visible=true;

    background.velocityY=30;
  
  if(background.y>600){
    background.y=height/2;
  }
  
    
    score=score+Math.round(frameCount%50==0);

  windowImage();
    
    car.bounceOff(edges);
    
     if(keyDown("left_arrow")){
      car.x = car.x - 15;
    }
    
    if(keyDown("right_arrow")){
      car.x = car.x + 15;
    }
    car.depth++;
    

    
    if(obstaclesGroup.isTouching(car)){
     car.visible=false;
      obstaclesGroup.destroyEach();
      gameState=END;
      
    }
     drawSprites();
    
  } else  if(gameState===END){
    
    fill("red");
    text("Game Over", 200,250,textSize(50));
   text("Press R To restart", 230, 300, textSize(20));
      if(keyDown("r")){
        score=0;
        gameState=PLAY;
  }
      
      
    }
  
  fill("white");
  text("Score: "+score, 100, 40, textSize(30));
  text("Highest Score: "+highScore, 310,40,textSize(30));
  
}
