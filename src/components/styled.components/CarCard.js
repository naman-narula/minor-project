import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import Chip from '@mui/material/Chip';

import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import { endRide } from '../../apiCalls/auth';

export default function CarCard(props) {
    const [rideStatus, setRideStatus] = useState(props.car.status);
    const [loading, setLoading] = useState(false);
    function handleEndRide() {
        setLoading(true);
        const userId = JSON.parse(localStorage.getItem('user')).userid;
        const formData = new FormData();
        formData.append('orderid', props.car.id);
        endRide(userId, formData).then((res) => {
            setLoading(false);
            setRideStatus('COM');
        });
    }

    return (
        <Card>
            {props.car.car__photo && (
                <img src={props.car.car__photo} height={300} alt="car" />
            )}
            <CardContent>
                {rideStatus == props.endStatus && <Chip label="Active" color="success" />}
                <h1>
                    {props.car.car__brand ?? props.car.manufacturer} {props.car.car__modelName}
                </h1>
                {props.use == 'userRides' && (
                    <>
                        <h2>{moment(props.car.bookingDate).format('DD/MM/YYYY HH:MM a')}</h2>
                        <h2>
                            Ride Started at {moment(props.car.orderDateFrom).format('DD/MM/YYYY HH:MM a')}
                        </h2>
                        <h2>
                            Ride Ended at {moment(props.car.orderDateExpire).format('DD/MM/YYYY HH:MM a')}
                        </h2>
                        <h2> Bill Amount ₹{props.car.totalOrderCost}</h2>
                    </>
                )}
            </CardContent>
            <CardActions>
                <Button size="small" color="error" variant="contained">
                    Report
                </Button>
                {rideStatus == props.endStatus && (
                    <LoadingButton
                        size="small"
                        variant="outlined"
                        color="error"
                        loading={loading}
                        onClick={handleEndRide}
                        loadingIndicator={
                            <CircularProgress color="primary" size={40} style={{ color: '#c33764' }} />
                        }
                        disabled={loading}
                    >
                        End Ride
                    </LoadingButton>
                )}
            </CardActions>
        </Card>
    );
}
