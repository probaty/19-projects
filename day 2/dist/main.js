"use strict";
const seats = Array.from(document.querySelectorAll(".movie-container .seat"));
const container = document.querySelector(".movie-container");
const seatCountField = document.getElementById("count");
const totalPriceField = document.getElementById("total");
const movieSelect = document.getElementById("movie-select");
//Load all data
loadData();
//Save selected seats to LocalStorage
function saveSeatsIndexIntoLS() {
    const selectedSeats = Array.from(document.querySelectorAll(".movie-container .seat.selected"));
    const selectedSeatsIndex = selectedSeats.map((seat) => {
        return seats.indexOf(seat);
    });
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndex));
}
//Load selected seats from LocalStorage
function loadSeatsFromLS() {
    const selectedSeatsFromLC = localStorage.getItem("selectedSeats");
    let selectedSeats;
    if (selectedSeatsFromLC === null)
        return;
    try {
        selectedSeats = JSON.parse(selectedSeatsFromLC);
    }
    catch (_a) {
        selectedSeats = [];
    }
    if (Array.isArray(selectedSeats)) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }
}
//Show total count and price
function totalCountAndPrice() {
    const selectedSeats = Array.from(document.querySelectorAll(".movie-container .seat.selected"));
    const price = Number(movieSelect.value);
    const seatsCount = selectedSeats.length;
    const totalPrice = seatsCount * price;
    seatCountField.innerText = seatsCount.toString();
    totalPriceField.innerText = totalPrice.toString();
}
//Load all data from LocalStorage
function loadData() {
    loadSeatsFromLS();
    const selectedMovie = Number(localStorage.getItem("selectedMovie"));
    if (selectedMovie !== NaN) {
        movieSelect.selectedIndex = selectedMovie;
        totalCountAndPrice();
    }
}
container.addEventListener("click", (e) => {
    if (e.target instanceof HTMLDivElement) {
        if (e.target.classList.contains("seat") &&
            !e.target.classList.contains("occupied")) {
            e.target.classList.toggle("selected");
            saveSeatsIndexIntoLS();
            totalCountAndPrice();
        }
    }
});
movieSelect.addEventListener("change", () => {
    totalCountAndPrice();
    localStorage.setItem("selectedMovie", movieSelect.selectedIndex.toString());
});
