import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  return (
    <div className="text-white">
      <div className="my-[50px] w-full max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full !items-stretch"
        >
          {reviews.length === 0 ? (
            <p className="text-center text-richblack-200">No reviews yet</p>
          ) : (
            reviews.map((review, i) => (
              <SwiperSlide key={i} className="!h-auto flex">
                <div className="flex flex-col justify-between w-full rounded-lg bg-richblack-800 p-4 text-[14px] text-richblack-25 shadow-md">
                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">
                        {`${review?.user?.firstName ?? ""} ${review?.user?.lastName ?? ""}`}
                      </h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="my-3 max-h-[80px] overflow-y-auto pr-1 font-medium text-richblack-25">
                    {review?.review?.split(" ").length > truncateWords
                      ? `${review?.review
                          ?.split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : review?.review}
                  </p>

                  {/* Rating */}
                  <div className="mt-auto flex items-center gap-2">
                    <h3 className="font-semibold text-yellow-100">
                      {review?.rating ? review.rating.toFixed(1) : "0.0"}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review?.rating || 0}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
