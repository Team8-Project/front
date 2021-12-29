import React from 'react'
import styled from 'styled-components'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiOutlineHeart } from 'react-icons/hi'

const MyPageOneImageCard = (props) => {
  const tempImgUrl = 'https://image.idus.com/image/files/92e848f447904facb3fb7fcf5b3cdf6a_1080.jpg'

  const [toggleMenu, setToggleMenu] = React.useState(false)

  const clickToggleMenu = () => {
    setToggleMenu(!toggleMenu)
  }

  return (
    <>
      <Wrapper>
        <div className="container">
          <ImageSection>
            <Image src={tempImgUrl} />
            <div>
              <button style={{ padding: '0' }} onClick={clickToggleMenu}>
                <BsThreeDotsVertical style={{ fontSize: '18px' }} />
              </button>
            </div>
          </ImageSection>
          <LikeSection>
            <button style={{ padding: '0 0 0 2px' }}>
              <HiOutlineHeart style={{ fontSize: '16px' }} />
            </button>
            <span style={{ fontSize: '9px', paddingLeft: '4px' }}>531</span>
          </LikeSection>
          <DateSection>
            <p style={{ fontSize: '9px', textAlign: 'right', paddingTop: '7px' }}>2021년 12월 28일</p>
          </DateSection>
        </div>
        {toggleMenu && <Menu></Menu>}
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  position: relative;
  max-width: 152.5px;
  width: 100%;
  height: 170px;
  padding: 8px;
  border: 1px solid #111;
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`

const Menu = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  width: 80px;
  height: 80px;
  border: 1px solid #c4c4c4;
  background-color: #fff;
  transition: 1s;
  z-index: 400;
`

const ImageSection = styled.div`
  display: flex;
`

const Image = styled.div`
  max-width: 118px;
  width: 100%;
  height: 106px;
  border: 1px solid #111;
  background-color: salmon;
  background-image: url('${(props) => props.src}');
  background-size: cover;
  background-position: center;
`

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0 0;
`

const DateSection = styled.div`
  height: 100%;
`

export default MyPageOneImageCard
