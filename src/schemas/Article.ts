import { Schema, model } from 'mongoose'

const ArticleSchema = new Schema({
  title: String,
  subtitle: String,
  content: String,
  topic: String,
  image: String
})

export default model('Article', ArticleSchema)
