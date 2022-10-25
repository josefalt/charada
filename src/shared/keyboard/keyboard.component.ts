import { IKeyboard } from './../../models/ILetter';
import { Component, Input, OnInit } from "@angular/core";

import { KeyboardService } from './../../assets/keyboard.service';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
})
export class KeyboardComponent implements OnInit {

  @Input() lineKeyboard: IKeyboard = {
    line0: [],
    line1: [],
    line2: []
  } as IKeyboard;

  constructor(
    private keyboardService: KeyboardService
  ){}

  ngOnInit(): void {
  }

  letter(letter: string){
    this.keyboardService.emmitLetter(letter);
  }
}
