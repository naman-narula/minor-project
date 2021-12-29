import React, { useEffect, useState } from 'react';
import css from './UserDashboard.module.scss';
import Footer from '../footer/Footer';
import Navbar from '../nav/Navbar';

import Dlupload from '../Dlupload';
import BankFrom from '../BankForm';
import YourRides from '../YourRides';
import YourCars from '../YourCars';
import RentedCars from '../RentedCars';
import { getRentedCars, Report } from '../../apiCalls/auth';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function UserDashBoard(props) {
    const [expanded, setExpanded] = useState(false);
    const [rentedCars, setRentedCars] = useState({ car_data: [], active_orders: [], non_active_orders: [] });
    const [open, setOpen] = React.useState(false);
    const [report, setReport] = useState({ message: '', orderid: '' });

    const handleClickOpen = (orderid) => {
        setReport({ ...report, orderid: orderid });
        setOpen(true);
    };

    const handleClose = (action) => {
        if (action) {
            const formData = new FormData();
            for(let key in report){
                formData.append(key,report[key])
            }
            Report(JSON.parse(localStorage.getItem('user')).userid,formData);
        }
        setOpen(false);
    };
    useEffect(() => {
        if (expanded == 'RENTED_CARS' || expanded == 'YourCars') {
            fetchRentedCars();
        }
    }, [expanded]);

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
                <YourRides
                    AccordionChange={accordionChange}
                    expanded={expanded}
                    dialogOpen={handleClickOpen}
                />
                <RentedCars
                    AccordionChange={accordionChange}
                    expanded={expanded}
                    cars={rentedCars}
                    dialogOpen={handleClickOpen}
                />
                <YourCars
                    AccordionChange={accordionChange}
                    expanded={expanded}
                    cars={rentedCars.car_data ?? []}
                />
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Report</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tell us your concern. Rest be assured we are looking in it
                        </DialogContentText>
                        <textarea
                        rows={10}
                        cols={30}
                            className="input-css"
                            name="message"
                            value={report.message}
                            onChange={(event) =>
                                setReport({ ...report, [event.target.name]: event.target.value })
                            }
                        ></textarea>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleClose(false)}>Cancel</Button>
                        <Button onClick={() => handleClose(true)}>Submit</Button>
                    </DialogActions>
                </Dialog>
            </main>
        </>
    );
}
