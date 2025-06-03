export class Movie {
    private movieId: string;
    private title: string;
    private description: string;
    private genre: string;
    private duration: number;
    private releaseDate: Date;

    constructor(movieId: string, title: string, description: string, genre: string, duration: number, releaseDate: Date) {
        this.movieId = movieId;
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.duration = duration;
        this.releaseDate = releaseDate;
    }

    public addShowtime(showtime: Date): void {
        // Logic to add a showtime for the movie
        console.log(`Showtime ${showtime} added for movie ${this.title}`);
    }

    public addReview(review: string): void {
        // Logic to add a review for the movie
        console.log(`Review added for movie ${this.title}: ${review}`);
    }

    
}