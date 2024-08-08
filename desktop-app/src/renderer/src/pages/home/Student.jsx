import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import conf from "../../conf/conf"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Student() {

    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        rollNo: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        phoneNumber: '',
        grade: '',
        user: ''
    });
    const [studentFormButtonLoading, setStudentFormButtonLoading] = useState(false);
    const [allStudents, setAllStudents] = useState([]);
    const [deleteLoadingSub, setDeleteLoadingSub] = useState({});

    // get all students
    const getAllStudents = async () => {
        try {
            const token = await window.electronAPI.getUserData();
            const id = token.admin._id
            const response = await axios.get(`${conf.backendUrl}student/get-all-students/${id}`, {
                headers: {
                    Authorization: `Bearer ${token?.token}`
                }
            });
            setAllStudents(response?.data?.data?.students)
        } catch (err) {
            console.log("Error::", err.response);

            // alert("")
        }
    };
    useEffect(() => {
        getAllStudents();
    }, [])

    // sort all students 
    const sortedStudents = allStudents.sort((a, b) => {
        const gradeA = a.grade.toUpperCase();
        const gradeB = b.grade.toUpperCase();
        if (gradeA < gradeB) return -1;
        if (gradeA > gradeB) return 1;
        return 0;
    });

    // delete student
    const deleteStudent = async (id) => {
        setDeleteLoadingSub((prev) => ({ ...prev, [id]: true }));
        const token = await window.electronAPI.getUserData();
        await axios.delete(`${conf.backendUrl}student/delete-student/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.token}`
            }
        }).then((response) => {
            alert(response?.data?.message)
            setDeleteLoadingSub((prev) => ({ ...prev, [id]: false }));
            getAllStudents()
        }).catch((err) => {
            alert("Check Your Network or Reload" || err?.response.data.message)
            setDeleteLoadingSub((prev) => ({ ...prev, [id]: false }));
        })
    }

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const setFormdataBlank = (field, value) => {
        setFormData({
            name: '',
            fatherName: '',
            rollNo: '',
            dateOfBirth: '',
            gender: '',
            address: '',
            phoneNumber: '',
            grade: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStudentFormButtonLoading(true);
        const token = await window.electronAPI.getUserData();
        formData.user = token.admin._id
        await axios.post(`${conf.backendUrl}student/register-student`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
            })
            .then((response) => {
                toast.success(`${response?.data?.message} `, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                setStudentFormButtonLoading(false);
                setFormdataBlank()
            })
            .catch((err) => {
                console.log(err);
                toast.warning(`${err?.response?.data?.message} ` || "Check Network an reload", {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                setStudentFormButtonLoading(false);
            });
        return
    };


    return (
        <section>
            <ToastContainer />
            <div className="flex items-center justify-center py-10 w-full">
                <div className="min-w-96 w-full mx-auto">
                    <h2 className="text-center text-2xl font-bold leading-tight text-gray-700">
                        Register Student
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already registered?{' '}
                        <Link
                            to="/home/attendence"
                            title=""
                            className="font-semibold text-gray-700 transition-all duration-200 hover:underline"
                        >
                            Goto Attendence?
                        </Link>
                    </p>
                    {/* register student form */}
                    <form className="mt-8 border-b-2 pb-16 w-full " onSubmit={handleSubmit}>
                        <div className="space-y-5 w-2/3 mx-auto">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-700">
                                    First Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-700">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Father Name"
                                        id="fatherName"
                                        required
                                        value={formData.fatherName}
                                        onChange={(e) => handleChange('fatherName', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="rollNo" className="text-base font-medium text-gray-700">
                                    Roll No
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="number"
                                        placeholder="Roll no"
                                        id="rollNo"
                                        required
                                        value={formData.rollNo}
                                        onChange={(e) => handleChange('rollNo', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-700">
                                    Date of Birth
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="date"
                                        placeholder="Date of Birth"
                                        id="dateOfBirth"
                                        required
                                        value={formData.dateOfBirth}
                                        onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="gender" className="text-base font-medium text-gray-700">
                                    Gender
                                </label>
                                <div className="mt-2">
                                    <select
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        id="gender"
                                        required
                                        value={formData.gender}
                                        onChange={(e) => handleChange('gender', e.target.value)}
                                    >
                                        <option value="" disabled>Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="address" className="text-base font-medium text-gray-700">
                                    Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Address"
                                        id="address"
                                        required
                                        value={formData.address}
                                        onChange={(e) => handleChange('address', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="text-base font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="tel"
                                        placeholder="Phone number"
                                        id="phoneNumber"
                                        required
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-2">
                                <select
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="grade"
                                    required
                                    value={formData.grade}
                                    onChange={(e) => handleChange('grade', e.target.value)}
                                >
                                    <option value="" disabled>Select Grade</option>
                                    <option value="Grade-1">Grade-1</option>
                                    <option value="Grade-2">Grade-2</option>
                                    <option value="Grade-3">Grade-3</option>
                                    <option value="Grade-4">Grade-4</option>
                                    <option value="Grade-5">Grade-5</option>
                                    <option value="Grade-6">Grade-6</option>
                                    <option value="Grade-7">Grade-7</option>
                                    <option value="Grade-8">Grade-8</option>
                                </select>
                            </div>
                            <div className='w-full flex justify-end'>
                                <button
                                    type="submit"
                                    className="inline-flex w-44 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    disabled={studentFormButtonLoading}>
                                    {studentFormButtonLoading ? 'Please wait...' : 'Add Student'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* display all Students  */}
                    <section className="mt-8 border-b-2 pb-16 w-2/3 mx-auto">
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">
                                    All Students
                                </h2>
                                <section className="mx-auto w-full max-w-7xl px-4 py-4">
                                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                                        <div>
                                            <h2 className="text-lg font-semibold">All Students</h2>
                                            <p className="mt-1 text-sm text-gray-700">
                                                This is a list of all students. You can add new students and delete existing ones.
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                type="button"
                                                onClick={() => { getAllStudents() }}
                                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                            >
                                                Refresh
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-col">
                                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                                <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th
                                                                    scope="col"
                                                                    className="px-4 py-3.5 text-left text-md font-bold text-gray-700"
                                                                >
                                                                    Name
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className=" py-3.5 text-left text-md font-bold text-gray-700"
                                                                >
                                                                    Roll No
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-4 py-3.5 text-left text-md font-bold text-gray-700"
                                                                >
                                                                    m/d/y
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-4 py-3.5 text-left text-md font-bold text-gray-700"
                                                                >
                                                                    Gender
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-4 py-3.5 text-left text-md font-bold text-gray-700"
                                                                >
                                                                    Address
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-4 py-3.5 text-left text-md font-bold text-gray-700"
                                                                >
                                                                    Phone No
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-4 py-3.5 text-left text-sm font-bold text-gray-700"
                                                                >
                                                                    Grade
                                                                </th>
                                                                <th
                                                                    scope="col"
                                                                    className="px-4 py-3.5 text-left text-sm font-bold text-gray-700"
                                                                ></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-gray-200 bg-white">
                                                            {sortedStudents.map((student) => (
                                                                <tr key={student._id}>
                                                                    <td className="whitespace-nowrap px-4 py-4">
                                                                        <div className="text-sm font-medium text-gray-900">{student.name} {student.fatherName}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-4">
                                                                        <div className="text-sm font-medium text-gray-900">{student.rollNo}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-4">
                                                                        <div className="text-sm font-medium text-gray-900">{new Date(student.dateOfBirth).toLocaleDateString()}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-4">
                                                                        <div className="text-sm font-medium text-gray-900">{student.gender}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-4">
                                                                        <div className="text-sm font-medium text-gray-900">{student.address}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-4">
                                                                        <div className="text-sm font-medium text-gray-900">{student.phoneNumber}</div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-4">
                                                                        <div className="text-sm font-medium text-gray-900">
                                                                            <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                                                                {student.grade}
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                                                        <button
                                                                            type="button"
                                                                            className="text-red-600 hover:text-red-900"
                                                                            onClick={() => deleteStudent(student._id)}
                                                                            disabled={deleteLoadingSub[student._id]}
                                                                        >
                                                                            {deleteLoadingSub[student._id] ? 'Deleting...' : 'Delete'}
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>

                </div >
            </div >
        </section >
    );
}

export default Student;