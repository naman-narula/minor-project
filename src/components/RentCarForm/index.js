import React, { useState, useEffect } from 'react';
import css from './RentCarForm.module.scss';
import Navbar from '../nav/Navbar';
import Footer from '../footer/Footer';
import { getCitiesAndCategory, RentCar } from '../../apiCalls/auth';
import { Snackbar, Alert } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

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
export default function CarRentForm(props) {
    const [pageData, setPageData] = useState({ cities: [], categories: [], userData: [] });
    const [car, setCar] = useState({
        brand: props.location.state.brand ?? '',
        modelName: '',
        category: '',
        year: props.location.state.year ?? '',
        city: '',
        detail_id: props.location.state.carId,
        photo: '',
        rc: ''
    });

    const [fileName, setFileName] = useState({ carPhoto: '', carRc: '' });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ shouldShowAlert: false, message: '' });
    const [redirect,setRedirect] = useState(false)

    useEffect(() => {
        getCitiesAndCategory().then((res) =>
            setPageData({ cities: res.city, categories: res.category, userData: [] })
        );
    }, []);

    function handleChange(event) {
        setCar({ ...car, [event.target.name]: event.target.value });
    }
    function handlePhoto(event) {
        console.log(event.target.files);
        if (event.target.name === 'photo') {
            setCar({ ...car, photo: event.target.files[0] });
            setFileName({ ...fileName, carPhoto: event.target.files[0].name });
        }
        if (event.target.name === 'rc') {
            setCar({ ...car, rc: event.target.files[0] });
            setFileName({ ...fileName, carRc: event.target.files[0].name });
        }
    }
    function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();
        const formData = new FormData();
        for (let key in car) {
            formData.append(key, car[key]);
        }
        RentCar(formData).then((res) => {
            setLoading(false);
            setAlert({ shouldShowAlert: true, message: 'Car Added Thanks For Renting' });
        });
    }
    return (
        <>{redirect && <Redirect to ='/'/>}
            <Navbar {...props} />
            <section className={css.rentCarContainer}>
                <form className={css.carForm}>
                    <div className="form-group">
                        <label>Car Brand</label>
                        <select
                            className="select-css"
                            type="text"
                            name="brand"
                            value={car.brand}
                            onChange={handleChange}
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
                    </div>
                    <div className="form-group">
                        <label>Model Name</label>
                        <input
                            className="input-css"
                            type="text"
                            name="modelName"
                            value={car.modelName}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <select className="select-css" name="city" value={car.city} onChange={handleChange}>
                            <option value="" disabled selected>
                                Select City
                            </option>
                            {pageData.cities.map((city) => (
                                <option value={city.id} label={city.name} />
                            ))}
                        </select>
                    </div>
                    <div>
                        <select
                            className="select-css"
                            name="category"
                            value={car.category}
                            onChange={handleChange}
                        >
                            <option value="" disabled selected>
                                Select Category
                            </option>
                            {pageData.categories.map((category) => (
                                <option value={category.id} label={category.name} />
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Car Purchased Year</label>
                        <input
                            className="input-css"
                            type="number"
                            name="year"
                            value={car.year}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label className={`custom-file-upload ${css.widthControl}`} for="car-photo">
                            <i class="fa fa-cloud-upload"></i>
                            {'       '}Car Photo
                        </label>
                        {fileName.carPhoto}
                        <input type="file" id="car-photo" name="photo" onChange={handlePhoto} />
                    </div>
                    <div className="form-group">
                        <label className={`custom-file-upload ${css.widthControl}`} for="car-rc">
                            <i class="fa fa-cloud-upload"></i>
                            {'   '}Car Registration
                        </label>
                        {fileName.carRc}
                        <input type="file" id="car-rc" name="rc" onChange={handlePhoto} />
                    </div>
                    <div className='width-control-ride'>
                        <LoadingButton
                            loading={loading}
                            id="button"
                            onClick={handleSubmit}
                            loadingIndicator={
                                <CircularProgress color="primary" size={40} style={{ color: '#fff' }} />
                            }
                            disabled={loading||alert.shouldShowAlert}
                        >
                            Upload Car
                        </LoadingButton>
                    </div>
                </form>
            </section>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={alert.shouldShowAlert}
                autoHideDuration={5000}
                onClose={() => {setAlert({ ...alert, shouldShowAlert: false });setRedirect(true)}}
            >
                <Alert severity="info">{alert.message}</Alert>
            </Snackbar>
            <Footer {...props} />
        </>
    );
}
