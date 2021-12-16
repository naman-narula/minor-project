import React, { useEffect, useState } from 'react';
import css from './BankForm.module.scss'

import Accordion from '@mui/material/Accordion';
import CircularProgress from '@mui/material/CircularProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@material-ui/icons';
import { Alert, Snackbar } from '@material-ui/core';
import { getBankDetail, postBankDetail } from '../../apiCalls/auth';

export default function BankFrom(props) {
    const [formData, setFromData] = useState({
        account_no: '',
        IFSC: '',
        holder_name: ''
    });

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ shouldShowAlert: false, message: '' });

    useEffect(() => {
        if (props.expanded == 'BankForm') {
            getBankDetail(JSON.parse(localStorage.getItem('user')).userid).then((res) => {
                setFromData(res.bank_details[0]);
            });
        }
    }, [props.expanded]);

    function handleChange(event) {
        setFromData({ ...formData, [event.target.name]: event.target.value });
    }

    function handleSubmit(event) {
        setLoading(true);
        const requestBody = new FormData();
        for (let key in formData) {
            requestBody.append(key, formData[key]);
        }
        postBankDetail(JSON.parse(localStorage.getItem('user')).userid, requestBody).then((res) => {
            setLoading(false);
            setAlert({ shouldShowAlert: true, message: 'Bank Details Updated' });
        });
    }

    return (
        <Accordion expanded={props.expanded == 'BankForm'} onChange={props.AccordionChange('BankForm')}>
            <AccordionSummary expandIcon={<ExpandMore />}>
                <p style={{ whiteSpace: 'pre-wrap' }}>
                    <b>Bank Details</b>
                    {'                                  '}
                    Share your Bank Details for Smooth Payment Transfers
                </p>
            </AccordionSummary>
            <AccordionDetails>
                <div className={css.accordion}>
                <div className="form-group">
                    <label>Enter Your Account Number</label>
                    <input
                        className="input-css"
                        type="number"
                        name="account_no"
                        value={formData.account_no}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Enter IFSC Code</label>
                    <input
                        className="input-css"
                        type="text"
                        name="IFSC"
                        value={formData.IFSC}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Enter Account Holder Name</label>
                    <input
                        type="text"
                        className="input-css"
                        name="holder_name"
                        value={formData.holder_name}
                        onChange={handleChange}
                    />
                </div>
                <div className={css.loadingButton}>
                    <LoadingButton
                        loading={loading}
                        type="submit"
                        id="button"
                        onClick={handleSubmit}
                        loadingIndicator={
                            <CircularProgress color="primary" size={40} style={{ color: '#fff' }} />
                        }
                        disabled={loading || alert.shouldShowAlert}
                    >
                        Submit
                    </LoadingButton>
                </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={alert.shouldShowAlert}
                    autoHideDuration={5000}
                    onClose={() => setAlert({ ...alert, shouldShowAlert: false })}
                >
                    <Alert severity="info">{alert.message}</Alert>
                </Snackbar>
            </AccordionDetails>
        </Accordion>
    );
}
