export interface IWord {
  word: ILetter[];
}

export interface ILetter {
  letter: string;
  empty: boolean;
  corret: boolean;
  place: boolean;
  wrong: boolean;
  select: boolean;
  index?: number;
}

export interface IKeyboard {
  line0: ILetter[];
  line1: ILetter[];
  line2: ILetter[];
}

export interface IMessage {
  code: number;
  message: string;
}

export interface IErrorLetter {
  check: boolean;
  message?: string;
}
