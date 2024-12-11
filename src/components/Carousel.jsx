function Carousel() {
    return (
        <>
            <div className="carousel">
                <div className="carousel-track">
                    <div className="carousel-item"><img src="img/kraven.jpeg" alt="Película 1" /></div>
                    <div className="carousel-item"><img src="img/PROMO.jpeg" alt="Película 2" /></div>
                    <div className="carousel-item"><img src="img/smile.jpeg" alt="Película 3" /></div>
                    <div className="carousel-item"><img src="img/Venom.jpeg" alt="Película 4" /></div>
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