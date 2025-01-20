// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';
// import { getUsers } from '../api/user';

// // Create the context
// const UserContext = createContext();

// // Custom hook to use UserContext
// export const useUser = () => {
//     return useContext(UserContext);
// };

// // Provider component
// export const UserProvider = async ({ children }) => {
//     //   const { isLoggedIn, authLoading } = useAuth();
//     const [allUsers, setAllUsers] = useState(null);

//     // Fetch user data from the backend
//     const fetchUserData = async () => {
//         // if (!isLoggedIn) return;

//         // Fetch all users
//         const allUsers = await getUsers();
//         if (allUsers.status === 'success') {
//             const usersData = allUsers.data;
//             console.log("all users: ", usersData);
//             setAllUsers(data);
//         } else {
//             console.error(`Failed to fetch all users: ${allUsers.error}`);
//         }



//         // Automatically fetch user data when user logs in
//         useEffect(() => {
//             // if (!authLoading && isLoggedIn) {
//             //     fetchUserData();
//             // }
//             fetchUserData();
//         }, []);


//         return (<UserContext.Provider
//             value={{
//                 allUsers
//             }}
//         >
//             {children}
//         </UserContext.Provider>
//         );


//     };

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers } from '../api/user'; // Assuming this is an API call to fetch user data
import { useAuth } from './AuthContext';

// Create the context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUser = () => {
    return useContext(UserContext);
};

// Provider component
export const UserProvider = ({ children }) => {
    const [allUsers, setAllUsers] = useState(null); // State to store user data
    const [loading, setLoading] = useState(true); // Loading state for fetching data
    const { isLoggedIn, authLoading } = useAuth();

    // Fetch user data from the backend
    const fetchUserData = async () => {
        if (!isLoggedIn) return;
        try {
            const response = await getUsers(); // Fetch all users
            if (response.status === 'success') {
                setAllUsers(response.data);
                console.log(response.data);
            } else {
                console.error(`Failed to fetch all users: ${response.error}`);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false); // Stop loading after fetch
        }
    };

    // Automatically fetch user data on component mount
    useEffect(() => {
        if (!authLoading && isLoggedIn) {
            fetchUserData();
        }
    }, [isLoggedIn, authLoading]);

    // Provide the context values
    return (
        <UserContext.Provider
            value={{
                allUsers,
                loading,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

