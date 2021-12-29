import React, { useEffect, useState } from 'react';
import Navbar from '../nav/Navbar';
import './home.scss';
import { Link } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { getCities } from '../../apiCalls/auth';
import Footer from '../footer/Footer';
import {
    AttachMoneyTwoTone,
    LocationCityTwoTone,
    EmojiEventsTwoTone,
    EmojiTransportationTwoTone
} from '@material-ui/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import CarSvg from '../../assets/undraw_order_ride.svg';
import { BounceLoader } from 'react-spinners';
import { css } from '@emotion/core';
const override = css`
    display: block;
    margin: 0 auto;
`;

const Home = (props) => {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getCities().then((data) => {
            data = data
                .filter((obj) => {
                    return obj['is_active'] === true;
                })
                .map((obj) => {
                    return obj.name;
                });
            setCities(data);
            setLoading(false);
        });
    }, []);

    return (
        <>
            <div>
                <Navbar {...props} />
                {loading && (
                    <div className="loader">
                        <BounceLoader css={override} size={100} color={'#FFAFBD'} loading={loading} />
                    </div>
                )}
                {!loading && (
                    <div className="home-page">
                        <div className="home-image">
                            <div className="home-header">
                                <h1>Welcome to CarHub</h1>
                                <h3>
                                    We are the solution to your urge of travelling. Travel with carhub to find
                                    the best of kinds of cars from micro to luxury. Also earn money by using
                                    our rental services for your benefit by lending your own car for rent.
                                </h3>
                                <Link to="/getride" className="button-1">
                                    Book a ride!
                                </Link>
                            </div>
                        </div>
                        <div className="card-list">
                            <Paper elevation={3}>
                                <LocationCityTwoTone />
                                <h2>OVER EIGHT CITIES</h2>
                            </Paper>
                            <Paper elevation={3}>
                                <EmojiEventsTwoTone />
                                <h2>TRUSTED SERVICE</h2>
                            </Paper>
                            <Paper elevation={3}>
                                <AttachMoneyTwoTone />
                                <h2>NO EXTRA CHARGES</h2>
                            </Paper>
                            <Paper elevation={3}>
                                <EmojiTransportationTwoTone />
                                <h2>DAMAGE INSURANCE</h2>
                            </Paper>
                        </div>
                        <div className="about-here">
                            <h1 style={{ fontWeight: '200' }}>
                                What is <em style={{ color: '#c354ab', fontWeight: '400' }}>CarHub?</em>
                            </h1>
                            <h3>
                                It is an online car rental system that provides a platform to its customers to
                                travel to their destinations.
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut maxime repellendus
                                ipsum minus nulla velit voluptates necessitatibus quisquam animi, delectus
                                adipisci sint officiis harum, nobis accusantium reprehenderit, unde sapiente
                                tempora laudantium commodi laborum amet. Fuga beatae culpa odit dignissimos,
                                cum eligendi hic praesentium quae delectus dolorum possimus dolores ipsam
                                aliquam. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias quae
                                velit, tenetur non veritatis at maiores sequi provident. Quis eius ducimus,
                                corporis laboriosam error maiores, nobis a facilis magnam quas nihil nisi
                                aperiam, ipsam voluptates? Neque ullam aspernatur nulla dolores aut vel dolor!
                                Aliquid ipsam obcaecati impedit sapiente? Asperiores, natus.
                            </p>
                        </div>
                        <h1 style={{ textAlign: 'center' }}>
                            Your one stop to every destination is{' '}
                            <span style={{ color: '#c354ab', fontWeight: '400' }}>CarHub</span>
                        </h1>
                        <div className="button-section">
                            <div>
                                <img className="car-img" src={CarSvg} alt="" />
                            </div>
                            <div className="btn-pair">
                                <button className="home-btns" onClick={() => props.history.push('/getride')}>
                                    Get Ride!
                                </button>
                                <button className="home-btns" onClick={() => props.history.push('/rentcar')}>
                                    Rent your car!
                                </button>
                            </div>
                        </div>
                        <div className="city-section-background">
                            <div className="city-section">
                                <h1 id="city-head">Cities we serve!</h1>
                                <hr
                                    style={{
                                        width: '40%'
                                    }}
                                />

                                <div className="cities-list">
                                    <CityList cities={cities} />
                                </div>
                                <hr
                                    style={{
                                        width: '40%'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer {...props} />
        </>
    );
};
export default Home;

class CityList extends React.Component {
    render() {
        const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 0
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <Slider {...settings}>
                {this.props.cities.map((city, index) => {
                    return (
                        <div key={index} className="cities">
                            <p>{city}</p>
                        </div>
                    );
                })}
            </Slider>
        );
    }
}
