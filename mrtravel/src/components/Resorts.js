import React from "react";
import './resorts.css';

import SkeletonCard from './SkeletonCard.js';
import { SkeletonTheme } from 'react-loading-skeleton';
import UpdateURL from './UpdateURL.js';

export default function Resorts(){
    const[hotels, setHotels] = React.useState(null);

    // Fetch hotels from backend using API
    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const response = await fetch('/hotels/limit-1');
            const data = await response.json();
            setHotels(data)
            console.log('Fetched data:', data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Swipe carousel
    function swipe_carousel(direction){
        const carousel = document.querySelector('.carousel');
        const firstCardWidth = document.querySelector('.card1').offsetWidth;

        carousel.scrollLeft += direction === "left" ? -firstCardWidth : firstCardWidth;
    }

    // Show Hotel Details
    function showDetails(hotel_num){
        UpdateURL(`hotel/${hotel_num}`);
    }
    
    // Return the html content
    return (
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <div className="resorts-container">
            <span className="title">Entire City Of Choice</span>
            <div className="hotels-choices">
                <div className="carousel-wrapper">
                    <i id="left" className="fa-solid fa-circle-chevron-left arrow" onClick={() => swipe_carousel("left")}></i>
                    <ul className="carousel">
                        {(hotels != null) && hotels.map(hotel => {
                            return (
                                <li className="card card1" key={hotel.id} onClick={() => showDetails(hotel.id)}>
                                    <div className="hotel-img" style={{ backgroundImage: `url('${hotel.picture_url}')` }}>
                                        <div className="info">
                                            <span>{hotel.name}</span>
                                            <div className="add-hotel">
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="body">
                                        <div className="details">
                                            <span className="price">${hotel.room.price_per_day}.00</span>
                                            <span className="booking-id">Booking ID: 7595364</span>
                                            <span className="country">{hotel.country}</span>
                                        </div>
                                        <div className="secure-logo">
                                            <i className="fa-solid fa-house-lock"></i>
                                            <span>Secure</span>
                                        </div>
                                    </div>
                                </li>
                            )
                        }) || <SkeletonCard cards={4}/>}
                    </ul>
                    <i id="right" className="fa-solid fa-circle-chevron-right arrow" onClick={() => swipe_carousel("right")}></i>
                </div>
                <div className="blue-background"></div>
            </div>
        </div>
        </SkeletonTheme>
    )
}