const seats: HTMLDivElement[] = Array.from(
  document.querySelectorAll(".movie-container .seat")
);
const container: HTMLDivElement = document.querySelector(
  ".movie-container"
) as HTMLDivElement;
const seatCountField: HTMLDivElement = document.getElementById(
  "count"
) as HTMLDivElement;
const totalPriceField: HTMLDivElement = document.getElementById(
  "total"
) as HTMLDivElement;
const movieSelect: HTMLSelectElement = document.getElementById(
  "movie-select"
) as HTMLSelectElement;

//Load all data
loadData();

//Save selected seats to LocalStorage
function saveSeatsIndexIntoLS(): void {
  const selectedSeats: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".movie-container .seat.selected")
  );
  const selectedSeatsIndex: number[] = selectedSeats.map(
    (seat: HTMLDivElement) => {
      return seats.indexOf(seat);
    }
  );
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndex));
}

//Load selected seats from LocalStorage
function loadSeatsFromLS(): void {
  const selectedSeatsFromLC: string | null =
    localStorage.getItem("selectedSeats");
  let selectedSeats: number[];

  if (selectedSeatsFromLC === null) return;

  try {
    selectedSeats = JSON.parse(selectedSeatsFromLC);
  } catch {
    selectedSeats = [];
  }

  if (Array.isArray(selectedSeats)) {
    seats.forEach((seat: HTMLDivElement, index: number) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

//Show total count and price
function totalCountAndPrice(): void {
  const selectedSeats: HTMLDivElement[] = Array.from(
    document.querySelectorAll(".movie-container .seat.selected")
  );
  const price: number = Number(movieSelect.value);

  const seatsCount: number = selectedSeats.length;
  const totalPrice: number = seatsCount * price;

  seatCountField.innerText = seatsCount.toString();
  totalPriceField.innerText = totalPrice.toString();
}

//Load all data from LocalStorage
function loadData() {
  loadSeatsFromLS();
  const selectedMovie: number = Number(localStorage.getItem("selectedMovie"));

  if (selectedMovie !== NaN) {
    movieSelect.selectedIndex = selectedMovie;
    totalCountAndPrice();
  }
}

container.addEventListener("click", (e) => {
  if (e.target instanceof HTMLDivElement) {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
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
