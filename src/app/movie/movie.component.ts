import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {

  type = '';
  id = '';
  url = '';
  movies: any;
  movie: any;
  
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  
  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type === 'trending') {
      this.url = 'assets/data/trending-movies.json';
    }
    if (this.type === 'theatre') {
      this.url = 'assets/data/theatre-movies.json';
    }
    if (this.type === 'popular') {
      this.url = 'assets/data/popular-movies.json';
    }
    this.getMovie();
  }

  getMovie() {
    this.http.get(this.url).subscribe((movies) => {
      this.movies = movies;
      let index = this.movies.findIndex(
        (movie: { id: string }) => movie.id == this.id
      );
      if (index > -1) {
        this.movie = this.movies[index];
      }
    });
  }
  
}
