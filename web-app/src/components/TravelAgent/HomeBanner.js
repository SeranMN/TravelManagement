import React from 'react'
import ImageSlider from './SlideShow/ImageSlider'
import { SliderData } from './SlideShow/SliderData'

const HomeBanner = () => {
    return (
        <>
            <ImageSlider slides={SliderData} />
        </>
    )
}

export default HomeBanner