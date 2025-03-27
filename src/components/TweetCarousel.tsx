import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import StaticTweet from "./StaticTweet";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useGlobalData from "@docusaurus/useGlobalData";

// Function to detect if the device is mobile or if screen width is below threshold
function useIsMobile() {
  const [screenInfo, setScreenInfo] = useState({
    isMobile: false,
    isLessThan800: false,
  });

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkScreenSize = () => {
        setScreenInfo({
          isMobile: window.innerWidth < 768,
          isLessThan800: window.innerWidth < 800,
        });
      };

      // Initial check
      checkScreenSize();

      // Add event listener for window resize
      window.addEventListener("resize", checkScreenSize);

      // Cleanup event listener
      return () => window.removeEventListener("resize", checkScreenSize);
    }
    return () => {}; // Return empty function if server-side
  }, []);

  return screenInfo;
}

interface TweetCarouselProps {
  tweetIds: string[];
}

interface GlobalData {
  "docusaurus-plugin-tweets"?: {
    default: {
      tweetIds: string[];
      cachedTweets: Record<string, any>;
    };
  };
}

// Function to check if tweet data is valid
function isValidTweetData(tweet: any): boolean {
  if (!tweet) return false;

  // Check for basic required fields
  if (!tweet.id && !tweet.id_str) return false;

  // Tweet must have either text content or full_text
  if (!tweet.text && !tweet.full_text) return false;

  // Tweet must have user information
  if (!tweet.user) return false;

  // User must have screen_name
  if (!tweet.user.screen_name) return false;

  return true;
}

export default function TweetCarousel({ tweetIds }: TweetCarouselProps) {
  const { siteConfig } = useDocusaurusContext();
  const globalData = useGlobalData() as GlobalData;
  const { isMobile, isLessThan800 } = useIsMobile();

  // Always use strict mode - only show tweets from cache
  const strictMode = true;
  const cachedTweets =
    globalData["docusaurus-plugin-tweets"]?.default?.cachedTweets || {};

  // Filter tweet IDs based on cache availability
  const filteredTweetIds = tweetIds.filter((id) => {
    const tweet = cachedTweets[id];
    const isValid = tweet && isValidTweetData(tweet);
    return isValid;
  });

  if (filteredTweetIds.length === 0) {
    return null;
  }

  // Adjust slider settings based on device
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
    fade: !isMobile, // Disable fade effect on mobile for better performance
    cssEase: "ease-out",
    arrows: isLessThan800 ? false : true, // Hide arrows on screens smaller than 800px
    swipe: true,
    swipeToSlide: true,
    touchMove: true,
    touchThreshold: 10,
    centerMode: false, // Don't use centerMode as we're centering with CSS
    className: "center-tweet-slide",
  };

  return (
    <section className="bg-white py-8 md:py-20">
      <div className="mx-auto px-3 sm:px-4 md:px-6 lg:px-8 max-w-full md:max-w-7xl">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
            What Our Users Say
          </h2>
          <p className="mt-2 md:mt-4 text-lg md:text-xl text-secondary font-semibold">
            Real Feedback from the Community
          </p>
        </div>

        <div className="mx-auto max-w-full md:max-w-4xl tweet-carousel-container">
          <Slider {...sliderSettings} className="tweet-carousel">
            {filteredTweetIds.map((tweetId) => (
              <div key={tweetId} className="px-2 md:px-4 tweet-slide-wrapper">
                <div className="tweet-slide-content">
                  <StaticTweet tweetId={tweetId} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
