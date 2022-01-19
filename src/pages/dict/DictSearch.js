import React, { useState, useEffect } from 'react'
import '../../styles/css/DictSearch.css'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../redux/ConfigureStore'
import styled from 'styled-components'
import { actionCreators as dictActions } from '../../redux/modules/dict'
import Pagination from 'rc-pagination'
import SearchPage from '../../shared/SearchPage'
import { dictApi } from '../../shared/api'
import Header from '../../components/Header'

const DictSearch = (props) => {
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)

  const keyword = props.match.params.keyword
  const [dictResult, setDictResult] = useState([])
  const [questionResult, setQuestionResult] = useState([])
  const [pageSize, setPageSize] = useState(10)
  const [totalCountDict, setTotalCountDict] = useState('')
  const [totalCountQnA, setTotalCountQnA] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const searchDictDB = async () => {
    let response = await dictApi.searchDict(keyword, pageSize, currentPage)
    // let searchTotalLength = await dictApi.tellMeTotalLengthSearch(keyword)

    setDictResult(response.data.data.dictResult)
    setQuestionResult(response.data.data.questionResult)
    setTotalCountDict(response.data.data.dictResult.length)
    setTotalCountQnA(response.data.data.questionResult.length)

    console.log(response)
    console.log(response.data.data.dictResult)
    console.log(response.data.data.questionResult)
    console.log(response.data.data.dictResult.length)
    console.log(response.data.data.questionResult.length)
  }

  React.useEffect(() => {
    searchDictDB(keyword)
    setShow(false)
  }, [currentPage])

  const showSearchBar = () => {
    if (show === false) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  const notResultDict = totalCountDict === 0
  const notResultQnA = totalCountQnA === 0

  return (
    <>
      <Header location="오픈 밈사전">
        <div
          className="DictPageSearchButton"
          onClick={() => {
            showSearchBar()
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
      </Header>
      <SearchBarSection>{show && <SearchPage />}</SearchBarSection>
      <div className="DictSearchPageLayout">
        <div className="DictSearchResultText">"{keyword}"에 대한 검색결과</div>
        <div className="DictSearchResultMemeSection">
          <div className="DictSearchResultMemeSection Text">오픈 밈 사전</div>
          <div className="DictSearchResultMemeSection List">
            {notResultDict ? (
              <div className="DictSearchListSection">
                <div className="DictSearchNoResult">검색결과가 없습니다</div>
              </div>
            ) : (
              ''
            )}
            {notResultDict ? <div className="DictSearchNoResultAddDictGuideText">새로운 단어를 직접 추가해주세요!</div> : ''}
            {notResultDict ? (
              ''
            ) : (
              <div className="DictSearchLists">
                {dictResult.map((dictResult) => (
                  <div className="DictSearchList" key={dictResult.id} onClick={() => history.push(`/dict/detail/${dictResult.dictId}`)}>
                    <div className="DictSearchList SearchDictListTitle">{dictResult.title}</div>
                    <div className="DictSearchList SearchDictListSummary">{dictResult.summary}</div>
                    <div className="DictSearchList SearchDictWriteInfo">
                      <div className="DictSearchList SearchDictListLikeButton">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="40px" fill="#000000">
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
                        </svg>
                      </div>
                      <div className="DictSearchList SearchDictListLikeCount">{dictResult.likeCount}</div>
                      <div className="DictSearchList SearchDictListFirstWriter">{dictResult.firstWriter}</div>
                      <div className="DictSearchList SearchDictListCreatedAt">{dictResult.createdAt.split('T', 1)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {notResultDict ? (
            <div className="DictSearchNoResult_AddDictButtonSection">
              <div
                className="DictSearchNoResult_AddDictButton"
                onClick={() => {
                  history.push('/dict/write')
                }}
              >
                <div className="DictSearchNoResult_AddDictButton_1">단어 추가</div>
                <div className="DictSearchNoResult_AddDictButton_2"></div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="DictSearchResultQnASection">
          <div className="DictSearchResultQnASection Text">궁금해요</div>
          <div className="DictSearchResultQnASection List">
            {notResultQnA ? (
              <div className="DictSearchListSection">
                <div className="DictSearchNoResult">검색결과가 없습니다</div>
              </div>
            ) : (
              ''
            )}
            {notResultQnA ? <div className="DictSearchNoResultAddDictGuideText">원하는 검색 결과가 없으신가요?</div> : ''}
            {notResultQnA ? (
              ''
            ) : (
              <>
                {questionResult.map((questionResult) => (
                  <div className="DictSearchLists">
                    <div className="DictSearchList" key={questionResult.id} onClick={() => history.push(`/dict/question/detail/${questionResult.questionId}`)}>
                      <div className="DictSearchList SearchDictListTitle">{questionResult.title}</div>
                      <div className="DictSearchList SearchDictListSummary">{questionResult.content}</div>
                      <div className="DictSearchList SearchDictWriteInfo">
                        <div className="DictSearchList SearchDictListLikeButton">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M2 4H0V18C0 19.1 0.9 20 2 20H16V18H2V4ZM18 0H6C4.9 0 4 0.9 4 2V14C4 15.1 4.9 16 6 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H6V2H18V14ZM11.51 8.16C11.92 7.43 12.69 7 13.14 6.36C13.62 5.68 13.35 4.42 12 4.42C11.12 4.42 10.68 5.09 10.5 5.65L9.13 5.08C9.51 3.96 10.52 3 11.99 3C13.22 3 14.07 3.56 14.5 4.26C14.87 4.86 15.08 5.99 14.51 6.83C13.88 7.76 13.28 8.04 12.95 8.64C12.82 8.88 12.77 9.04 12.77 9.82H11.25C11.26 9.41 11.19 8.74 11.51 8.16ZM10.95 11.95C10.95 11.36 11.42 10.91 12 10.91C12.59 10.91 13.04 11.36 13.04 11.95C13.04 12.53 12.6 13 12 13C11.42 13 10.95 12.53 10.95 11.95Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                        <div className="DictSearchList SearchDictListLikeCount">{questionResult.curiousTooCnt}</div>
                        <div className="DictSearchList SearchDictListFirstWriter">{questionResult.writer}</div>
                        <div className="DictSearchList SearchDictListCreatedAt">{questionResult.createdAt.split('T', 1)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {notResultQnA ? (
            <div className="DictSearchNoResult_AddDictButtonSection">
              <div
                className="DictSearchNoResult_AddDictButton"
                onClick={() => {
                  history.push('/dict/question/write')
                }}
              >
                <div className="DictSearchNoResult_AddDictButton_1">질문하기</div>
                <div className="DictSearchNoResult_AddDictButton_2"></div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

const SearchBarSection = styled.div`
  position: absolute;
  top: 74px;
  width: 100%;
  height: fit-content;
  z-index: 5;
`

export default DictSearch
