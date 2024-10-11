const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
const second = document.querySelector(".second");

function clock(){
  const date = new Date();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();
  let hours = date.getHours();
//   console.log(date);
//   console.log(seconds);
//   console.log(minutes);
//   console.log(hours);
  seconds = (360 / 100) * ((seconds / 60) * 100);
  minutes = (360 / 100) * ((minutes / 60) * 100);
  hours = (360 / 100) * ((hours / 12) * 100);
  let secondsAngle = seconds;
  let minutesAngle = minutes;
  let hoursAngle = hours;

  hour.style.transform = "rotate(" + hoursAngle + "deg)";
  minute.style.transform = "rotate(" + minutesAngle + "deg)";
  second.style.transform = "rotate(" + secondsAngle + "deg)";
}
setInterval(clock, 1000)
