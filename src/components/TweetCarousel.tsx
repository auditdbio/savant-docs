import React, { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Tweet } from 'react-tweet';
import BrowserOnly from '@docusaurus/BrowserOnly';

// Твиты, которые будут отображаться в карусели
const tweetIds = [
  '1897264142308008089', // @pessimistic_io
  '1895228438237061588', // @skywinder

];

// Настройки для слайдера
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  adaptiveHeight: true,
  arrows: true,
};

export default function TweetCarousel() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900">What Our Users Say</h2>
          <p className="mt-4 text-xl text-secondary font-semibold">Real Feedback from the Community</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Используем BrowserOnly, чтобы компонент рендерился только на стороне клиента */}
          <BrowserOnly>
            {() => (
              <Slider {...sliderSettings} className="tweet-carousel">
                {tweetIds.map((id) => (
                  <div key={id} className="tweet-slide px-4 py-6">
                    <div className="mx-auto max-w-lg bg-gray-50 p-6 rounded-lg shadow-md">
                      <Tweet id={id} />
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </BrowserOnly>
        </div>
      </div>
    </section>
  );
} 