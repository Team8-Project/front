import React, { useCallback } from 'react'
import '../../styles/css/DictWrite.css'
import { useDispatch } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import { Header, ConfirmModal, DoubleCheckModal, AlertModal, ConfirmButton } from '../../components'
import { dictApi } from '../../shared/api'

const DictWrite = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = React.useState('')
  const [summary, setSummary] = React.useState('')
  const [content, setContent] = React.useState('')
  const [showModal, setShowModal] = React.useState(false)
  const [doubleCheck, setDoubleCheck] = React.useState(null)
  const [checkedTitle, setCheckedTitle] = React.useState('')
  const [showInputAlert, setShowInputAlert] = React.useState(false)
  const [showDoubleCheckAlert, setShowDoubleCheckAlert] = React.useState(false)

  const handleShowModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (title === checkedTitle) {
      setShowModal(!showModal)
    } else {
      setShowDoubleCheckAlert(true)
      setTimeout(() => setShowDoubleCheckAlert(false), 1000)
    }
  }

  const debounceFunction = (callback, delay) => {
    let timer
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => callback(...args), delay)
    }
  }

  const printValue = useCallback(
    debounceFunction((value) => console.log(value), 500),
    []
  )

  const onChangeTitle = async (e) => {
    printValue(e.target.value)
    await setTitle(e.target.value)
  }

  const onChangeSummary = async (e) => {
    printValue(e.target.value)
    await setSummary(e.target.value)
  }

  const onChangeContent = async (e) => {
    printValue(e.target.value)
    await setContent(e.target.value)
  }

  const addDict = () => {
    dispatch(dictActions.addDictDB(title, summary, content), [])
    setShowModal(false)
  }

  const doubleCheckDict = async () => {
    const dictName = title

    if (title !== '') {
      dictApi
        .dobleCheckDict(dictName)
        .then((res) => {
          if (res.data.data.result === true) {
            setDoubleCheck(true)
            setCheckedTitle(title)
          } else if (res.data.data.result === false) {
            setDoubleCheck(false)
          }
        })
        .catch((err) => {
          if (err.res) {
            console.log(err.res.data)
            console.log(err.res.status)
            console.log(err.res.headers)
          }
        })
    } else {
      setShowInputAlert(true)
      setTimeout(() => setShowInputAlert(false), 1000)
    }
  }

  const handleMoveDictList = () => {
    history.push('/dict')
    setDoubleCheck(null)
  }

  return (
    <>
      <Header type="goBack" location="?????? ?????????" />
      <div className="DictCardWritePageLayout">
        <div className="DictCardInputSection">
          <div className="DictCardInputTitleContainer">
            <div className="DictCardInputTitleGuideText">
              ??????<span className="highlight">*</span>
            </div>{' '}
            <input
              className="DictCardInputTitle"
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="????????? ????????? ??????????????????"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  doubleCheckDict()
                }
              }}
            />
            <div
              className="DictCardInputTitleDoubleCheck"
              onClick={() => {
                doubleCheckDict()
              }}
            >
              ????????????
            </div>
          </div>
          <div className="DictCardInputSummaryContainer">
            <div className="DictCardInputSummaryGuideText">
              ????????????<span className="highlight">*</span>
            </div>
            <input className="DictCardInputSummary" type="text" cols="40" rows="3" maxlength="25" value={summary} onChange={onChangeSummary} placeholder="????????? ?????? 25??? ????????? ??????????????????" />
          </div>
          <div className="DictCardInputContentContainer">
            <div className="DictCardInputContentGuideText">????????????</div>
            <textarea className="DictCardInputContent" type="text" cols="40" rows="10" value={content} onChange={onChangeContent} placeholder="???????????? ???????????? ????????? ????????? ?????????" />
          </div>
        </div>
      </div>
      <div className="DictCardTemporaryOrSubmitButton">
        <div className="DictCardSubmitButton" type="submit">
          <button className="DictCardSubmitButton_1" onClick={handleShowModal} disabled={!(title !== '' && summary !== '' && content !== '')}>
            ??????
          </button>
          <div className="DictCardSubmitButton_2"></div>
        </div>
      </div>
      {doubleCheck === null && null}
      {doubleCheck === true && (
        <DoubleCheckModal title="???????????? ?????? ???????????????." question="?????? ???????????? ???????????????!" doubleCheck={doubleCheck} setDoubleCheck={setDoubleCheck}>
          <ConfirmButton _onClick={() => setDoubleCheck(null)}>??????</ConfirmButton>
        </DoubleCheckModal>
      )}
      {doubleCheck === false && (
        <DoubleCheckModal type="exist" title="?????? ????????? ???????????????." question="?????? ???????????? ??????????????????????" doubleCheck={doubleCheck} setDoubleCheck={setDoubleCheck}>
          <ConfirmButton _onClick={handleMoveDictList}>??????</ConfirmButton>
        </DoubleCheckModal>
      )}
      {showModal && (
        <ConfirmModal question="???????????? ????????? ??????????????????????" showModal={showModal} handleShowModal={handleShowModal} setShowModal={setShowModal}>
          <ConfirmButton _onClick={addDict}>??????</ConfirmButton>
        </ConfirmModal>
      )}
      <AlertModal showModal={showInputAlert}>?????? ????????? ??????????????????!</AlertModal>
      <AlertModal showModal={showDoubleCheckAlert}>?????? ???????????? ????????? ??????????????????!</AlertModal>
    </>
  )
}

export default DictWrite
