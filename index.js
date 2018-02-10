import Koa from 'koa'
import logger from 'koa-chalk-logger'
import conditional from 'koa-conditional-get'
import etag from 'koa-etag'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'

import router from './src/routes'

import path from 'path'

const app = new Koa()
const port = process.env.NODE_ENV === 'production' ? 80 : 3000

app
  .use(logger())
  .use(conditional())
  .use(etag())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve(path.join(__dirname, 'public'), { maxage: 1000 * 60 * 30 }))
  .listen(port)

console.log('Server starts!')
