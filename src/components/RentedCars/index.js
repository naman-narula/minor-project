import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@material-ui/icons';
import CarCard from '../styled.components/CarCard';

export default function RentedCars(props) {
    return (
        <Accordion
            expanded={props.expanded === 'RENTED_CARS'}
            onChange={props.AccordionChange('RENTED_CARS')}
        >
            <AccordionSummary expandIcon={<ExpandMore />}>
                <b>Rented Cars</b>
            </AccordionSummary>
            <AccordionDetails>
                {props?.cars?.active_orders?.map((car, index) => {
                    return <CarCard key={index} car={car} endStatus="RSRE" use='userRides' dialogOpen={props.dialogOpen} />;
                })}
                {props?.car?.non_active_orders?.map((car,index)=>{
                    return <CarCard key={index} car={car} endStatus="RSRE" use='userRides' dialogOpen={props.dialogOpen}/>
                })}
            </AccordionDetails>
        </Accordion>
    );
}
