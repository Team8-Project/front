import React from 'react'
import styled from 'styled-components'

import Grid from '../elements/Grid'
import MemegleIcon from '../styles/image/smileIcon_Yellow.png'

const OneRankCard = () => {
  return (
    <>
      <OneRankBox>
        <div className="rank">1</div>
        <Grid flex_center column>
          <ProfileImage src={MemegleIcon} />
          <div className="rank-nickname">닉네임</div>
        </Grid>
        <div className="rank-dict-qty">
          <span className="highlight">n개</span> 등록했어요!
        </div>
      </OneRankBox>
    </>
  )
}

const OneRankBox = styled.div`
  width: 160px;
  height: 160px;
  margin-right: 16px;
  padding: 8px 12px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px 4px hsl(0deg 0% 64% / 25%);
  display: flex;
  flex-direction: column;
  .rank {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    /* color: ${({ theme }) => theme.colors.blue}; */
  }

  .rank-nickname {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 500;
    padding: 5px 0;
  }

  .rank-dict-qty {
    font-size: ${({ theme }) => theme.fontSizes.base};
    text-align: center;
    .highlight {
      font-weight: 700;
      background-image: linear-gradient(transparent 75%, #6698fc 25%);
    }
  }
`

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-size: cover;
  background-image: url('${(props) => props.src}');
  background-position: center;
  background-color: ${({ theme }) => theme.colors.white};
`

export default OneRankCard
