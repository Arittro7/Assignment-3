import express, {Application, Request, Response} from 'express'

const app: Application = express()

// middleware will added here

// primary route
app.get('/', (req: Request, res: Response) =>{
  res.send('welcome to Library Management System 📚')
})

export default app