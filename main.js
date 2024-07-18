let api = "https://jsonplaceholder.typicode.com/photos";

async function getData(api) {
  try {
    const response = await fetch(api);

    if (!response.ok) {
      // Handle HTTP errors
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    data.length = 20;
    showListId(Object.values(data));
  } catch (error) {
    if (error.name === "TypeError") {
      // Handle network errors or other fetch-related errors
      console.error("Network error or invalid JSON:", error);
    } else {
      // Handle other types of errors
      console.error("Fetch error:", error);
    }

    throw error;
  }
}

let header = document.querySelector(".container header");
let photosContainer = document.querySelector(".container .content");

function showListId(data) {
  header.innerHTML += `
  <select class="form-control" onchange="getPhoto(this.value)">
    <option>Please Select Id</option>
    ${data.map((photo) => `<option>${photo.id}</option>`)}
  </select>`;
}

async function getPhoto(id) {
  if (id !== "Please Select Id") {
    try {
      const response = await fetch(`${api}?id=${id}`);

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      showPhoto(Object.values(data)[0]);
    } catch (error) {
      if (error.name === "TypeError") {
        // Handle network errors or other fetch-related errors
        console.error("Network error or invalid JSON:", error);
      } else {
        // Handle other types of errors
        console.error("Fetch error:", error);
      }

      throw error;
    }
  } else {
    photosContainer.innerHTML = "";
  }
}

function showPhoto(photo) {
  photosContainer.innerHTML = `
    <h2>Title : ${photo.title}</h2>
    <img src="${photo.url}">
    `;
}

getData(api);
