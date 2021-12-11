import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { getUserDetails, postUserDocs } from '../../apiCalls/auth';
import { useGlobalContext } from '../../context';
import Footer from '../footer/Footer';
import Navbar from '../nav/Navbar';

export default function UserDashBoard(props) {
    const { user, setUser } = useGlobalContext();
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
            <Navbar {...props}></Navbar>
            {showUploadDl && (
                <div>
                    <p> upload your driving licence to continue</p>
                    <input type="file" name="dL" onChange={onFileUpload}></input>
                    {userDl && <button onClick={handleUpload}>upload</button>}
                </div>
            )}
            <Footer {...props} />
        </>
    );
}
