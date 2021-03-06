import React from 'react'
import '../styles/css/DictRelatedYoutube.css'
import { styled } from '@mui/material/styles'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination, Navigation, Scrollbar } from 'swiper'

import 'swiper/swiper.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

const RelatedYoutube = ({ relatedVideo }) => {
  SwiperCore.use([Pagination, Navigation, Scrollbar])
  const [expanded, setExpanded] = React.useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  let hasVideo = relatedVideo.length !== 0

  const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }))

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
  }))

  return (
    <>
      <div className="DictRealatedYoutubeSection">
        <Accordion sx={{ backgroundColor: 'white' }} expanded={expanded === `panel${relatedVideo.dictId}`} onChange={handleChange(`panel${relatedVideo.dictId}`)}>
          <AccordionSummary className="expandIcon" expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
            <div className={expanded === `panel${relatedVideo.dictId}` ? 'DictRealatedYoutubeText' : 'DictRealatedYoutubeText'}>관련영상보기</div>
          </AccordionSummary>
          <AccordionDetails>
            <Swiper
              slidesPerView="auto"
              spaceBetween={16}
              keyboard={{
                enabled: true,
              }}
              slidesPerGroupSkip={1}
              grabCursor={true}
              scrollbar={false}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              freeMode={true}
              lazy={true}
              loop={false}
            >
              {relatedVideo.map((relatedVideo) => (
                <SwiperSlide className="DictRelatedYoutubeSwiper" key={relatedVideo.youtubeId}>
                  <div className="DictRelatedYoutubeList">
                    <img
                      className="DictRealatedYoutubeThumbNail"
                      src={relatedVideo.thumbNail}
                      onClick={() => {
                        window.open(`https://www.youtube.com/watch?v=${relatedVideo.youtubeId}`)
                      }}
                      alt="밈단어 관련 유튜브 동영상"
                    ></img>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </AccordionDetails>
          {hasVideo ? <div className="DictRealatedYoutubeGuide">영상으로 밈단어를 더 쉽게 익혀보세요!</div> : <div className="DictRealatedYoutubeGuide None">관련 영상이 없어요!</div>}
        </Accordion>
      </div>
    </>
  )
}

export default RelatedYoutube
