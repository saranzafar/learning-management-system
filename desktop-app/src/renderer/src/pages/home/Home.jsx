import React, { useEffect } from 'react';
import { Box } from "../../components/index"

function Home() {
    useEffect(() => {
        // Get user data on component mount
        window.electronAPI.getUserData().then((retrievedUserData) => {
            if (retrievedUserData) {
                // setUserData(retrievedUserData);
                console.log('DEcrypted data', retrievedUserData);
            }
        });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Welcome to School management system</h1>
            <p className="mt-2 text-gray-600">School Management System" is a comprehensive application designed to streamline and enhance the administrative functions of educational institutions. </p>
            <div className="flex gap-2">
            </div>

        </div>
    );
}

export default Home;
