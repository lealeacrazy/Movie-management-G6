import { User } from "./User"

export class Review {
  constructor(
    public reviewId: string,
    public user: User,
    public movie: Movie,
    public rating: number,
    public comment: string,
    public reviewDate: Date
  ) {}

  editReview(rating: number, comment: string): void {
    this.rating = rating;
    this.comment = comment;
  }
}
