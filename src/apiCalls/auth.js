const API = 'http://localhost:8000';
// const API = 'https://carhub-backend.herokuapp.com/api'

// user route calls
export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: user
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const login = (user) => {
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        credentials: 'include',
        body: user
    })
        .then(async (response) => {
            const res = await response.json();
            localStorage.setItem('user', JSON.stringify(res));
            return { response: res, code: response.status };
        })
        .catch((err) => console.log(err));
};

export const updateUser = (data, userId) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    console.log('hello');
    return fetch(`${API}/user/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: data
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const getUser = (userId) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data));
        next();
    }
};

export const signout = () => {
    return fetch(`${API}/signout`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((response) => {
            console.log(response, 'Signout success');
            localStorage.clear();
        })
        .catch((err) => console.log(err + 'signout eror'));
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'));
    } else {
        return false;
    }
};

// city route calls
export const getCities = () => {
    return fetch(`${API}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const getCity = (cityId) => {
    return fetch(`${API}/city/${cityId}`, {
        method: 'GET'
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET'
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

// car route calls
export const createNewCar = (car, userId) => {
    return fetch(`${API}/rentcar`, {
        method: 'POST',
        credentials: 'include',
        body: car
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const checkPrice = (formData) => {
    return fetch(`${API}/price-calculator`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    }).then((res) => res.json());
};

export const requestApproval = (requestBody) => {
    return fetch(`${API}/price-calculator`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        credentials: 'include',
        body: requestBody
    }).then((res) => res.json());
};

export const getPhoto = (carId) => {
    return fetch(`${API}/car/photo/${carId}`, {
        method: 'GET'
    })
        .then((response) => {
            return response;
        })
        .catch((err) => console.log(err));
};

export const getCar = (carId) => {
    let token = JSON.parse(localStorage.getItem('user')).token;
    return fetch(`${API}/car/${carId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const rideCar = (bookingDetails) => {
    let endpoint = `${API}/ridecar/${bookingDetails.city.id}`;
    console.log(endpoint);
    endpoint = new URL(endpoint);
    endpoint.search = new URLSearchParams({
        fromDate: bookingDetails.fromDate,
        toDate: bookingDetails.toDate
    }).toString();
    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const deleteCar = (carId, userId) => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    return fetch(`${API}/car/${carId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

export const getUserDetails = () => {
    const userId = JSON.parse(localStorage.getItem('user')).userid;
    return fetch(`${API}/user/${userId}`, { credentials: 'include' }).then(async (res) => {
        const response = await res.json();
        // localStorage.setItem('userDetails',response?.user?.[0]) change here
        return response;
    });
};

export const postUserDocs = (userDoc) => {
    const form = new FormData();
    form.append('file', userDoc);
    console.log('postuSerdoc', userDoc);
    const userId = JSON.parse(localStorage.getItem('user')).userid;
    return fetch(`${API}/user/${userId}`, {
        method: 'POST',
        credentials: 'include',
        body: form
    });
};

export const getCitiesAndCategory = () => {
    return fetch(`${API}/rentcar`, {
        credentials: 'include'
    }).then(async (res) => {
        return await res.json();
    });
};

export const BookCar = (carId, formData) => {
    return fetch(`${API}/book/${carId}`, {
        credentials: 'include',
        method: 'POST',
        body: formData
    }).then((res) => res.json());
};

export const Payment = (params) => {
    return fetch('https://securegw-stage.paytm.in/order/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(params)
    }).then((res) => res.text());
};

export const RentCar = (formData) => {
    return fetch(`${API}/rentcar`, { method: 'POST', credentials: 'include', body: formData }).then((res) =>
        res.json()
    );
};

export const getBankDetail = (userId) => {
    return fetch(`${API}/user/${userId}/bank-detail`, { credentials: 'include' }).then((res) => res.json());
};

export const postBankDetail = (userId, requestBody) => {
    return fetch(`${API}/user/${userId}/bank-detail`, {
        method: 'POST',
        credentials: 'include',
        body: requestBody
    }).then((res) => res.json());
};

export const getUserRides = (userId) => {
    return fetch(`${API}/user/${userId}/rider-order-detail`, {
        credentials: 'include'
    }).then((res) => res.json());
};

export const endRide = (userId, requestBody) => {
    return fetch(`${API}/user/${userId}/rider-order-detail`, {
        method: 'POST',
        credentials: 'include',
        body: requestBody
    }).then((res) => res.json());
};

export const getRentedCars = (userId) => {
    return fetch(`${API}/user/${userId}/car-data`, { credentials: 'include' }).then((res) => res.json());
};

export const Report = (userId, requestBody) => {
    return fetch(`${API}/user/${userId}/report-now`, {
        credentials: 'include',
        method: 'POST',
        body: requestBody
    }).then((res) => res.json());
};
