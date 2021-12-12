import React, { useEffect, useState } from 'react';
import css from './UserDashboard.module.scss';
import Footer from '../footer/Footer';
import Navbar from '../nav/Navbar';

import Dlupload from '../Dlupload';
import BankFrom from '../BankForm';
import YourRides from '../YourRides';
import YourCars from '../YourCars';
import RentedCars from '../RentedCars';
import { getRentedCars } from '../../apiCalls/auth';

export default function UserDashBoard(props) {
    const [expanded, setExpanded] = useState(false);
    const [rentedCars, setRentedCars] = useState({ car_data: [], active_orders: [], non_active_orders: [] });
    useEffect(()=>{
        if(expanded == 'RENTED_CARS' || expanded == 'YourCars'){
            fetchRentedCars()
        }
    },[expanded])

    const accordionChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    function fetchRentedCars() {
        const userId = JSON.parse(localStorage.getItem('user')).userid;
        getRentedCars(userId).then((res) => setRentedCars(res));
    }

    return (
        <>
            <Navbar {...props} />
            <main className={css.dashboard}>
                <Dlupload AccordionChange={accordionChange} expanded={expanded} />
                <BankFrom AccordionChange={accordionChange} expanded={expanded} />
                <YourRides AccordionChange={accordionChange} expanded={expanded} />
                <RentedCars AccordionChange={accordionChange} expanded={expanded} cars={rentedCars} />
                <YourCars AccordionChange={accordionChange} expanded={expanded} cars={rentedCars.car_data ?? []} />
            </main>
            <Footer {...props} />
        </>
    );
}
