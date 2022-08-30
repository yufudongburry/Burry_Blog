export interface GameTypeState {
  gameList: {
    [index:number]:{
      name:string,
      id:number,
      color:string
    }
  }
  color: string
}

export interface TimeTypeState {
  upWorkTime: number,
  underWorkTime: number,
  nowDate: number,
  setDialogShow: boolean,
  hour: number,
  minute: number,
  second: number,
  getCompensationNum: string,
}

export interface SetFormState {
  timePeriod: number [],
  salary: string,
  days: number,
}
