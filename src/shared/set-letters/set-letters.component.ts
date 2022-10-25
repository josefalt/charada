import { LetterService } from './../../assets/letter.service';
import { ILetter } from 'src/models/ILetter';
import { Component, Input, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { KeyboardService } from 'src/assets/keyboard.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-set-letters',
  templateUrl: './set-letters.component.html',
  styleUrls: ['./set-letters.component.scss'],
  providers: [ MessageService ]
})
export class SetLettersComponent implements AfterViewInit, OnChanges, OnInit {

  @ViewChildren('input') input!: QueryList<ElementRef<HTMLInputElement>>;

  @Input() currentWord: boolean = false;
  @Input() correctWord: ILetter[] = [];
  @Input() indexLineWordActual: number = 0;
  @Input() indexLineWord: number = 0;

  @Output() newWordChange = new EventEmitter<boolean>();
  @Input() newWord: boolean = false;

  @Output() emitLetters = new EventEmitter<ILetter[]>();
  @Output() emitMessage = new EventEmitter<Object>();

  letters: ILetter[] = [];
  indexSelect: number = 0;

  constructor(
    private letterService: LetterService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.indexLineWordActual >0 && this.indexLineWord === this.indexLineWordActual){
      this.letters.forEach(letter => {
        letter.letter= '';
      });
    }
  }

  ngOnInit(): void {
    this.inicialize();
    this.checkKeyboard();
  }

  ngAfterViewInit() {
    this.focusInput(5)
  }

  selectLetter(index: number): void{
    this.indexSelect = index;
    this.letters.forEach(letter => {
      letter.select = false;
    });
    this.letters[index].select = true;
  }

  addLetter(event: KeyboardEvent | string, index: number): void{
    const nextIndex = this.checkNextIndex(index);
    if(typeof event === 'string'){
      if(index >= 0){
        this.letters[index].letter = event;
        this.letters[index].select = false;

        if(this.letters[nextIndex].letter === ''){
          this.letters[nextIndex].select = true;
          this.indexSelect = nextIndex;
          this.focusInput(nextIndex);
        } else if(this.checkNextEmptyLetter(nextIndex) < 5) {
          const indexLetterEmpty = this.checkNextEmptyLetter(nextIndex);
          this.letters[indexLetterEmpty].select = true;
          this.indexSelect = indexLetterEmpty;
          this.focusInput(indexLetterEmpty);
        } else {
          this.onFocusInput(index);
        }
      }
    } else {
      if(event.keyCode >=  65 && event.keyCode <= 90){
        this.letters[index].letter = event.key;
        this.letters[index].select = false;

        if(this.letters[nextIndex].letter === ''){
          this.letters[nextIndex].select = true;
          this.indexSelect = nextIndex;
          this.focusInput(nextIndex);
        } else if(this.checkNextEmptyLetter(nextIndex) < 5) {
          const indexLetterEmpty = this.checkNextEmptyLetter(nextIndex);
          this.letters[indexLetterEmpty].select = true;
          this.indexSelect = indexLetterEmpty;
          this.focusInput(indexLetterEmpty);
        } else {
          this.onFocusInput(index);
        }
      }else if(event.keyCode === 8){
        this.bacskPaceLetter(index);
      }
    }
  }

  private inicialize(): void{
    for (let index = 0; index < 5; index++) {
      const letter: ILetter = {
        letter: '',
        empty: false,
        corret: false,
        place: false,
        wrong: false,
        select: false,
        index: index,
      };
      this.letters.push(letter);
    }
  }

  private checkKeyboard(): void{
    KeyboardService.letterEmit.subscribe(letter => {
      if(letter === 'backspace'){
        this.bacskPaceLetter(this.indexSelect);
      } else if(letter === 'enter'){
        this.addNewWord();
      } else if(letter === 'backspace2' && this.indexSelect === -1){
        this.bacskPaceLetter(5);
      } else if(letter === 'backspace2') {
        letter = '';
      } else {
        this.addLetter(letter, this.indexSelect);
      }
    });
  }

  private bacskPaceLetter(index: number): void {
    if(this.currentWord){
      if(this.checkNextEmptyLetter(index) === 5 && this.indexSelect === -1){
        this.letters[4].letter = '';
        this.letters[4].select = true;
        this.indexSelect = 4;
        this.focusInput(4);
      } else if (this.letters[this.indexSelect].letter !== '') {
        this.letters[this.indexSelect].letter = '';
      } else {
        const previosIndex = this.checkPreviusIndex(this.indexSelect);
        this.letters[this.indexSelect].select = false;
        this.indexSelect = previosIndex;
        this.letters[previosIndex].letter = '';
        this.letters[previosIndex].select = true;
        this.focusInput(this.indexSelect);
      }
    }
  }

  private addNewWord(): void{
    if(this.currentWord){
      let word = '';
      for (let index = 0; index < 5; index++) {
        if(this.letters[index].letter === ''){
          this.emitMessage.emit({severity:'info', summary:'Informação', detail:'Só palavras com 5 letras'});
          return;
        } else {
          word = `${word}${this.letters[index].letter.toLowerCase()}`
        }
      }

      if(word.length === 5){
        this.letterService.searchWord(word).subscribe(word => {
         this.addNewWordEmit();
        },
        () => {
          this.emitMessage.emit({severity:'info', summary:'Informação', detail:'Essa palavra não é aceita'});
        })
      }
    }
  }

  private addNewWordEmit(){
    this.letters.forEach((letter, indexLetter) => {
      const letterCurrent = letter.letter.toLowerCase();
      for (let index = 0; index < 5; index++) {
        const correctLetter = this.correctWord[index].letter.toLowerCase();
        if(letterCurrent === correctLetter && indexLetter === index){
          letter.corret = true;
        } else if(letterCurrent === correctLetter && indexLetter !== index){
          letter.place = true;
        } else {
          letter.wrong = true;
        }
      }
    });
    this.emitLetters.emit(this.letters);
  }

  private focusInput(index: number): void{
    if(this.currentWord){
      if(index === 5){
        this.input.first.nativeElement.focus();
      } else {
        this.input.forEach((input, indexInput) => {
          if(index === indexInput){
            input.nativeElement.focus();
          }
        })
      }
    }
  }

  private onFocusInput(index: number): void{
    if(this.currentWord){
      if(index === 5){
        this.input.first.nativeElement.blur();
        this.letters[0].select = false;
        this.indexSelect = -1;
      } else {
        this.input.forEach((input, indexInput) => {
          if(index === indexInput){
            input.nativeElement.blur();
            this.letters[index].select = false;
            this.indexSelect = -1;
          }
        })
      }
    }
  }

  private checkNextIndex(index: number): number{
    if(index < 4){
      return index + 1;
    }else{
      return 0;
    }
  }

  private checkPreviusIndex(index: number): number{
    if(index > 0){
      return index - 1;
    }else{
      return 0;
    }
  }

  private checkNextEmptyLetter(index: number): number{
    let nextIndex = index;
    for (let index = 0; index < this.letters.length; index++) {
      nextIndex = this.checkNextIndex(nextIndex);
      if(this.letters[nextIndex].letter === ''){
        return nextIndex;
      }
    }

    return 5;
  }
}
