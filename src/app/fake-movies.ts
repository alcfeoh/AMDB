import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FakeMovies {

  constructor() {
    console.log("Fake movies being created")
  }

}
