import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './tile.scss';
import Date from './Date';
import ConfirmOrder from './Tile';
import moment from 'moment';
import { BookCar, Payment } from '../../apiCalls/auth';

function CarTile(props) {
    const [htmlDoc, setHtmlDoc] = useState('');
    // const values = {
    //   brand: props.car.brand,
    //   model: props.car.modelName,
    //   category: props.car.category.name,
    //   city: props.car.city.name,
    //   price: props.car.price,
    //   year: props.car.year,
    //   url: props.url
    // }
    // const [step, setStep] = useState(1)
    // const nextStep = () => {
    //   setStep(prev => prev + 1)
    // }
    // const prevStep = () => {
    //   setStep(next => next - 1)
    // }
    async function handleClick() {
        const formData = new FormData();
        formData.append('from', props.bookingDetails.fromDate);
        formData.append('to', props.bookingDetails.toDate);
        formData.append(
            'price',
            moment(props.bookingDetails.toDate).diff(moment(props.bookingDetails.fromDate), 'days') *
                props.car.details__price_by_model
        );
        const response = await BookCar(props.car.id, formData);
        window.open('http://localhost:8000/static/paytm1.html', '_blank');
    }

    // eslint-disable-next-line default-case
    // switch(step) {
    //   case 1:
    return (
        <div className="tile-container">
            <Grid container>
                <Grid item sm={12} md={5} className="car-thumbnail">
                    <img src={props.car.photo} alt="thumbnail" className="car-tile" />
                </Grid>
                <Grid item sm={12} md={7} className="car-text">
                    <div style={{ margin: '40px 50px', marginLeft: '50px' }}>
                        <h1 className="car-name">
                            {props.car.brand[0].toUpperCase() + props.car.brand.substring(1)}{' '}
                            {props.car.modelName}
                        </h1>
                        <h3 className="car-category"> {props.car?.category?.name ?? ''} </h3>
                        <h3 className="car-year"> {props.car.year} </h3>
                        <h3 className="discount">Special Price</h3>
                        <div className="car-tile-order-button">
                            <h3 className="car-price">₹ {props.car.details__price_by_model}</h3>
                            <div style={{ width: '200px', marginBottom: '20px',marginLeft:'auto',marginRight:'40%' }}>
                                <Link
                                    to={{
                                        pathname: '/payment',
                                        state: { booking: props.bookingDetails, car: props.car }
                                    }}
                                >
                                    <button id="button" className="date-btn">
                                        Book your ride
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>

            {/* {
            steps === 1 && <Date step={steps} />
          } */}
        </div>
    );

    // case 2:
    //   return (
    //     <Date {...props} nextStep={nextStep} prevStep={prevStep} />
    //   )

    // case 3:
    //   return (
    //     <ConfirmOrder
    //       {...props}
    //       car={props.car}
    //       prevStep={prevStep}
    //     />
    //   )
    // }
}

export default CarTile;
