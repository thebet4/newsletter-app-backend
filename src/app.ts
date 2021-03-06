import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
import path from 'path'
require('dotenv').config()

class App {
  public express: express.Application

  public constructor() {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    )
  }

  private database(): void {
    let uri = process.env.DATABASE_URL ? process.env.DATABASE_URL : ''
    mongoose.connect(uri, {
      useNewUrlParser: true
    })
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new App().express
