import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Attendence() {
    const students = [
        { name: 'Student 1' },
        { name: 'Student 2' },
        { name: 'Student 3' },
        { name: 'Student 4' },
        { name: 'Student 5' },
        // Add more students as needed
    ];

    const initialDummyData = [
        {
            date: '2024-08-01',  // Format: yyyy-mm-dd
            attendance: ['present', 'absent', 'leave', 'present', 'present'],
        },
        {
            date: '2024-08-02',  // Format: yyyy-mm-dd
            attendance: ['absent', 'present', 'present', 'leave', 'absent'],
        },
    ];

    const [attendance, setAttendance] = useState(
        students.map((student, index) => ({
            ...student,
            status: initialDummyData.map((data) => data.attendance[index]).concat(''),
        }))
    );

    const [dates, setDates] = useState(
        initialDummyData.map((data) => data.date).concat('')
    );

    const [newAttendanceData, setNewAttendanceData] = useState([]);

    const addNewColumn = () => {
        setDates((prevDates) => [...prevDates, '']);
        setAttendance((prevAttendance) =>
            prevAttendance.map((student) => ({
                ...student,
                status: [...student.status, ''],
            }))
        );
    };

    const handleStatusChange = (studentIndex, dayIndex, status) => {
        const updatedAttendance = attendance.map((student, sIndex) => {
            if (sIndex === studentIndex) {
                const updatedStatus = [...student.status];
                updatedStatus[dayIndex] = status;
                return { ...student, status: updatedStatus };
            }
            return student;
        });
        setAttendance(updatedAttendance);

        // If the user starts entering attendance in the last column, add a new one
        if (dayIndex === dates.length - 1) {
            addNewColumn();
        }
    };

    const handleDateChange = (index, date) => {
        const updatedDates = [...dates];
        updatedDates[index] = date;
        setDates(updatedDates);

        // Update new column data
        if (index >= initialDummyData.length) {
            handleNewColumnData(index, date);
        }
    };

    const handleHeaderCheckboxChange = (dayIndex) => {
        const allPresent = attendance.every((student) => student.status[dayIndex] === 'present');
        const updatedAttendance = attendance.map((student) => {
            const updatedStatus = [...student.status];
            updatedStatus[dayIndex] = allPresent ? '' : 'present';
            return { ...student, status: updatedStatus };
        });
        setAttendance(updatedAttendance);
    };

    const handleNewColumnData = (index, date) => {
        const data = {
            date,
            user: "user",
            attendance: attendance.map((student) => ({
                name: student.name,
                status: student.status[index],
            })),
        };
        setNewAttendanceData(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("data::", newAttendanceData);

        // fetch('https://xyz.example.com/submit-attendance', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(newAttendanceData),
        // })
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log('Success:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    };




    return (
        <section className=''>
            <ToastContainer />
            <div className="flex items-center justify-center py-10 w-full">
                <div className="min-w-96 w-full mx-auto">
                    <h2 className="text-center text-2xl font-bold leading-tight text-gray-700">
                        Attendence
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already added?{' '}
                        <Link
                            to="/home"
                            title=""
                            className="font-semibold text-gray-700 transition-all duration-200 hover:underline"
                        >
                            Goto Home?
                        </Link>
                    </p>

                    {/* display all students  */}
                    <div className="mt-6 ml-10">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-4 py-3.5 text-left text-sm font-lg text-gray-700">
                                                    Student Name
                                                </th>
                                                {dates.map((date, index) => (
                                                    <th key={index} scope="col" className="px-4 py-3.5 text-center text-sm font-normal text-gray-700">
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleHeaderCheckboxChange(index)}
                                                            className="form-checkbox h-4 w-4 text-gray-600 transition duration-150 ease-in-out"
                                                        />
                                                        <input
                                                            type="date"
                                                            required
                                                            value={date}
                                                            onChange={(e) => {
                                                                handleDateChange(index, e.target.value);
                                                            }}
                                                            className="ml-2 border-gray-300 rounded-lg shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                        />
                                                        {index >= initialDummyData.length && (
                                                            <button
                                                                type="button"
                                                                onClick={handleSubmit}
                                                                className="ml-2 px-2 py-1 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:bg-blue-700"
                                                            >
                                                                Save
                                                            </button>
                                                        )}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {attendance.map((student, studentIndex) => (
                                                <tr key={studentIndex}>
                                                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-900">
                                                        {student.name}
                                                    </td>
                                                    {student.status.map((status, dayIndex) => (
                                                        <td
                                                            key={dayIndex}
                                                            className="whitespace-nowrap px-4 py-4 text-center"
                                                        >
                                                            <div className="flex justify-center items-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    className={`w-6 h-6 rounded-full ${status === 'present'
                                                                        ? 'bg-green-500'
                                                                        : status === 'absent'
                                                                            ? 'bg-red-500'
                                                                            : status === 'leave'
                                                                                ? 'bg-yellow-500'
                                                                                : 'bg-gray-200'
                                                                        }`}
                                                                    onClick={() => handleStatusChange(studentIndex, dayIndex, 'present')}
                                                                    title="Present"
                                                                >
                                                                    {status === 'present' && <span className="text-white">✔</span>}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className={`w-6 h-6 rounded-full ${status === 'present'
                                                                        ? 'bg-green-500'
                                                                        : status === 'absent'
                                                                            ? 'bg-red-500'
                                                                            : status === 'leave'
                                                                                ? 'bg-yellow-500'
                                                                                : 'bg-gray-200'
                                                                        }`}
                                                                    onClick={() => handleStatusChange(studentIndex, dayIndex, 'absent')}
                                                                    title="Absent"
                                                                >
                                                                    {status === 'absent' && <span className="text-white">✘</span>}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className={`w-6 h-6 rounded-full ${status === 'present'
                                                                        ? 'bg-green-500'
                                                                        : status === 'absent'
                                                                            ? 'bg-red-500'
                                                                            : status === 'leave'
                                                                                ? 'bg-yellow-500'
                                                                                : 'bg-gray-200'
                                                                        }`}
                                                                    onClick={() => handleStatusChange(studentIndex, dayIndex, 'leave')}
                                                                    title="Leave"
                                                                >
                                                                    {status === 'leave' && <span className="text-white">!</span>}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div >
            </div >
        </section >
    );
}

export default Attendence;