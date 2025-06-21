export interface IBorrow{
  book: string,          //<----- mongoose object id
  quantity: number,
  dueDate : Date
}