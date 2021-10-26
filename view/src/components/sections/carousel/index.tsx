import styles from './styles.module.scss'
import { useEffect, useState } from 'react'

import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'

export function Carousel() {
  const [slideIndex, setSlideIndex] = useState(0)

  useEffect(() => {
    slideIndex > 300 && setSlideIndex(0);

    const interval = setInterval(() => {
      setSlideIndex(slideIndex + 100)
    }, 3000);
    return () => clearInterval(interval);
  }, [slideIndex])

  const slideData = [
    {
      banner: 'https://i.imgur.com/I4IfRQa.png'
    },
    {
      banner: 'https://c4.wallpaperflare.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-preview.jpg'
    },
    {
      banner: 'https://wp.radiojhero.com/wp-content/uploads/2020/10/6f7455b4f10b241ad463057762f3170f.jpg'
    },
    {
      banner: 'https://image.freepik.com/free-vector/flat-modern-organic-shapes-background_23-2148889929.jpg'
    }
  ]

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {slideData.map((slide, i) => (
          <div
            className={styles.item}
            key={i}
            style={{right: `${slideIndex}%`}}
          >
            <img src={slide.banner} alt="random banner" />
          </div>
        ))}
      </div>
      <button
        className={styles.previousBtnCarousel}
        onClick={() => setSlideIndex(slideIndex - 100)}
        disabled={slideIndex === 0 ? true : false}
      >
        <MdKeyboardArrowLeft />
      </button>
      <button
        className={styles.nextBtnCarousel}
        onClick={() => setSlideIndex(slideIndex + 100)}
        disabled={slideIndex === 300 ? true : false}
      >
        <MdKeyboardArrowRight />
      </button>
    </div>
  )
}