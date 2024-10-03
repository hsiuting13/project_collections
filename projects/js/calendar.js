const time = document.querySelector(".time");
const dateNow = document.querySelector(".dateNow");
const days = document.querySelector(".days");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const upArrow = document.querySelector(".up-arrow");
const downArrow = document.querySelector(".down-arrow");

// current day and month
const today = new Date();
// 0 for January, 1 for February
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

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

const generateCalendarData = function (year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarData = [];

  // Add days from the previous month to fill the first week
  let dayOfWeek = firstDayOfMonth.getDay();

  for (let i = dayOfWeek; i > 0; i--) {
    const prevMonthDate = new Date(year, month, 1 - i);
    calendarData.push({ date: prevMonthDate, isCurrentMonth: false });
  }

  // Add days for the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    calendarData.push({ date: date, isCurrentMonth: true });
  }

  // Add days from the next month to fill the last week
  dayOfWeek = lastDayOfMonth.getDay();
  for (let i = 1; i <= 6 - dayOfWeek; i++) {
    const nextMonthDate = new Date(year, month + 1, i);
    calendarData.push({ date: nextMonthDate, isCurrentMonth: false });
  }

  return calendarData;
};

function updateCalendar(calendarData) {
  days.innerHTML = "";
  year.innerHTML = "";
  month.innerHTML = "";
 
  for (let i = 0; i < calendarData.length; i++) {
    const newLi = document.createElement("li");

    const daysTextNode = document.createTextNode(
      calendarData[i].date.toLocaleString("default", { day: "numeric" })
    );
    const yearTextNode = document.createTextNode(
      calendarData[i].date.toLocaleString("default", { year: "numeric" })
    );
     const monthTextNode = document.createTextNode(
       calendarData[i].date.toLocaleString("default", { month: "long" })
     );
   

    if (calendarData[i].isCurrentMonth) {
      newLi.appendChild(daysTextNode);
     month.textContent = monthTextNode.data;
     year.textContent = yearTextNode.data;
     
    } else {
      newLi.classList.add("notCurrentMonth");
      newLi.appendChild(daysTextNode);
      
    }

    days.appendChild(newLi);
  
  }

}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  const calendarData = generateCalendarData(currentYear, currentMonth);
  updateCalendar(calendarData);
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  const calendarData = generateCalendarData(currentYear, currentMonth);
  updateCalendar(calendarData);
}

const calendarData = generateCalendarData(currentYear, currentMonth);
updateCalendar(calendarData);

upArrow.addEventListener("click", prevMonth);
downArrow.addEventListener("click", nextMonth);
