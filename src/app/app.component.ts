import { KeyboardService } from './../assets/keyboard.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('document:keydown', ['$event'])
  event(event: KeyboardEvent){
    const key = new KeyboardService();

    if(event.keyCode === 8){
      key.emmitLetter('backspace2')
    } else if(event.keyCode === 13) {
      key.emmitLetter('enter')
    }
  }
}
