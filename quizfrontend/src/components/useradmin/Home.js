import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
    const verifyCookie = async () => {
        if (!cookies.token) {
            navigate('/login');
        } else {
            try {
                const { data } = await axios.post('http://localhost:4000/', {}, { withCredentials: true });
                const { status, user, isAdmin } = data;
                setUsername(user);

                if (status) { 
                    if (isAdmin) {
                        navigate('/create-course');
                        console.log(user)
                        console.log("Home page if",isAdmin)
                    } else {
                        navigate('/attend-exam');
                        console.log(user)
                        console.log("Home page else",isAdmin)
                    }
                } else {
                    removeCookie('token');
                    navigate('/login');
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const Logout = () => {
        removeCookie('token');
        navigate('/login');
    }

    return (
        <div>
            <h1>{" "} Welcome {username}</h1>
            <button onClick={Logout}>Logout</button>
            <ToastContainer />
        </div>
    );
}

export default Home;