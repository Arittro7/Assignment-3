import express, {Application, Request, Response} from 'express'
import { booksRoute } from './app/controllers/books.controllers'
import { borrowRoute } from './app/controllers/borrow.controllers'
const cors = require("cors")


const app: Application = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'https://assignment-3-eta-ten.vercel.app/']
   })
);

// middleware will added here
app.use(express.json())

app.use('/api/books', booksRoute)
app.use('/api/borrow', borrowRoute)

// primary route
app.get('/', (req: Request, res: Response) =>{
  res.send('welcome to Library Management System 📚')
})

export default app