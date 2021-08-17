import { Request, Response } from 'express'
import Article from '../schemas/Article'
import fs from 'fs'

class ArticleController {
  public async index(req: Request, res: Response): Promise<Response> {
    let page = req.query?.page ? parseInt(req.query.page) : 0
    const resultsPerPage = 5
    const articles = await Article.find()
      .limit(resultsPerPage)
      .skip(resultsPerPage * page)

    articles.forEach(article => {
      article.image = req.get('host') + '/uploads/' + article._id + '.png'
    })

    return res.json(articles)
  }

  public async create(req: Request, res: Response): Promise<Response> {
    let { title, subtitle, content, topic } = req.body
    if (!title || !subtitle || !content || !topic) {
      return res.json({
        status: '500',
        msg: 'All fields are required'
      })
    }
    const article = await Article.create(req.body)
    fs.renameSync(
      req.file?.path ? req.file?.path : '',
      'uploads\\' + article._id + '.png'
    )
    return res.json(article)
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    let id = req.query.id

    if (!id) {
      return res.json({
        status: '500',
        msg: 'Missing a parameter id'
      })
    }

    try {
      let article = await Article.findOne({ _id: id })
      if (!article) {
        return res.json({
          status: 404,
          msg: 'Article not found'
        })
      }
    } catch (error) {
      console.log('caiu')
      return res.json({
        status: 500,
        msg: 'Invalid parameter format id'
      })
    }

    await Article.deleteOne({ _id: id })
    fs.rmSync('uploads\\' + id + '.png')

    return res.json({ status: 200, msg: `${id} was successfully deleted` })
  }
}

export default new ArticleController()
