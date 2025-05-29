import React, { useState } from 'react'
import { IoIosArrowBack , IoIosArrowForward  } from 'react-icons/io';

const Carousel = ({slides}) => {



    const [currentImage, setCurrentImage] = useState(0)

    let lastSlide = () => {        
        if (currentImage === 0) {
            setCurrentImage(slides.length - 1)
        } else {
            setCurrentImage(currentImage - 1)
        }
    }

    let nextSlide = () => {
        if (currentImage === slides.length-1) {
            setCurrentImage(0)
        } else {
            setCurrentImage(currentImage + 1)
        }
    }

    return (
        <>
            <div className='overflow-hidden relative'>

                <div className='flex transition duration-40 my-5 mx-5'
                style={{
                    transform:`translateX(-${currentImage * 100}%)`
                }}
                >
                    {slides.map((s) => {
                        return <img src={s} />

                    })}

                </div>

                <div className='absolute top-0 h-full w-full justify-between items-centre flex text-gray-800 px-5 text-4xl'>
                    <button onClick={lastSlide}>
                        <IoIosArrowBack  />
                    </button>
                    <button onClick={nextSlide}>
                        <IoIosArrowForward  />
                    </button>
                </div>

            </div>
        </>
    )
}

export default Carousel
