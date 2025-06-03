import Genre from '../enums/Genre';
import Review from './Review';

export class Movie {
    private id: string;
    private title: string;
    private genre: Genre;
    private duration: number;
    private rating: number;
    private description: string;
    private reviews: Review[];

    constructor(id: string, title: string, genre: Genre, duration: number, rating: number, description: string) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.rating = rating;
        this.description = description;
        this.reviews = [];
    }

    public addReview(review: Review): void {
        this.reviews.push(review);
    }

    public getReviews(): Review[] {
        return this.reviews;
    }

    public getId(): string {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getGenre(): Genre {
        return this.genre;
    }

    public getDuration(): number {
        return this.duration;
    }

    public getRating(): number {
        return this.rating;
    }
}