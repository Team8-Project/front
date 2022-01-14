import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './redux/ConfigureStore'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from './styles/GlobalStyle'
import theme from './styles/theme'
import Auth from './shared/auth'
import {
  Main,
  QuizIntro,
  Quiz,
  QuizResult,
  Join,
  Login,
  Mypage,
  PostDetail,
  PostEdit,
  PostList,
  PostWrite,
  PostSearch,
  DictEdit,
  DictList,
  DictWrite,
  DictDetail,
  DictHistory,
  ImageList,
  ImageDetail,
  ImageUpload,
  DictSearch,
  DictStat,
} from './pages'
import MobileFrame from './components/MobileFrame'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ConnectedRouter history={history}>
          <MobileFrame>
            <Route path="/" exact component={Main} />
            <Route path="/join" exact component={Auth(Join, false)} />
            <Route path="/login" exact component={Auth(Login, false)} />
            <Route path="/mypage" exact component={Auth(Mypage, true)} />
            <Route path="/quiz" exact component={QuizIntro} />
            <Route path="/quiz/:category" exact component={Quiz} />
            <Route path="/quiz/:category/result" exact component={QuizResult} />
            <Route path="/dict/question" exact component={PostList} />
            <Route path="/dict/question/detail/:questionId" exact component={PostDetail} />
            <Route path="/dict/question/write" exact component={Auth(PostWrite, true)} />
            <Route path="/dict/question/edit/:questionId" exact component={Auth(PostEdit, true)} />
            <Route path="/post/search/:search" exact component={PostSearch} />
            <Route path="/dict" exact component={DictList} />
            <Route path="/dict/write" exact component={Auth(DictWrite, true)} />
            <Route path="/dict/edit/:dictId" exact component={Auth(DictEdit, true)} />
            <Route path="/dict/detail/:dictId" exact component={DictDetail} />
            <Route path="/dict/search/:keyword" exact component={DictSearch} />
            <Route path="/dict/history/:dictId" exact component={DictHistory} />
            <Route path="/dict/stat" exact component={DictStat} />
            <Route path="/image" exact component={ImageList} />
            <Route path="/image/detail/:imageId" exact component={ImageDetail} />
            <Route path="/image/upload" exact component={Auth(ImageUpload, true)} />
          </MobileFrame>
        </ConnectedRouter>
      </ThemeProvider>
    </>
  )
}

export default App
