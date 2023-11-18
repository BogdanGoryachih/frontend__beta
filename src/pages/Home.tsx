import { FC} from "react"
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { EffectCoverflow, Pagination, Navigation} from 'swiper/modules'
import slide_image_1 from '../assets/image/viti_3440_1.jpg'
import slide_image_2 from '../assets/image/viti_3468_1.jpg'
import { NavigationOptions } from "swiper/types";

const Home: FC = () => {
	return (
		<div className="container">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true as boolean,
        }as NavigationOptions
	}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={slide_image_1} alt="slide_image" />
        </SwiperSlide>
		<SwiperSlide>
          <img src={slide_image_1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide_image_2} alt="slide_image" />
        </SwiperSlide>
		
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
		      <h1><svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg></h1>
          </div>
          <div className="swiper-button-next slider-arrow">
		      <h1><svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M268 112l144 144-144 144M392 256H100"/></svg></h1>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
	)
}

export default Home
