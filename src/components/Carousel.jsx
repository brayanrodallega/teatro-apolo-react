import { useEffect, useRef, useState } from 'react';
import '../styles/Carousel.css';

function Carousel() {
    const trackRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const track = trackRef.current;
        const items = Array.from(track.children);
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');
        const indicators = document.querySelectorAll('.indicator');

        nextButton.addEventListener('click', () => {
            setCurrentIndex((currentIndex + 1) % items.length);
        });

        prevButton.addEventListener('click', () => {
            setCurrentIndex((currentIndex - 1 + items.length) % items.length);
        });

        indicators.forEach((indicator, i) => {
            indicator.addEventListener('click', () => {
                setCurrentIndex(i);
            });
        });

        const interval = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % items.length);
        }, 5000);

        return () => {
            clearInterval(interval);
            nextButton.removeEventListener('click', () => {});
            prevButton.removeEventListener('click', () => {});
            indicators.forEach((indicator) => {
                indicator.removeEventListener('click', () => {});
            });
        };
    }, [currentIndex]);

    useEffect(() => {
        const track = trackRef.current;
        const items = Array.from(track.children);
        const indicators = document.querySelectorAll('.indicator');
        const width = items[currentIndex].getBoundingClientRect().width;
        track.style.transform = 'translateX(-' + (width * currentIndex) + 'px)';
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentIndex);
        });
    }, [currentIndex]);

    return (
        <>
            <div className="carousel">
                <div className="carousel-track" ref={trackRef}>
                    <div className="carousel-item"><img src="https://images.hdqwalls.com/download/the-batman-2020-movie-poster-5k-gg-2560x1600.jpg" alt="Película 1" /></div>
                    <div className="carousel-item"><img src="https://wallpaper.dog/large/10915262.jpg" alt="Película 2" /></div>
                    <div className="carousel-item"><img src="https://getwallpapers.com/wallpaper/full/9/9/a/1283451-movie-wallpapers-for-desktop-1920x1080-free-download.jpg" alt="Película 3" /></div>
                    <div className="carousel-item"><img src="https://wallpapercave.com/wp/wp9049807.jpg" alt="Película 4" /></div>
                </div>
                <button className="carousel-button prev" aria-label="Previous">&lt;</button>
                <button className="carousel-button next" aria-label="Next">&gt;</button>
            </div>
            
            <div className="carousel-indicators">
                <div className="indicator active"></div>
                <div className="indicator"></div>
                <div className="indicator"></div>
                <div className="indicator"></div>
            </div>
        </>
    );
}

export default Carousel;