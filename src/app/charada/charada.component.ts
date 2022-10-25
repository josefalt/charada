import { IKeyboard, ILetter, IMessage } from 'src/models/ILetter';
import { IWord } from './../../models/ILetter';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-charada',
  templateUrl: './charada.component.html',
  styleUrls: ['./charada.component.scss'],
  providers: [ MessageService ]
})
export class CharadaComponent implements OnInit {

  dialogStart: boolean = true;
  dialogFinish: boolean = false;
  messageCode: IMessage = {code: 0, message: ''}
  words: IWord[] = [];
  newWord: boolean = false;
  indexSelect: number = 0;

  correctWord: ILetter[] = [
    {letter: 't'} as ILetter,
    {letter: 'e'} as ILetter,
    {letter: 's'} as ILetter,
    {letter: 't'} as ILetter,
    {letter: 'e'} as ILetter,
  ];

  lineKeyboard: IKeyboard = {
    line0: [
      {letter: 'Q'} as ILetter,
      {letter: 'W'} as ILetter,
      {letter: 'E'} as ILetter,
      {letter: 'R'} as ILetter,
      {letter: 'T'} as ILetter,
      {letter: 'Y'} as ILetter,
      {letter: 'U'} as ILetter,
      {letter: 'I'} as ILetter,
      {letter: 'O'} as ILetter,
      {letter: 'P'} as ILetter
    ],
    line1: [
      {letter: 'A'} as ILetter,
      {letter: 'S'} as ILetter,
      {letter: 'D'} as ILetter,
      {letter: 'F'} as ILetter,
      {letter: 'G'} as ILetter,
      {letter: 'H'} as ILetter,
      {letter: 'J'} as ILetter,
      {letter: 'K'} as ILetter,
      {letter: 'L'} as ILetter
    ],
    line2: [
      {letter: 'Z'} as ILetter,
      {letter: 'X'} as ILetter,
      {letter: 'C'} as ILetter,
      {letter: 'V'} as ILetter,
      {letter: 'B'} as ILetter,
      {letter: 'N'} as ILetter,
      {letter: 'M'} as ILetter
    ],
  }

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    let code: any;
    this.route.paramMap.subscribe(params => code = params.get('id'));
    this.messageCode.code = parseInt(code);
    this.resetVariables();
    this.inicialize();
  }

  resetVariables(): void {
    this.dialogStart = true;
    this.dialogFinish = false;
    this.messageCode = {code: 0, message: ''}
    this.words = [];
    this.newWord = false;
    this.indexSelect = 0;
    this.lineKeyboard = {
      line0: [
        {letter: 'Q'} as ILetter,
        {letter: 'W'} as ILetter,
        {letter: 'E'} as ILetter,
        {letter: 'R'} as ILetter,
        {letter: 'T'} as ILetter,
        {letter: 'Y'} as ILetter,
        {letter: 'U'} as ILetter,
        {letter: 'I'} as ILetter,
        {letter: 'O'} as ILetter,
        {letter: 'P'} as ILetter
      ],
      line1: [
        {letter: 'A'} as ILetter,
        {letter: 'S'} as ILetter,
        {letter: 'D'} as ILetter,
        {letter: 'F'} as ILetter,
        {letter: 'G'} as ILetter,
        {letter: 'H'} as ILetter,
        {letter: 'J'} as ILetter,
        {letter: 'K'} as ILetter,
        {letter: 'L'} as ILetter
      ],
      line2: [
        {letter: 'Z'} as ILetter,
        {letter: 'X'} as ILetter,
        {letter: 'C'} as ILetter,
        {letter: 'V'} as ILetter,
        {letter: 'B'} as ILetter,
        {letter: 'N'} as ILetter,
        {letter: 'M'} as ILetter
      ],
    }
  }

  addNewWord(letters: ILetter[]): void{
    let countCorrect: number = 0;
    letters.forEach(letter => {
      if(letter.corret === true){
        countCorrect++;
      }

      if(countCorrect === 5){
        this.setMessageCodeCorrect()
        this.dialogFinish = true;
      }
    });
    this.words[this.indexSelect].word = [...letters];
    this.indexSelect++;
    this.keyboardLetter(letters);
    this.newWord = true;
    
    if(this.indexSelect == 6 && countCorrect !== 5) {
      this.setMessageCodeIncorrect()
      this.dialogFinish = true;
    }
  }

  private setMessageCodeCorrect(){
    this.messageCode = {code: 0, message: 'Parabéns você ganhou!'}
  }

  private setMessageCodeIncorrect(){
    this.messageCode = {code: 0, message: 'Você perdeu!'}
  }

  keyboardLetter(letters: ILetter[]): void{

    letters.forEach(letter => {
      let index = this.lineKeyboard.line2.map(letterKey => letterKey.letter.toLocaleLowerCase()).indexOf(letter.letter.toLocaleLowerCase());
      if(index > -1){
        this.lineKeyboard.line2[index] = letter;
      }else {
        index = this.lineKeyboard.line1.map(letterKey => letterKey.letter.toLocaleLowerCase()).indexOf(letter.letter.toLocaleLowerCase());

        if(index > -1){
          this.lineKeyboard.line1[index] = letter;
        } else {
          index = this.lineKeyboard.line0.map(letterKey => letterKey.letter.toLocaleLowerCase()).indexOf(letter.letter.toLocaleLowerCase());

          this.lineKeyboard.line0[index] = letter;
        }
      }
    })
  }

  message(message: Object): void{
    this.messageService.add(message);
  }

  private inicialize():void{
    for (let index = 0; index < 6; index++) {
      this.words.push({} as IWord);
    }
  }
}
