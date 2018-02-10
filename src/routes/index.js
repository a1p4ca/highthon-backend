import Router from 'koa-router'

import store from '../store'

const router = new Router()

router.get('/schools', async ctx => {
  ctx.body = store.schools
})

router.post('/schools', async ctx => {
  const id = Math.max(...Object.keys(store.schools)) + 1
  store.schools[id] = ctx.request.body
  ctx.body = {
    result: true,
    id
  }
})

router.post('/done', async ctx => {
  const { schoolId, goalId } = ctx.request.body
  const school = store.schools[schoolId]
  const goal = school.goals[goalId]
  school.doneGoals++
  goal.done = true
  store.caps += goal.caps

  ctx.body = {
    result: true
  }
})

router.get('/stats', async ctx => {
  ctx.body = {
    caps: store.caps,
    diplomas: store.diplomas
  }
})

router.post('/diploma', async ctx => {
  const date = new Date()
  store.diplomas.push({ ...store.schools[ctx.request.body.schoolId].diploma, date: `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`})
  ctx.body = {
    result: true
  }
})

export default router
