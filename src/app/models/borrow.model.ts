import { model, Schema } from 'mongoose';
import { IBorrow } from './../interfaces/borrow.interface';
import { Book } from './book.model';


const borrowSchema = new Schema<IBorrow>({
  book : {type: Schema.Types.ObjectId, ref: "Book", required:true },
  quantity: {type: Number, required: true, min: 0},
  dueDate: {type: Date, required: true}, 
},{
  timestamps: true, versionKey: false
})

borrowSchema.post<IBorrow>("save", async function(){
  const borrowedBook = await Book.findById(this.book)
  if(borrowedBook){
    borrowedBook.copies -= this.quantity
    await borrowedBook.save()
  } 
})

export const Borrow = model<IBorrow>('Borrow', borrowSchema)