let direction = {x:0, y:0}
const foodsound = new Audio('audio/food.mp3');
const gameoversound = new Audio('audio/laugh.mp3');
const movesound = new Audio('audio/move.mp3');
const music = new Audio('audio/music.mp3');

let speed = 10;
let lastpaintTime = 0;
let snakearr = [
    {x:13, y:15}
];
let hiscoreval=0;
let food  ={x:6, y:7};
inputdir = {x:0, y:0};
let score = 0;




//Gaming function start here

function main(Ctime){
    window.requestAnimationFrame(main);
    if((Ctime-lastpaintTime)/1000 < 1/speed){
        return;
    }
    lastpaintTime = Ctime;
    gameEngine();
}

function iscollide(snake){
  //if you bump into yourself
  for(let i = 1; i < snakearr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y ===snake[0].y ){
     
         return true;
    }   
  }
  // if you bump into wall
  if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <=0){
   
    return true;
  }

}

function gameEngine(){
    //part 1 : Updating the snake array and food
    
    music.play();
   
    //if you have eaten the food , increment the score and regenerate the food
    if(snakearr[0].y === food.y && snakearr[0].x ===food.x){
      foodsound.play();
      score += 1;
      if(score > hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hibox.innerHTML = "Hi score:"+ hiscoreval
    }
      scorebox.innerHTML = "Score: " + score;
      snakearr.unshift({x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y});
      let a = 2;
      let b = 16;
      food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
  }

  if(iscollide(snakearr)){
    
      gameoversound.play();
      music.pause();
      inputdir = {x:0, y:0};
      alert("press any key to play again");
       snakearr = [{x:13, y:15}];
       score =0;
       scorebox.innerHTML = "score:"+ score
       music.play();
       window.location.reload()
  }



    //Moving the snake
    for(let  i= snakearr.length -2; i>=0; i--){
      snakearr[i+1]={...snakearr[i]};
    }
    snakearr[0].x += inputdir.x;
    snakearr[0].y += inputdir.y;


    


    //part 2 display the snake and food

    //Display the snake
    let board = document.getElementById("board");
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
       let snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index===0){
            snakeElement.classList.add("head")
        }
        else{
        snakeElement.classList.add("snake")
        }
        board.appendChild(snakeElement)

        //Display the FOOD
        let foodElement = document.createElement('div')
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add("food")
        board.appendChild(foodElement)
    

        
    })
}

function input (e){
  console.log(e.key)
   inputdir = {x:0, y:0}
   movesound.play();
   switch(e.key){
    case "ArrowUp" :
        inputdir.x =  0;
        inputdir.y =  -1;
      break;

      case "ArrowDown" :
        inputdir.x =  0;
        inputdir.y =  1;  
      break;

      case "ArrowLeft" :
        inputdir.x =  -1;
        inputdir.y =  0;
      break;

      case "ArrowRight" :
        inputdir.x =  1;
        inputdir.y =  0;
      break;

      default:
        break;
   }
}



//main logic start  here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hibox.innerHTML = "Hi score:"+hiscore
}


window.requestAnimationFrame(main);
window.addEventListener("keydown", input)
