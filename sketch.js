Start=0;
Play=1;
End=2;
gameState=Start;
var edge;
var check=0;
var sped=1;



var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")
}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	

	packageSprite=createSprite(width/2, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2
	
	helicopterSprite=createSprite(width/2, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6
	

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0, isStatic:true});
	World.add(world, packageBody);
	

	//Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
 	World.add(world, ground);

 	boxPosition=width/2-100
 	boxY=610;


 	boxleftSprite=createSprite(boxPosition, boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxLeftBody = Bodies.rectangle(boxPosition+20, boxY, 20,100 , {isStatic:true} );
 	World.add(world, boxLeftBody);

 	boxBase=createSprite(boxPosition+100, boxY+40, 200,20);
 	boxBase.shapeColor=color(255,0,0);

 	boxBottomBody = Bodies.rectangle(boxPosition+100, boxY+45-20, 200,20 , {isStatic:true} );
 	World.add(world, boxBottomBody);

 	boxleftSprite=createSprite(boxPosition+200 , boxY, 20,100);
 	boxleftSprite.shapeColor=color(255,0,0);

 	boxRightBody = Bodies.rectangle(boxPosition+200-20 , boxY, 20,100 , {isStatic:true} );
	World.add(world, boxRightBody);

	lazer1= createSprite(400,350,100,10)
	lazer1.shapeColor="red"
	
	
	
	
	

	

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);

  
  
  if(gameState===Start){
	lazer1.velocityX=0
	lazer1.visible=false
	packageSprite.visible=false
	helicopterSprite.visible=false
	fill("red")
	text("Drop the package into the Red box to save your allies. You will get 5 seconds and dont hit the lazer. Press A to start",90,200)
    if(keyDown("A")){
		gameState=Play
		lazer1.velocityX=5
	}
}
  
  if(gameState===Play){
	
	
	
	lazer1.visible=true
	helicopterSprite.visible= true
	packageSprite.visible=true
    
	
	
	
	
	
	
	
	
  
	packageSprite.x= packageBody.position.x 
	packageSprite.y= packageBody.position.y 
	move()
	turn()
	if(lazer1.isTouching(packageSprite)){
		gameState=End
		check+=1
	}
	if(packageSprite.isTouching(boxBase)){
		if(frameCount%180===0){
			gameState=End
			check+=2

		}
	}
	

  }
  if(gameState===End){
	lazer1.visible=false
	packageSprite.visible=false
	helicopterSprite.visible=false
	if(check===1){
		fill("red")
		text("You Failed" ,400,300)
	}
	if(check===2){
		fill("red")
		text("You did it", 400,300)
	}
  }
  

 
  
  drawSprites();
  
  
 
}
function move(){
	if(keyDown(RIGHT_ARROW)){
		helicopterSprite.x+=5
		Matter.Body.translate(packageBody, {x:+5,y:0})

	}
	if(keyDown(LEFT_ARROW)){
		helicopterSprite.x=helicopterSprite.x-5
		Matter.Body.translate(packageBody, {x:-5,y:0})

	}
	if(keyCode===DOWN_ARROW){
		Matter.Body.setStatic(packageBody, false)
	}
}
function turn(){
	if(lazer1.x<100){
		lazer1.velocityX=5;

	}
	if(lazer1.x>600){
		lazer1.velocityX=-5;
	}
}