import express, {Application, Request, Response} from 'express'
import { booksRoute } from './app/controllers/books.controllers'

const app: Application = express()

// middleware will added here
app.use(express.json())

app.use('/api/books', booksRoute)

// primary route
app.get('/', (req: Request, res: Response) =>{
  res.send('welcome to Library Management System 📚')
})

export default app