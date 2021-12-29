import React, { useEffect, useState } from 'react';
import Navbar from '../nav/Navbar';
import Autocomplete from '@mui/material/Autocomplete';
import Tile from '../styled.components/CarTile';
import { TextField } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import { rideCar, getCities, getPhoto } from '../../apiCalls/auth';
import './ride.scss';
import { css } from '@emotion/core';
import { ClipLoader } from 'react-spinners';
import { Redirect } from 'react-router';
import { DatePicker, LoadingButton } from '@mui/lab';
import moment from 'moment';
import Footer from '../footer/Footer';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

function Ride(props) {
    const [cities, setCities] = useState([]);
    const [allcars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [redirectDashBoard, setRedirectToDashBoard] = useState(false);
    // const [selectedCity, setSelectedCity] = useState('')
    const [url, setUrl] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const [bookingDetails, setBookingDetails] = useState({
        fromDate: moment().toISOString(),
        toDate: moment().add(3, 'day').toISOString(),
        city: ''
    });
    const [carLoading, setCarLoading] = useState(false);

    const [isValid, setisValid] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCities()
            .then((allcities) => {
                setCities(allcities);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        let userDetails = localStorage.getItem('user');
        userDetails = JSON.parse(userDetails);
        console.log(userDetails);
        if (!userDetails || !userDetails?.['is_valid_rider']) {
            setRedirectToDashBoard(true);
        } else {
            setRedirectToDashBoard(false);
        }
    }, []);

    useEffect(() => {
        setisValid(true);
        for (let key in bookingDetails) {
            if (!bookingDetails[key]) {
                setisValid(false);
                break;
            }
        }
    }, [bookingDetails]);

    function handleSubmit(event) {
        setCarLoading(true);
        rideCar(bookingDetails).then((res) => {
            setFilteredCars(res.data);
            setCarLoading(false);
        });
    }

    if (redirectDashBoard) {
        return <Redirect to="/dashboard" />;
    } else {
        return (
            <>
                <div>
                    <Navbar {...props} />
                    {loading && (
                        <div className="loader">
                            <ClipLoader css={override} size={150} color={'#123abc'} loading={loading} />
                        </div>
                    )}
                    {!loading && (
                        <div>
                            <div className="ride-page-top">
                                <div className="ride-header">
                                    <h1>
                                        Your ultimate solution <br /> to easy travels!
                                    </h1>
                                    <h3>
                                        Book your ride here. <br /> You have the chance to drive yourself{' '}
                                        <br /> to your dream destination and we <br /> are here to help you.
                                    </h3>
                                </div>
                                <div className="circle">
                                    <div className="inside-circle"></div>
                                </div>
                            </div>
                            <div className="ride-page-cities-container">
                                <div className="ride-page-cities">
                                    <h1>Select City</h1>
                                    <Autocomplete
                                        id="controllable-states-demo"
                                        value={bookingDetails.city}
                                        onChange={(event, newValue) => {
                                            setBookingDetails({ ...bookingDetails, city: newValue });
                                        }}
                                        inputValue={inputValue}
                                        onInputChange={(event, newInputValue) => {
                                            setInputValue(newInputValue);
                                        }}
                                        options={cities}
                                        getOptionLabel={(option) => option.name ?? ''}
                                        style={{ width: 300 }}
                                        // onClick={() => setSelectedCity(option._id)}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Select city" variant="outlined" />
                                        )}
                                    />
                                </div>
                                <div>
                                    <h1>Select Start Date</h1>
                                    <DatePicker
                                        inputFormat="DD/MM/YYYY"
                                        label="From Date"
                                        value={bookingDetails.fromDate}
                                        onChange={(newValue) => {
                                            setBookingDetails({
                                                ...bookingDetails,
                                                fromDate: moment(newValue).toISOString()
                                            });
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>{' '}
                                <div>
                                    <h1>Select End Date</h1>
                                    <DatePicker
                                        label="To Date"
                                        inputFormat="DD/MM/YYYY"
                                        value={bookingDetails.toDate}
                                        onChange={(newValue) => {
                                            console.log(newValue);
                                            setBookingDetails({
                                                ...bookingDetails,
                                                toDate: moment(newValue).toISOString()
                                            });
                                        }}
                                        minDate={moment(bookingDetails.fromDate)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                            </div>
                            <div className="width-control-ride">
                                <LoadingButton
                                    id="button"
                                    loading={carLoading}
                                    loadingIndicator={
                                        <CircularProgress
                                            color="primary"
                                            size={40}
                                            style={{ color: '#fff' }}
                                        />
                                    }
                                    onClick={handleSubmit}
                                    disabled={!isValid}
                                >
                                    Find Cars
                                </LoadingButton>
                            </div>
                            <div>
                                {filteredCars.length > 0 && (
                                    <>
                                        <hr />
                                        <h1 style={{ marginLeft: '10%' }}>Available Rides</h1>
                                    </>
                                )}

                                {filteredCars.map((car, index) => (
                                    <Tile
                                        key={index}
                                        value={car.id}
                                        car={car}
                                        bookingDetails={bookingDetails}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <Footer {...props} />
            </>
        );
    }
}
export default Ride;
