import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/routes/Main'
import Quiz from '@/routes/Quiz'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/:quizID',
      props: true,
      name: 'Quiz',
      component: Quiz
    }
  ]
})
