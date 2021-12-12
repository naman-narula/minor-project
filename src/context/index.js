import React, { useContext, useEffect, useState } from 'react';
const LoginContext = React.createContext();

function LoginProvider ({children}) {
    const [user,setUser] = useState({loggedIn:false,userId:-1})
    useEffect(()=>{
        let storeduser = localStorage.getItem('user')
        storeduser = JSON.parse(storeduser);
        if(storeduser?.userid){
            console.log('*********',storeduser)
            setUser({loggedIn:true,userId:storeduser.userid})
        }
    },[])

    return <LoginContext.Provider value = {{user,setUser}}>{children}</LoginContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(LoginContext)
}

export {LoginProvider,LoginContext};