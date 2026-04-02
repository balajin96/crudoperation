import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_SERVER_URL ||
  import.meta.env.VITE_BACKEND_URL;

const userSchema = z.object({
    employeeName: z.string().min(3, "Username must be at least 3 characters"),
    company: z.string().min(3, "Company must be at least 3 characters"),
});

const defaultValues = {
    employeeName: "",
    company: "",
};

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);
    // console.log("EDIT MODE✅✅✅✅", editUser);
    const [deleteUser, setDeleteUser] = useState(null)
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues,
    });

    useEffect(() => {
        getUsers();
        const storedEmail = localStorage.getItem('userEmail') ?? '';
        // const storedToken = localStorage.getItem('authToken') ?? '';
        setUserEmail(storedEmail);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };


    const getUsers = async () => {
        try {
            const { data } = await axios.get(`${API}/getUserData`);
            setUsers(data?.users ?? []);
        } catch (error) {
            console.error(error.message);
        }
    };

    const onSubmit = async (formData) => {
        try {
            if (editUser) {
                await axios.put(`${API}/modifyUserData/${editUser._id}`, formData);
            }
            else {
                await axios.post(`${API}/createUserData`, formData);
            }


            reset(defaultValues);
            setEditUser(null);
            getUsers();
        } catch (error) {
            console.error(error.response?.status, error.message);
        }
    };

    const handleEdit = (user) => {
        console.log(`🦄🦄🦄🦄`, user);
        /**
         * its important if you commented onSubmit 
         * will treat as a new value and POST method will run
         */
        setEditUser(user);
        reset(user);
    };

    const handleDelete = async (id) => {
        console.log(id);

        try {
            await axios.delete(`${API}/deleteUser/${id}`);
            if (editUser?._id === id) {
                setEditUser(null);
                reset(defaultValues);
            }

            getUsers();
        } catch (error) {
            console.error("delete error", error.response?.data || error.message);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="mx-auto px-4 py-6 w-full max-w-6xl">
                <header className="flex md:flex-row flex-col md:justify-between md:items-center gap-4 bg-white shadow-sm mb-6 p-5 border border-slate-200 rounded-2xl">
                    <div>
                        <p className="text-slate-500 text-xs uppercase tracking-[0.3em]">Session details</p>
                        <p className="font-semibold text-slate-900 text-lg">{userEmail || 'Guest user'}</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="bg-rose-600 hover:bg-rose-500 px-4 py-2 rounded-lg font-semibold text-white text-sm uppercase tracking-wide transition"
                    >
                        Logout
                    </button>
                </header>
                <div className="flex lg:flex-row flex-col gap-6">
                    <div className="lg:w-4/12">
                        <div className="bg-green-50 shadow-sm p-6 border border-slate-200 rounded-2xl">
                            <div className="mb-6">
                                <p className="font-semibold text-emerald-600 text-xs uppercase tracking-[0.2em]">
                                    New Details
                                </p>
                                {/* <h1 className="mt-2 font-semibold text-slate-900 text-2xl">
                Contact the team
              </h1>
              <p className="mt-2 text-slate-600 text-sm">
                Send a quick note and we will get back to you within one business day.
              </p> */}
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <label htmlFor="employeeName" className="block">
                                    <span className="font-medium text-slate-700 text-sm">employee</span>
                                    <input
                                        type="text"
                                        id="employeeName"
                                        placeholder="john doe"
                                        className="bg-white shadow-sm mt-2 px-3 py-2 border border-slate-300 focus:border-emerald-400 rounded-lg outline-none focus:ring-2 focus:ring-emerald-100 w-full text-slate-900 text-sm transition"
                                        // {...register('employeeName', { required: "employeeName required" })}
                                        {...register('employeeName')}
                                    />
                                    {errors.employeeName && <span className="text-red-500 text-xs">{errors.employeeName.message}</span>}
                                </label>
                                <label htmlFor="company" className="block">
                                    <span className="font-medium text-slate-700 text-sm">company</span>
                                    <input
                                        type="text"
                                        id="company"
                                        placeholder="enter company name"
                                        className="bg-white shadow-sm mt-2 px-3 py-2 border border-slate-300 focus:border-emerald-400 rounded-lg outline-none focus:ring-2 focus:ring-emerald-100 w-full text-slate-900 text-sm transition"
                                        // {...register('company', { required: "company name is required" })}
                                        {...register('company')}
                                    />
                                    {errors.company && <span className="text-red-300 text-xs">{errors.company.message}</span>}
                                </label>

                                <div className="flex justify-end">
                                    <button
                                        className="bg-emerald-600 hover:bg-emerald-500 shadow-sm px-5 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200 font-semibold text-white text-sm transition"
                                        type="submit"
                                    >
                                        {editUser ? "Update" : deleteUser ? "Delete" : "Submit"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='border-gray-200 border-r'></div>
                    <div className="lg:w-8/12">
                        <div className="bg-white shadow-sm p-6 border border-slate-200 rounded-2xl">
                            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                                <div>
                                    <h2 className="font-semibold text-slate-900 text-lg">Latest users</h2>
                                    <p className="mt-1 text-slate-600 text-sm">
                                        Quick snapshot of the most recent entries.
                                    </p>
                                </div>
                                {/* <button
                                    className="bg-white px-3 py-2 border border-slate-200 hover:border-slate-300 rounded-lg font-semibold text-slate-600 hover:text-slate-800 text-xs uppercase tracking-wide transition"
                                    type="button"
                                >
                                    View all
                                </button> */}
                            </div>
                            <div className="overflow-x-auto">
                                <div className='max-h-[400px] overflow-y-auto'>
                                    <table className="divide-y divide-slate-200 min-w-full text-sm">
                                        <thead className="bg-slate-50 text-left">
                                            <tr className="font-semibold text-slate-500 text-xs uppercase tracking-wide">
                                                <th className="px-3 py-2">Employee</th>
                                                <th className="px-3 py-2">Company</th>
                                                <th className="px-3 py-2">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {users.length === 0 ? (
                                                <tr className="text-slate-700">
                                                    <td className="px-3 py-3" >No Data</td>
                                                </tr>
                                            ) : (
                                                users.map((user) => (
                                                    <tr className="text-slate-700" key={user._id}>
                                                        <td className="px-3 py-3 font-medium text-slate-900">
                                                            {user.employeeName}
                                                        </td>
                                                        <td className="px-3 py-3">{user.company}</td>
                                                        <td className="px-4 py-2">
                                                            <button
                                                                className="bg-blue-200 mr-2 px-3 py-1 rounded"
                                                                type='button'
                                                                onClick={() => handleEdit(user)}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="bg-red-200 px-3 py-1 rounded"
                                                                onClick={() => handleDelete(user._id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard
