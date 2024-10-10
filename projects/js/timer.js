const time = document.querySelector(".time-display")
const btns = document.querySelectorAll(".btn")

let totalTime = 60 * 25;
let min, sec;
let interval;


btns.forEach(btn =>{

  btn.addEventListener("click", (e) => {
    
    if (e.target.textContent === "Start") {
      startTimer();     
     
    } else if (e.target.textContent === "Stop") {
      stopTimer();
  
    } else if (e.target.textContent === "Reset") {
      resetTimer();
   
    }
     
  });
})
const updateUI = () =>{
  time.textContent = min + ":" + sec;
}

// calculate timer
const update = () => {
  min = Math.floor(totalTime / 60);
  sec = totalTime % 60;

  min = min < 10 ? '0' + min : min;
  sec = sec < 10 ? '0' + sec : sec;
  console.log(`${min}:${sec}`)
  totalTime--;
  updateUI();
}


function startTimer() {
  if(!interval) {
    interval = setInterval(update, 1000);
  }
 
}

function stopTimer() {
  clearInterval(interval);
  interval= null;
}


function resetTimer() {
  clearInterval(interval);
  totalTime = 60*25;
  update();
  interval = null;
  
  
}







