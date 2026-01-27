// import Swiper core and required modules
import {Autoplay, Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import slide1 from "../../img/Slide1.jpg";
import slide2 from "../../img/Slide2.jpg";
import slide3 from "../../img/Slide3.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default () => {
  return (
    <Swiper className="w-full"
    style={{
        '--swiper-navigation-color': 'rgba(255, 255, 255, .4)',
        '--swiper-pagination-color': '#fff',
      }}
      // install Swiper modules
      modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={50}
      slidesPerView={1}
      navigation={{hide: true}}
      pagination={{ clickable: true }}
      scrollbar={{enabled: false}}
    >
  <SwiperSlide><img src={slide1} className=" h-full w-full" alt="" /></SwiperSlide>
  <SwiperSlide><img src={slide2} className=" h-full w-full" alt="" /></SwiperSlide>
  <SwiperSlide><img src={slide3} className="h-full w-full" alt="" /></SwiperSlide>
    </Swiper>
  );
};
