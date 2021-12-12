import React, { useState, useEffect } from 'react';

import CarTile from '../styled.components/CarTile';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@material-ui/icons';
import { getUserRides } from '../../apiCalls/auth';
import CarCard from '../styled.components/CarCard';

export default function YourRides(props) {
    const [userRides, setUserRides] = useState([]);

    useEffect(() => {
        if (props.expanded === 'YourRides') {
            const userId = JSON.parse(localStorage.getItem('user')).userid;
            getUserRides(userId).then((res) =>
                setUserRides([...res.rider_active_order, ...res.non_active_orders])
            );
        }
    }, [props.expanded]);

    return (
        <Accordion expanded={props.expanded == 'YourRides'} onChange={props.AccordionChange('YourRides')}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <b>Your Rides</b>
            </AccordionSummary>
            <AccordionDetails>
                {userRides.map((rides,index) => {
                    return (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <CarCard car={rides} endStatus="BKD" use="userRides" />
                        </div>
                    );
                })}
            </AccordionDetails>
        </Accordion>
    );
}
