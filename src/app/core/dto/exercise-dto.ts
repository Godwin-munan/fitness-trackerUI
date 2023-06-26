export class exerciseDto{


    constructor(
      public name: string,
      public duration: number,
      public calory: number,
      public date?: Date, 
      public state?: string,
      public userId?: number
      ){

    }
}