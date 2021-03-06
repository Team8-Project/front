import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { connectRouter } from 'connected-react-router'
import Quiz from './modules/quiz'
import User from './modules/user'
import Dict from './modules/dict'
import Comment from './modules/comment'
import Mypage from './modules/mypage'
import Image from './modules/image'
import Question from './modules/dictquestion'

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  quiz: Quiz,
  user: User,
  dict: Dict,
  comment: Comment,
  mypage: Mypage,
  image: Image,
  question: Question,
  router: connectRouter(history),
})

const middlewares = [thunk.withExtraArgument({ history: history })]

const env = process.env.NODE_ENV

if (env === 'development') {
  const { logger } = require('redux-logger')
  middlewares.push(logger)
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

let store = (initialStore) => createStore(rootReducer, enhancer)

export default store()
