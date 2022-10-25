import { Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {

  static letterEmit: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  emmitLetter(letter: string){
    KeyboardService.letterEmit.emit(letter);
  }
}
