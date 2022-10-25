import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  constructor(
    private http: HttpClient
  ) {}

  searchWord(word: string): Observable<string[]>{
    return this.http.get<string[]>(`https://significado.herokuapp.com/v2/silabas/${word}`);
  }
}
