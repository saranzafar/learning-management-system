import React, { useEffect, useState } from 'react';

function Home() {
    const [adminData, setAdminData] = useState("");

    useEffect(() => {
        window.electronAPI.getUserData().then((retrievedUserData) => {
            if (retrievedUserData) {
                setAdminData(retrievedUserData.admin);
            }
        });
    }, []);

    // Ensure the URL uses HTTPS
    const logoUrl = adminData?.logo?.replace('http://', 'https://');

    return (
        <div className='ml-8'>
            <h1 className="text-2xl font-bold">Welcome {adminData?.name}</h1>
            <p className="mt-2 text-gray-600">School Management System is a comprehensive application designed to streamline and enhance the administrative functions of educational institutions. </p>
            <div className="flex gap-2">
                <img src={logoUrl} alt="Logo" />
            </div>
        </div>
    );
}

export default Home;
