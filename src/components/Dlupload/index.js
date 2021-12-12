import React, { useState, useEffect } from 'react';
import css from './Dlupload.module.scss';
import { getUserDetails, postUserDocs } from '../../apiCalls/auth';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { ExpandMore } from '@material-ui/icons';

export default function Dlupload(props) {
    const [userDl, setUserDl] = useState({});
    const [showUploadDl, setshowUploadDl] = useState(true);

    useEffect(() => {
        getUserDetails().then((response) => {
            if (response?.user?.[0]?.['userproxy__is_valid_rider']) {
                setshowUploadDl(false);
                const user = JSON.parse(localStorage.getItem('user'));
                localStorage.setItem('user', JSON.stringify({ ...user, is_valid_rider: true }));
            }
        });
    }, []);
    function onFileUpload(e) {
        console.log(e.target.files);
        setUserDl(e.target.files[0]);
    }
    function handleUpload(e) {
        e.preventDefault();
        postUserDocs(userDl).then((response) => {
            console.log(response);
        });
    }

    return (
        <>
            {showUploadDl && (
                <Accordion expanded={props.expanded == 'DL'} onChange={props.AccordionChange('DL')}>
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <b>Upload DL</b>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className={`form-group ${css.widthControl}`}>
                            <label className="custom-file-upload" htmlFor="DL">
                                {' '}
                                <i className="far fa-id-card"></i> Upload Driving Licence
                            </label>
                            <input id="DL" type="file" name="dL" onChange={onFileUpload}></input>
                            {userDl.name}
                            {userDl.name && (
                                <button id="button" onClick={handleUpload}>
                                    Upload
                                </button>
                            )}
                        </div>
                    </AccordionDetails>
                </Accordion>
            )}
        </>
    );
}
