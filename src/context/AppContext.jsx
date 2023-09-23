import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showAccountModal, setShowLoginModal] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleLogin = async (userData) => {
        try {
            // API call to the backend server endpoint to handle login
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // after successful Login,hv to perform the actions like set user session.
                // then redirect user to the dashboard or current page.
                const { token } = await response.json();
                // saving the token in a cookie
                document.cookie = `token=${token}; path=/;`;

                toggleAccountModal();
                setLoggedIn(true);
                console.log('Login successful!');
            } else {
                // hv to handle Login failed error by showing error message to the user
                console.error('Login failed!');
            }
        } catch (error) {
            // errors that occurred during the API call
            console.error('An error occurred during login:', error);
        }
    };
    const handleRegister = async (userData) => {
        try {
            // API call to backend server to handle registration to /register endpoint.
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                // after successful registration hv to perform the necessary actions like redirect, display success message.
                console.log('Registration successful!');
            } else {
                console.error('Registration failed!');
            }
        } catch (error) {
            // errors that occurred during the API call
            console.error('An error occurred during registration:', error);
        }
    };
    const handleLogout = async () => {
        try {
            // Make a POST request to the server logout endpoint
            const response = await fetch('/api/logout', {
                method: 'POST',
                credentials: 'include', // Include credentials (eg. cookies) for the request
            });

            if (response.ok) {
                // after Logout was successful
                // can now update the client-side state to reflect the user's logged-out status
                localStorage.removeItem('accessToken');
                setLoggedIn(false);
            } else {
                console.error('Logout failed!');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const toggleAccountModal = () => {
        setShowLoginModal((showAccountModal) => !showAccountModal);
    };


    return (
        <AppContext.Provider value={{
            loggedIn, handleLogin, handleRegister, handleLogout, showAccountModal, toggleAccountModal
        }}>
            {children}
        </AppContext.Provider>
    );
};
