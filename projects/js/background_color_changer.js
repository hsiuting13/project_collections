const colorChange = document.querySelector(".change_color");

colorChange.addEventListener("click", () => {
  console.log(randomNumber(257));
  console.log(randomNumber(257));
  console.log(randomNumber(257));
  document.body.style.background = `rgb(${randomNumber(257)},${randomNumber(257)},${randomNumber(257)})`;
});

function randomNumber(num) {
  return Math.floor(Math.random() * num);
}
