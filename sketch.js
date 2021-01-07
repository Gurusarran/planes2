var sky, skyImage,bolt;
var plane1,planeImage,outImage;
var enemy, enemyImage,explodeImage,enemyGroup;
var score,outSound,shootSound;

var gameState= "PLAY";


function preload () {
  skyImage= loadImage("sky.jpg");
  planeImage= loadImage("plane.png");
  enemyImage= loadImage("stone.png");
  outSound=loadSound("die.mp3");
  shootSound=loadSound("shoot.mp3");
  outImage= loadImage("destroy.png");
  explodeImage= loadImage("explode.png");
  
}



function setup () {
  createCanvas(600,600);
  sky=createSprite(300,300);
  
  
  
  sky.addImage("skyy1",skyImage);
  sky.velocityY= 1.5;
  sky.scale=1.2;
  
  
  enemyGroup= new Group ();
  
  plane1=createSprite(300,500)
  plane1.addImage("ghost1",planeImage);
  plane1.scale= 0.2;

  
  score=0;
}

function draw (){
  
  
  
  if (gameState=== "PLAY"){
  if (sky.y>400){
    sky.y=200;
  }
  
    score = score + Math.round(getFrameRate()/60);
    
  
    if(keyDown("left")){
    plane1.x=plane1.x-3;
  }
  
  if(keyDown("right")){
    plane1.x=plane1.x+3;
  }
    
    if(keyDown("up")){
    plane1.y=plane1.y-3;
  }
    
    if(keyDown("down")){
    plane1.y=plane1.y+3;
  }
    
 if(enemyGroup.isTouching(plane1)){
      enemy.changeImage(explodeImage);
 }
    
    
  
  if(enemyGroup.isTouching(plane1)){
        gameState = "END";
        outSound.play();
      
    }
  
  
  if(enemyGroup.isTouching(plane1)){
    plane1.destroy();
    gameState= "END";
    
  }
          spawnEnemy() ;  
          shoot();
  }
  
  if(gameState==="END"){
    
    
    
    enemyGroup.setVelocityYEach(0);
    sky.velocityY= 0;
    plane1.velocityY=0;
    
    
    
    
  }
  
  
  
  
   
  drawSprites();
  
 if(gameState==="END"){
   textSize(30);
    stroke('red');
    fill('red');
    text("GAME OVER",200,300);
 }
  
  if(gameState==="PLAY"){
    textSize(20);
    stroke('darkblue');
    fill('darkblue');
  text("MILES: "+ score, 450,50)
                       }

}

function spawnEnemy() {
  if (frameCount%200===0){
    
  
  
  enemy=createSprite(200,0);
  enemy.addImage("ene1",enemyImage);
  enemy.velocityY= 1;
    enemy.x= Math.round(random(100,450));
    enemy.lifetime= 650;
    enemy.scale= 0.1;
    enemyGroup.add (enemy);
    enemy.debug= true;
    enemy.setCollider("circle",0,0,0);
       plane1.depth=enemy.depth;
    plane1.depth+=1;
    
    
    
       
  }
  
  
  
  
}

function shoot(){
  if(keyDown("space")) {
    bolt=createSprite(plane1.x,plane1.y,10,20);
    bolt.shapeColor=("red");
    bolt.velocityY=-96;
    shootSound.play();
    bolt.collide(enemyGroup); 
    bolt.lifetime=300;
    enemyGroup.destroyEach();
    
      
    
    
    
    
  }
}