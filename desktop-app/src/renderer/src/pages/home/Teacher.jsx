import React, { useState } from 'react';
import { ArrowRight, CircleUserRoundIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import conf from "../../conf/conf"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Teacher() {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', gender: '', address: '', phoneNumber: '' });
    const [teacherData, setTeacherData] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [teacherLoading, setTeachersLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState({});

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonLoading(true);

        const token = await window.electronAPI.getUserData();
        await axios.post(`${conf.backendUrl}teacher/register-teacher`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token?.token}`,
                },
            })
            .then((response) => {
                console.log("response = ", response);
                toast.success(`${response?.data?.message}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                setButtonLoading(false);
            })
            .catch((err) => {
                console.log("ERROR:", err?.response);
                toast.error(`Error: ${err?.response?.data?.message}`, {
                    position: "bottom-right",
                    autoClose: 2000,
                });
                setButtonLoading(false);
            });
    };

    const getAllTeachers = async () => {
        setTeachersLoading(true)
        const token = await window.electronAPI.getUserData();
        await axios.get(`${conf.backendUrl}teacher/get-all-teachers`, {
            headers: {
                Authorization: `Bearer ${token?.token}`
            }
        }).then((response) => {
            console.log("response = ", response?.data?.data?.teachers);
            setTeacherData(response?.data?.data?.teachers);
            setTeachersLoading(false);
        }).catch((err) => {
            setTeacherData([])
            toast.error(`Error: ${err?.response?.data?.message}`, {
                position: "bottom-right",
                autoClose: 2000,
            });
            setTeachersLoading(false);
        })
    }
    const deleteTeacher = async (id) => {
        setDeleteLoading((prev) => ({ ...prev, [id]: true }));
        const token = await window.electronAPI.getUserData();
        await axios.delete(`${conf.backendUrl}teacher/delete-teacher/${id}`, {
            headers: {
                Authorization: `Bearer ${token?.token}`
            }
        }).then((response) => {
            console.log("response = ", response?.data?.data?.teachers);
            setDeleteLoading((prev) => ({ ...prev, [id]: false }));
            getAllTeachers()
        }).catch((err) => {
            console.log("Error: ", err);
            toast.error(`Error: ${err}`, {
                position: "bottom-right",
                autoClose: 2000,
            });
            setDeleteLoading((prev) => ({ ...prev, [id]: false }));
        })
    }


    return (
        <section>
            <ToastContainer />
            <div className="flex items-center justify-center py-10 w-full">
                <div className="min-w-96 w-full mx-auto">
                    <h2 className="text-center text-2xl font-bold leading-tight text-gray-700">
                        Register Teacher
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Already registered?{' '}
                        <Link
                            to="/home/subject"
                            title=""
                            className="font-semibold text-gray-700 transition-all duration-200 hover:underline"
                        >
                            Add Subject
                        </Link>
                    </p>
                    {/* Form  */}
                    <form className="mt-8 border-b-2 pb-16 w-full " onSubmit={handleSubmit}>
                        <div className="space-y-5 w-2/3 mx-auto">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-700">
                                    Name
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
                                <label htmlFor="email" className="text-base font-medium text-gray-700">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-700">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-sm font-semibold text-gray-700 hover:underline"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? 'Hide' : 'Show'} password
                                    </button>
                                </div>
                                <div className="mt-2 relative">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Password"
                                        id="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => handleChange('password', e.target.value)}
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
                                        type="number"
                                        placeholder="Phone number"
                                        id="phoneNumber"
                                        required
                                        value={formData.phoneNumber}
                                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='w-full flex justify-end'>
                                <button
                                    type="submit"
                                    className="inline-flex w-44 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    disabled={buttonLoading}>
                                    {buttonLoading ? 'Please wait...' : 'Add teacher'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* all teachers  */}
                    <form className="mt-8 border-b-2 pb-16 w-2/3 mx-auto" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div>
                                <h2 className="text-center text-2xl font-bold leading-tight text-gray-800">
                                    All Registered Teachers
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    All registered teachers will be listed here.
                                </p>
                                {!teacherData.length &&
                                    <div className='w-full mx-auto flex justify-center items-center'>
                                        <button
                                            type="button"
                                            onClick={getAllTeachers}
                                            className="inline-flex justify-center items-center px-3.5 mt-4 py-2.5 font-semibold leading-7 underline hover:text-gray-600"
                                            disabled={buttonLoading}>
                                            {teacherLoading ? ' wait...' : 'Click to load teachers'}
                                        </button>
                                    </div>
                                }
                                {teacherData.length > 0 ? (
                                    <section className="mx-auto w-full max-w-7xl px-4 py-4">
                                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                                            <div>
                                                <h2 className="text-lg font-semibold">Teachers</h2>
                                                <p className="mt-1 text-sm text-gray-700">
                                                    This is a list of all teachers. You can add new teachers and delete existing ones.
                                                </p>
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={getAllTeachers}
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
                                                            <thead className="bg-gray-50 w-full">
                                                                <tr>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                                    >
                                                                        <span>Name</span>
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                                                                    >
                                                                        Contact
                                                                    </th>

                                                                    <th
                                                                        scope="col"
                                                                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                                                                    >
                                                                        Gender
                                                                    </th>
                                                                    <th scope="col" className="relative px-4 py-3.5">
                                                                        <span className="sr-only">Edit</span>
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                                {teacherData?.map((teacher) => (
                                                                    <tr key={teacher._id}>
                                                                        <td className="whitespace-nowrap px-4 py-4">
                                                                            <div className="flex items-center">
                                                                                <div className="">
                                                                                    <CircleUserRoundIcon size={26} strokeWidth={1.3} />
                                                                                </div>
                                                                                <div className="ml-4">
                                                                                    <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                                                                                    <div className="text-sm text-gray-700">{teacher.address}</div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-12 py-4">
                                                                            <div className="text-sm text-gray-900 ">{teacher.email}</div>
                                                                            <div className="text-sm text-gray-700">{teacher.phoneNumber}</div>
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-4 py-4">
                                                                            <span className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                                                                {teacher.gender}
                                                                            </span>
                                                                        </td>
                                                                        <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                                                                            <button
                                                                                type="button"
                                                                                className="text-red-600 hover:text-red-900"
                                                                                onClick={() => deleteTeacher(teacher._id)}
                                                                                disabled={deleteLoading[teacher._id]}
                                                                            >
                                                                                {deleteLoading[teacher._id] ? 'Deleting...' : 'Delete'}
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
                                ) : (
                                    <div className="w-full mx-auto flex justify-center items-center my-10 py-10">
                                        <p className="text-center text-sm text-gray-600">
                                            Please reload or register a teacher.
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </section >
    );
}

export default Teacher;