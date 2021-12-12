import React from 'react';
import css from './RentedCar.module.scss';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@material-ui/icons';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
export default function YourCars(props) {
    return (
        <Accordion expanded={props.expanded == 'YourCars'} onChange={props.AccordionChange('YourCars')}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <b>Your Cars</b>
            </AccordionSummary>
            <AccordionDetails>
                <div className={css.carList}>
                    {props.cars.map((car, index) => {
                        return (
                            <div className={css.carModule} key={index}>
                                <p>
                                    <b>
                                        {car.manufacturer[0].toUpperCase() + car.manufacturer.substr(1)}{' '}
                                        {car.car__modelName} {car.year}
                                    </b>
                                </p>
                                <p>Fuel Type: {car.fuel}</p>
                                <p>Price ₹{car.price_by_user}</p>
                                {car.conflict_manually_resolved && (
                                    <Link
                                        to={{
                                            pathname: '/car-rent-form',
                                            state: {
                                                brand: car.manufacturer,
                                                carId: car.id,
                                                year: car.year
                                            }
                                        }}
                                    >
                                        <div className={css.widthControl}>
                                            <button id="button">Complete Rent Process</button>
                                        </div>
                                    </Link>
                                )}
                            </div>
                        );
                    })}
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
