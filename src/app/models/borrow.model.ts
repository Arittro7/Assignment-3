import { model, Schema } from 'mongoose';
import { IBorrow } from './../interfaces/borrow.interface';


const borrowSchema = new Schema<IBorrow>({
  book : {type: Schema.Types.ObjectId, ref: "Book", required:true },
  quantity: {type: Number, required: true, min: 0},
  dueDate: {type: Date, required: true}, 
},{
  timestamps: true, versionKey: false
})

export const Borrow = model<IBorrow>('Borrow', borrowSchema)