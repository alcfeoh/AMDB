import { Injectable } from '@angular/core';
import {MovieDetails} from '../types';


interface StoredObjects {
  details: MovieDetails[];
  search: string;
}

type Key = keyof StoredObjects;

@Injectable({
  providedIn: 'root'
})
export class Storage {

  getValue<K extends Key>(key: K): StoredObjects[K] {
    return localStorage.getItem(key) as StoredObjects[K];
  }

  setValue<K extends Key>(key: K, value: StoredObjects[K]) {
    localStorage.setItem(key, JSON.stringify(value));
  }

}
