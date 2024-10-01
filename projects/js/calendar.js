const time = document.querySelector(".time");
const dateNow = document.querySelector(".dateNow");
const weekdays = document.querySelector(".weekdays")


function formatTime() {
  const date = new Date();
  const newSpan = document.createElement("span");
  newSpan.classList.add("ampm");
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  const textNodeTime = document.createTextNode(ampm);
  time.textContent = `${hours}:${minutes}:${seconds} `;
  newSpan.appendChild(textNodeTime);
  time.appendChild(newSpan);
}
formatCurrentTime();


function formatDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const textNodeDate = document.createTextNode(
    date.toLocaleString("en-US", options)
  );
  dateNow.appendChild(textNodeDate);
}

function formatCurrentTime() {
  setInterval(formatTime);
  formatDate();
}

let getDaysArray = function(year, month) {
    let monthIndex = month - 1;
    let days = ['Sun', 'Mon', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let date = new Date(year, monthIndex, 1);
  console.log(monthIndex)
  console.log(date.getMonth());
    const result = [];
    while (date.getMonth() === monthIndex) {
      result.push(date.getDate() + "-" + days[date.getDay()]);
      date.setDate(date.getDate() + 1);
    }
    return result;
}
console.log(getDaysArray(2024, 10))

