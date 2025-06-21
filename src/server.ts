import {Server} from 'http'
import mongoose from 'mongoose'
import app from './app'
import {config} from 'dotenv'

config()


let server: Server
const PORT: string | number = process.env.PORT || 5000

async function main(){
  try {
    await mongoose.connect(process.env.DB_URL as string)
    server = app.listen(PORT, () =>{
      console.log(`App is Listening on PORT ${PORT}`);
    })
  } catch (error) {
    console.log({
      status: 500,
      success:false,
      message: "Mongodb Connection failed",

    });
  }
}

main()