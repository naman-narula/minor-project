import React, { useEffect, useState } from 'react';
import Navbar from '../nav/Navbar';
import Footer from '../footer/Footer';
import { checkPrice, requestApproval } from '../../apiCalls/auth';
import './lend.scss';
import '../Home/home.scss';
import { VpnKeyTwoTone, ThumbUp, FavoriteTwoTone, CreditCardTwoTone } from '@material-ui/icons';
import { Checkbox, FormControlLabel, Snackbar, Alert } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import PriceApproval from '../Price Approval';
import { Redirect } from 'react-router';

const BrandDropDown = [
    'audi',
    'bmw',
    'chevrolet',
    'fiat',
    'ford',
    'honda',
    'hyundai',
    'jaguar',
    'jeep',
    'kia',
    'land rover',
    'mercedes-benz',
    'mitsubishi',
    'nissan',
    'tesla',
    'toyota',
    'volkswagen',
    'volvo'
];
const fuelDropDown = ['gas', 'other', 'diesel', 'hybrid', 'electric'];

function RentCar(props) {
    const [car, setCar] = useState({
        brand: '',
        year: '',
        price: '',
        fuel: 'gas',
        odometer: '',
        drive: 'rwd',
        demandPrice: ''
    });
    const [shouldShowPriceApproval, setShouldShowPriceApproval] = useState(false);
    const [approval, setApproval] = useState({
        liked: false,
        dislike: false
    });
    const [priceLoading, setIsPriceLoading] = useState(false);
    const [carId, setCarId] = useState(-1);
    const [alert, setAlert] = useState({ message: '', shouldShowAlert: false });

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (approval.liked) {
            setRedirect(true);
        }
    }, [approval]);

    function handleThumbsClick(event, keyName) {
        setApproval({ [keyName]: !approval[keyName] });
    }

    function handlePhoto(event) {
        console.log(event.target.files);
        if (event.target.name === 'photo') {
            setCar({ ...car, photo: event.target.files[0] });
        }
        if (event.target.name === 'rc') {
            setCar({ ...car, rc: event.target.files[0] });
        }
    }

    function handleChange(event) {
        if (event.target.name === 'drive') {
            console.log(event.target.checked);
            setCar({ ...car, drive: event.target.checked ? '4wd' : 'rwd' });
        } else {
            setCar({ ...car, [event.target.name]: event.target.value });
        }
        console.log(car);
    }

    function handleSubmit(event, actionType) {
        event.preventDefault();
        // localStorage.removeItem('car_image')
        setCar({ ...car, submitted: false, loading: true });
        let form = new FormData();
        form.append('brand', car.brand);
        form.append('year', car.year);
        form.append('fuel', car.fuel);
        form.append('odometer', car.odometer);
        form.append('drive', car.drive);
        if (actionType === 'approval') {
            const requestBody = {
                detailid: carId,
                user_price: car.demandPrice
            };
            requestApproval(JSON.stringify(requestBody)).then((res) =>
                setAlert({ shouldShowAlert: true, message: res.message })
            );
            setTimeout(() => {
                setShouldShowPriceApproval(false);
            }, 3000);
        } else {
            setIsPriceLoading(true);
            checkPrice(form).then((res) => {
                setCar({ ...car, price: res.price });
                setShouldShowPriceApproval(true);
                setIsPriceLoading(false);
                setCarId(res.detailid);
            });
        }
    }

    return (
        <div>
            <Navbar {...props} />
            <section className='rent-car-container'>
                <div className="rent-image">
                    <div className="rent-header">
                        <h1>Rent your car with us!</h1>
                        <h3>
                            Cars in good condition can be found at reasonable prices. Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Autem, ullam!
                        </h3>
                    </div>
                </div>

                <div className="below-rent-img">
                    <h1>The only app you need.</h1>
                    <div className="features">
                        <div className="feature">
                            <VpnKeyTwoTone />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus delectus
                                laboriosam cumque vel tempora at et facilis quidem temporibus est?
                            </p>
                        </div>
                        <div className="feature">
                            <ThumbUp />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio corrupti
                                veritatis voluptatum alias non ipsam beatae, nobis inventore adipisci illum?
                            </p>
                        </div>
                        <div className="feature">
                            <FavoriteTwoTone />
                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem, quo dolore
                                nobis doloribus iure reprehenderit reiciendis possimus! Vel, cum doloremque.
                            </p>
                        </div>
                        <div className="feature">
                            <CreditCardTwoTone />
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta magni excepturi
                                amet vel cumque cum facilis dolorum voluptatem sint quos.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="car-form-container">
                    <form method="post" className="car-page-form">
                        <select
                            variant="outlined"
                            labelId="category-select"
                            id="demo-simple-select-outlined"
                            className="car-inputs"
                            name="brand"
                            onChange={handleChange}
                            value={car.brand}
                        >
                            <option value="" disabled>
                                {' '}
                                Select Car Manufacturer
                            </option>
                            {BrandDropDown.map((brand) => (
                                <option
                                    value={brand}
                                    label={brand[0].toUpperCase() + brand.substr(1).toLowerCase()}
                                />
                            ))}
                        </select>
                        <select
                            variant="outlined"
                            labelId="category-select"
                            id="demo-simple-select-outlined"
                            className="car-inputs"
                            name="fuel"
                            onChange={handleChange}
                            value={car.fuel}
                        >
                            {fuelDropDown.map((fuel) => (
                                <option
                                    value={fuel}
                                    label={fuel[0].toUpperCase() + fuel.substr(1).toLowerCase()}
                                />
                            ))}
                        </select>
                        <input
                            type="number"
                            className="car-inputs"
                            id="purchase-year"
                            name="year"
                            placeholder="Year of purchase"
                            onChange={handleChange}
                            required
                            value={car.year}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={handleChange}
                                    name="drive"
                                    value={car.drive}
                                    checked={car.drive === '4wd'}
                                />
                            }
                            label="4 Wheel Drive"
                        />

                        <input
                            type="number"
                            className="car-inputs"
                            placeholder="Odometer Reading"
                            name="odometer"
                            onChange={handleChange}
                            required
                            value={car.odometer}
                        />

                        {/* {!car.photo ? (
                        <label htmlFor="car-photo" id="photo-label">
                            {localStorage.getItem('car_image')}
                        </label>
                    ) : (
                        <label htmlFor="car-photo" id="photo-label">
                            Choose car photo
                        </label>
                    )}
                    <label for="car-photo">Car Photo</label>
                    <input
                        type="file"
                        className="car-inputs"
                        id="car-photo"
                        name="photo"
                        onChange={handlePhoto}
                    />
                    <label for="car-rc">Car Registration </label>
                    <input type="file" className="car-inputs" id="car-rc" name="rc" onChange={handlePhoto} /> */}
                    </form>
                    <LoadingButton
                        loading={priceLoading}
                        type="submit"
                        className="car-submit"
                        onClick={handleSubmit}
                        loadingIndicator={
                            <CircularProgress color="primary" size={40} style={{ color: '#fff' }} />
                        }
                        disabled={priceLoading || alert.shouldShowAlert}
                    >
                        Check Price
                    </LoadingButton>
                    <div className='break-rent-car'></div>
                    {shouldShowPriceApproval && (
                        <>
                            <PriceApproval
                                offeredprice={car.price}
                                handleClick={handleThumbsClick}
                                approval={approval}
                                handleChange={handleChange}
                            />
                            {approval.dislike && (
                                <button
                                    type="submit"
                                    className="car-submit"
                                    onClick={(e) => handleSubmit(e, 'approval')}
                                >
                                    Request Approval
                                </button>
                            )}
                        </>
                    )}
                    {/* {approval.liked && <Redirect to={{ pathname: '/dashboard', state: { car, carId } }} />} */}
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        open={alert.shouldShowAlert}
                        autoHideDuration={5000}
                        onClose={() => setAlert({ ...alert, shouldShowAlert: false })}
                    >
                        <Alert severity="info">{alert.message}</Alert>
                    </Snackbar>
                    {redirect && (
                        <Redirect
                            to={{
                                pathname: '/car-rent-form',
                                state: { brand: car.brand, carId, year: car.year }
                            }}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}

export default RentCar;
