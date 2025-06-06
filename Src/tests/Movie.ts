import { Movie } from "../core/Movie";
import { MovieManager } from "../service/MovieManager";
import { Genre } from "../service/Genre";
import { Showtime } from "../service/ShowTime";
import { Cinema } from "../core/Cinema";
import { Seat } from "../core/Seat";




const simpleDate = "06-05-2025"; 

function parseDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const showtimeDate = parseDate(simpleDate);

// Create movie manager
const movieManager = new MovieManager();

// Create a movie
const movie = new Movie(
  "1",
  "Hariporter and the Philosopher's Stone",
  Genre.ROMANCE, 
  148, 
  "Star 4", 
  "A young wizard discovers his magical heritage on his 11th birthday when Hagrid escorts him to magic school."
);

// Add movie
movieManager.addMovie(movie);

// Create cinema
const cinema = new Cinema("01", "Theater A1", "Eon2", 5);

// Create seats
const seats: Seat[] = [
  new Seat("s1", "A", 1, "Standard", "Available"),
  new Seat("s2", "A", 2, "Standard", "Booked"),
  new Seat("s3", "A", 3, "Standard", "Reserved"),
];

// Create showtime
const showtime = new Showtime("2:00:48s", movie, cinema, showtimeDate, seats);
movie.addShowTime(showtime);

// Display showtimes
const showtimes = movieManager.getAllShowtimes();

if (showtimes.length === 0) {
  console.log("No showtimes found.");
} else {
  const formattedShowtimes = showtimes.map(show => ({
    showtimeId: show.showtimeId,
    movieTitle: show.movie.title,
    genre: show.movie.genre,
    description: show.movie.description,
    rating: show.movie.rating,
    duration: `${show.movie.duration} minutes`,
    cinemaName: show.cinema.name,
    location: show.cinema.location,
    dateTime: formatDate(show.dateTime),
    
  }));

  console.log("Showtimes:\n", formattedShowtimes);
  
}


