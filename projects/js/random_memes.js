const memeBtn = document.querySelector(".generateBtn");
const result = document.querySelector(".result");

memeBtn.addEventListener("click", () => {
  // Fetch a random meme from the API
  fetch("https://meme-api.com/gimme")
    .then((response) => response.json()) // Parse the JSON data
    .then((data) => {
      // If there's already an image in the result div, remove it
      
      if (result.firstChild) {
        result.removeChild(result.firstChild);
      }
      // Display the meme image in your app or webpage
      const imgElement = document.createElement("img");
      imgElement.src = data.url;
      imgElement.style.display = "block";
      result.appendChild(imgElement);
    })
    .catch((error) => console.error("Error fetching meme:", error));
});
