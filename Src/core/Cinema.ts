import { Showtime } from "../service/ShowTime";

export class Cinema {
  constructor(
    public cinemaId: string,
    public name: string,
    public location: string,
    public screens: number,
    public showtimes: Showtime[] = []
  ) {}

  getShowtimes(): Showtime[] {
    return this.showtimes;
  }
}