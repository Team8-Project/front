import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import '../../styles/css/Login.css'
import styled from 'styled-components'
import { actionCreators as userActions } from '../../redux/modules/user'
import { KakaoButton, GoogleButton, NaverButton, Footer } from '../../components'
import MemegleIcon from '../../styles/image/smileIcon_Yellow.png'
import { Grid } from '../../elements'
import { AlertModal } from '../../components'
import CircularProgress from '@mui/material/CircularProgress'
import { IsLoginContext } from '../../shared/IsLoginContext'

const Login = () => {
  const dispatch = useDispatch()
  const { setIsLogin } = useContext(IsLoginContext)

  const loading = useSelector((state) => state.user.is_loading)
  const loginFail = useSelector((state) => state.user.is_failure)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [isUsername, setIsUsername] = useState('false')
  const [isPassword, setIsPassword] = useState('false')

  const [showAlert, setShowAlert] = useState(false)
  const [showFailAlert, setShowFailAlert] = useState(false)

  const onChangeUsername = (e) => {
    const emailRegex = /^(?=.*[a-z0-9])[a-z0-9]{3,16}$/
    const usernameCurrent = e.target.value
    setUsername(usernameCurrent)

    if (!emailRegex.test(usernameCurrent)) {
      setIsUsername(false)
    } else {
      setIsUsername(true)
    }
  }

  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setIsPassword(false)
    } else {
      setIsPassword(true)
    }
  }

  const login = () => {
    if (username === '' || password === '') {
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 1000)
      return
    }
    dispatch(userActions.logInDB(username, password))
    setIsLogin(true)
  }

  useEffect(() => {
    if (loginFail) {
      setShowFailAlert(true)
      setTimeout(() => setShowFailAlert(false), 1000)
      dispatch(userActions.failLogin(false))
      dispatch(userActions.loading(false))
    }
  }, [loginFail])

  return (
    <>
      <Grid flex_center padding="40px 0 37px">
        <Logo src={MemegleIcon} />
      </Grid>
      <div className="LoginLayout">
        <div className="MultiInputBoxLayout_login">
          <div className="LoginOrJoinButtons_login">
            <div className="JoinButton_login" onClick={() => history.push('/join')}>
              ????????????
            </div>
            <div className="LoginButton_login">?????????</div>
          </div>
          <div className="LoginOrJoinInputs_login">
            <label className="IdInputLabel" htmlFor="IdInput">
              ?????????
            </label>
            <input className="IdInputBox" id="IdInput" placeholder="??????, ?????? 3~16???" maxLength="16" type="email" onChange={onChangeUsername} value={username} />
            <label className="PwdInputLabel" htmlFor="PwdInput">
              ????????????
            </label>
            <input
              className="PwdInputBox"
              id="PwdInput"
              placeholder="?????? ????????????, ??????, ???????????? 6~16???"
              maxLength="16"
              type="password"
              onChange={onChangePassword}
              value={password}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  login()
                }
              }}
            />
            <div
              className="MemegleButton_LoginSubmit"
              type="submit"
              disabled={!(isUsername && isPassword)}
              onClick={login}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  login()
                }
              }}
            >
              <button className="MemegleButton_LoginSubmit Login1" disabled={loading}>
                {loading ? <CircularProgress size={16} sx={{ color: '#FFFFFF' }} /> : '?????????'}
              </button>
              <div className="MemegleButton_LoginSubmit Login2"></div>
            </div>
          </div>
        </div>
        <div className="SocialLoginHR">??????</div>
        <div className="SocialLoginBtns">
          <KakaoButton />
          <NaverButton />
          <GoogleButton />
        </div>
      </div>
      <AlertModal showModal={showAlert}>???????????? ??????????????? ?????? ??????????????????!</AlertModal>
      <AlertModal showModal={showFailAlert}>
        ????????? ?????? ??????????????? ?????????????????????.
        <br />
        ?????? ??????????????????!
      </AlertModal>
      <Footer />
    </>
  )
}

const Logo = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid #111;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
`

export default Login
