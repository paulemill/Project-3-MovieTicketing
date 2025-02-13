'use strict';

// Declare totalPrice in the global scope
let totalPrice = 0;

const movies = {
  movie1: {
    Director: 'Jane Doe',
    Producer: 'Adil Waters',
    Cast: 'Dennis Ortega, Arjan Ayala, Julia Hatfield, Skyla Faulkner',
    Duration: '1 hr 53 mins',
    Synopsis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu nibh auctor, bibendum orci id, imperdiet tellus. Nunc blandit sollicitudin felis, sed efficitur orci commodo ac. Sed consequat eget mi.',
  },
  movie2: {
    Director: 'Bryn Kerr',
    Producer: 'Nevaeh Chambers',
    Cast: 'Preston Davis, Bilal Mays, Genevieve Deleon',
    Duration: '1 hr 45 mins',
    Synopsis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu nibh auctor, bibendum orci id, imperdiet tellus. Nunc blandit sollicitudin felis, sed efficitur orci commodo ac. Sed consequat eget mi.',
  },
  movie3: {
    Director: 'Yasmin Green',
    Producer: 'Antonia Dominguez',
    Cast: 'Aaminah Morton, Lula Welch, Molly Yans',
    Duration: '2 hrs 01 mins',
    Synopsis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu nibh auctor, bibendum orci id, imperdiet tellus. Nunc blandit sollicitudin felis, sed efficitur orci commodo ac. Sed consequat eget mi.',
  },
  movie4: {
    Director: 'Jane Doe',
    Producer: 'Adil Waters',
    Cast: 'Dennis Ortega, Arjan Ayala, Julia Hatfield, Skyla Faulkner',
    Duration: '1 hr 53 mins',
    Synopsis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu nibh auctor, bibendum orci id, imperdiet tellus. Nunc blandit sollicitudin felis, sed efficitur orci commodo ac. Sed consequat eget mi.',
  },
  movie5: {
    Director: 'Rafferty Gray',
    Producer: 'Skyla Lloyd',
    Cast: 'Keaton Brown, Kobe Malone, Riya Nixon',
    Duration: '1 hr 50 mins',
    Synopsis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu nibh auctor, bibendum orci id, imperdiet tellus. Nunc blandit sollicitudin felis, sed efficitur orci commodo ac. Sed consequat eget mi.',
  },
  movie6: {
    Director: 'Niall Small',
    Producer: 'Ava Smith',
    Cast: 'Liam Johnson, Emma Brown, Olivia Davis',
    Duration: '1 hr 40 mins',
    Synopsis:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eu nibh auctor, bibendum orci id, imperdiet tellus. Nunc blandit sollicitudin felis, sed efficitur orci commodo ac. Sed consequat eget mi.',
  },
};

/////////////////////////////////////////////////////////////////////////
/////////////////// Select Location Movie Date and Time /////////////////
/////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
  const selectLocation = document.getElementById('select-location');
  const selectMovie = document.getElementById('select-movie');
  const selectDate = document.getElementById('select-date');
  const selectTime = document.getElementById('select-time');
  const summarySection = document.querySelector('.container_summary');
  const seats = document.querySelectorAll('.seat');
  const numSelectedSeats = document.querySelector('.num_selected_seats');
  const totalAmount = document.querySelector('.total_amount');

  let location, movie, date, time;
  let selectedSeats = 0;
  const seatPrice = 450; // Set seat price

  // Initially disable the other input except the location
  selectMovie.disabled = true;
  selectDate.disabled = true;
  selectTime.disabled = true;

  // Function to update the summary section
  function updateSummary() {
    summarySection.innerHTML = `
      <h2>Movie Summary</h2>
      <div class="summary_content">
        <div class="summary_persons">
          <p><strong>Director:</strong> ${movie.Director}</p>
          <p><strong>Producer:</strong> ${movie.Producer}</p>
          <p><strong>Cast:</strong> ${movie.Cast}</p>
          <p><strong>Duration:</strong> ${movie.Duration}</p>
        </div>
        <div class="summary_description">
          <p><strong>Synopsis:</strong> <br><br>${movie.Synopsis}</p>
        </div>
      </div>
    `;
  }

  // Function to update the seatselection
  function updateSeatSelection() {
    numSelectedSeats.innerHTML = `<strong>Seats Selected:</strong> ${selectedSeats}`;
    totalAmount.innerHTML = `<strong>Total Price:</strong> Php ${totalPrice}`;
  }

  // Function to update booked seats
  function updateBookedSeats() {
    seats.forEach((seat) => {
      seat.classList.remove('booked', 'selected');
      if (Math.random() < 0.3) {
        // 30% chance a seat is booked
        seat.classList.add('booked');
      }
    });
    selectedSeats = 0;
    totalPrice = 0;
    updateSeatSelection();
  }

  // Function to reset selected seats
  function resetSelectedSeats() {
    seats.forEach((seat) => {
      seat.classList.remove('selected');
    });
    selectedSeats = 0;
    totalPrice = 0;
    updateSeatSelection();
  }

  // Location logic
  selectLocation.addEventListener('change', () => {
    location = selectLocation.value;
    selectMovie.disabled = false;
    selectMovie.value = '';
    selectDate.disabled = true;
    selectDate.value = '';
    selectTime.disabled = true;
    selectTime.value = '';
    summarySection.style.display = 'none';
    document.querySelector('.container_movie_cinema').style.display = 'none';
    document.querySelector('.seat-legend').style.display = 'none';
    document.querySelector('.order_summary').style.display = 'none';

    // Reset selected seats
    resetSelectedSeats();
  });

  // Movie logic
  selectMovie.addEventListener('change', () => {
    movie = movies[selectMovie.value];
    selectDate.disabled = false;
    selectDate.value = '';
    selectTime.disabled = true;
    selectTime.value = '';
    summarySection.style.display = 'none';
    document.querySelector('.container_movie_cinema').style.display = 'none';
    document.querySelector('.seat-legend').style.display = 'none';
    document.querySelector('.order_summary').style.display = 'none';

    // Update the summary section if it is already visible
    updateSummary();

    // Update booked seats
    updateBookedSeats();

    // Reset selected seats
    resetSelectedSeats();
  });

  // Date logic
  selectDate.addEventListener('change', () => {
    date = selectDate.value;
    selectTime.disabled = false;
    selectTime.value = '';
    summarySection.style.display = 'none';
    document.querySelector('.container_movie_cinema').style.display = 'none';
    document.querySelector('.seat-legend').style.display = 'none';
    document.querySelector('.order_summary').style.display = 'none';

    // Update booked seats
    updateBookedSeats();

    // Reset selected seats
    resetSelectedSeats();
  });

  // Time logic, show summary after selecting the time
  selectTime.addEventListener('change', () => {
    time = selectTime.value;

    // display the summary, seats, and legends after selecting the time
    if (location && movie && date && time) {
      summarySection.style.display = 'flex';
      document.querySelector('.container_movie_cinema').style.display = 'block';
      document.querySelector('.seat-legend').style.display = 'flex';
      document.querySelector('.order_summary').style.display = 'block';

      // display the summary details
      updateSummary();

      // Update booked seats
      updateBookedSeats();

      // Reset selected seats
      resetSelectedSeats();
    }
  });

  // Toggle selection for available seats
  seats.forEach((seat) => {
    seat.addEventListener('click', () => {
      if (!seat.classList.contains('booked')) {
        seat.classList.toggle('selected');

        // Update selectedSeats count and summary
        selectedSeats = document.querySelectorAll('.seat.selected').length;
        totalPrice = selectedSeats * seatPrice;

        // Update order summary
        updateSeatSelection();
      }
    });
  });

  // Control the date input to disable past dates
  const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
  document.getElementById('select-date').setAttribute('min', today); // set the minimum date to the date today
});

/* Explanation

new Date().toISOString() returns "2025-01-30T13:45:30.000Z"
It contains the date, time, and utc timezone information during code execution

After using .split(T), it will split into 2 parts at the T character

The first part is the date ("2025-01-30")
The second part is the time ("13:45:30.000Z").
After this operation, you get an array like: ["2025-01-30", "13:45:30.000Z"].

Then use [0], to only get the 1st entry of the array which is the date

*/

/////////////////////////////////////////////////////////////////////////
///////////////////////////// Checkout Button ///////////////////////////
/////////////////////////////////////////////////////////////////////////

const checkOut = document.querySelector('.checkout_button');
checkOut.addEventListener('click', () => {
  let price = parseFloat(prompt(`Please pay Php ${totalPrice}`));
  if (!isNaN(price) && price === totalPrice) {
    alert('Enjoy the movie!!!');
  } else {
    alert('Invalid input, try again');
  }
});

/////////////////////////////////////////////////////////////////////////
//////////////////////// Movie Photo Navigation /////////////////////////
/////////////////////////////////////////////////////////////////////////

// Store the images as string on an array
// Make sure that it has the same name
const images = [
  'movie1.png',
  'movie2.png',
  'movie3.png',
  'movie4.png',
  'movie5.png',
  'movie6.png',
];

let currentIndex = 0;
const imagesPerSlide = 3; // show 3 photos at a time

const imageWrapper = document.querySelector('.image_wrapper');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

// Function to display images
function displayImages() {
  // Clear previous images after clicking next / prev
  imageWrapper.innerHTML = '';

  for (let i = 0; i < imagesPerSlide; i++) {
    let imgIndex = (currentIndex + i) % images.length;
    // this makes sure go back to start once it reached the end, infinite loop

    /* 

    Note: on X % Y, if X is smaller than Y, return X

Example:
Let's say we have 6 images and we want to display 3 images at a time (imagesPerSlide = 3).

Initial State:
currentIndex = 0
images = ['movie1.png', 'movie2.png', 'movie3.png', 'movie4.png', 'movie5.png', 'movie6.png']

Loop Iteration:

For i = 0:
imgIndex = (0 + 0) % 6 = 0
Image displayed: images[0] = 'movie1.png'

For i = 1:
imgIndex = (0 + 1) % 6 = 1
Image displayed: images[1] = 'movie2.png'

For i = 2:
imgIndex = (0 + 2) % 6 = 2
Image displayed: images[2] = 'movie3.png'

After Clicking Next:
currentIndex = 3 (updated by the next button logic)

Loop Iteration:

For i = 0:
imgIndex = (3 + 0) % 6 = 3
Image displayed: images[3] = 'movie4.png'

For i = 1:
imgIndex = (3 + 1) % 6 = 4
Image displayed: images[4] = 'movie5.png'

For i = 2:
imgIndex = (3 + 2) % 6 = 5
Image displayed: images[5] = 'movie6.png'

After Clicking Next Again:
currentIndex = 6 (updated by the next button logic, but since 6 % 6 = 0, it wraps around to 0)

Loop Iteration:

For i = 0:
imgIndex = (6 + 0) % 6 = 0
Image displayed: images[0] = 'movie1.png'

For i = 1:
imgIndex = (6 + 1) % 6 = 1
Image displayed: images[1] = 'movie2.png'

For i = 2:
imgIndex = (6 + 2) % 6 = 2
Image displayed: images[2] = 'movie3.png'

    */
    const imgElement = document.createElement('img'); // Create an image element
    imgElement.src = images[imgIndex]; // add reference to the images array using imgIndex from the loop
    imageWrapper.appendChild(imgElement); // add to the HTML
  }
}

// Event Listener for Next Button (Move Forward)
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + imagesPerSlide) % images.length;
  displayImages();
});

// Event Listener for Previous Button (Move Backward)
prevButton.addEventListener('click', () => {
  currentIndex =
    (currentIndex - imagesPerSlide + images.length) % images.length;
  displayImages();
});

// Initial Display
displayImages();
