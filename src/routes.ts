import { Router } from 'express'
import ArticleController from './controllers/ArticleController'
import multer from 'multer'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
const uploadImage = multer({ storage })

const routes = Router()

routes.get('/articles', ArticleController.index)

routes.post('/articles', uploadImage.single('image'), ArticleController.create)

routes.delete('/articles', ArticleController.delete)

export default routes
