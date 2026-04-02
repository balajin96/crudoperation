import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

const API = import.meta.env.VITE_SERVER_URL ||
    import.meta.env.VITE_BACKEND_URL;

const schema = z.object({
    email: z.string().email('Enter a valid email address'),
    password: z.string().min(3, 'Password must be at least 6 characters').max(10, 'password must be less than 20 characters'),
})

const Signup = () => {
    const [status, setStatus] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (!status) return
        const timer = setTimeout(() => setStatus(null), 4000)
        return () => clearTimeout(timer)
    }, [status])
    const onSubmit = async formData => {
        try {
            const res = await axios.post(`${API}/signup/`, formData);
            console.log(res);

            setStatus({ type: 'success', message: res.data?.message ?? 'Account created' })
            reset()
        } catch (error) {
            setStatus({
                type: 'error',
                message: error.response?.data?.message ?? error.message,
            })
        }
    }

    return (
        <div className="flex justify-center items-center bg-slate-900 px-4 py-12 min-h-screen">
            <form
                className="space-y-6 bg-slate-800/80 shadow-lg shadow-slate-900/50 backdrop-blur p-8 rounded-2xl w-full max-w-md"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <p className="font-semibold text-green-300 text-sm uppercase tracking-[0.3em]">
                        Welcome
                    </p>
                    <h2 className="mt-3 font-bold text-white text-3xl">Create your account</h2>
                    <p className="mt-2 text-slate-300 text-sm">
                        Start managing your data with a secure password and verified email.
                    </p>
                </div>

                {status && (
                    <div
                        className={`rounded-lg border px-4 py-2 text-sm ${status.type === 'success'
                            ? 'border-green-500/70 bg-green-500/10 text-green-200'
                            : 'border-rose-500/70 bg-rose-500/10 text-rose-200'
                            }`}
                    >
                        {status.message}
                    </div>
                )}

                <div className="space-y-1">
                    <label htmlFor="email" className="font-medium text-slate-300 text-sm">
                        Email
                    </label>
                    <input
                        id="email"
                        {...register('email')}
                        type="email"
                        placeholder="you@example.com"
                        className="bg-slate-900/40 px-4 py-3 border border-slate-700 focus:border-emerald-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/60 w-full text-white placeholder:text-slate-500 text-sm"
                    />
                    {errors.email && (
                        <p className="text-rose-300 text-xs">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="password" className="font-medium text-slate-300 text-sm">
                        Password
                    </label>
                    <input
                        id="password"
                        {...register('password')}
                        type="password"
                        placeholder="••••••••"
                        className="bg-slate-900/40 px-4 py-3 border border-slate-700 focus:border-emerald-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400/60 w-full text-white placeholder:text-slate-500 text-sm"
                    />
                    {errors.password && (
                        <p className="text-rose-300 text-xs">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-emerald-400 to-cyan-400 disabled:opacity-60 hover:brightness-110 px-4 py-3 rounded-xl w-full font-semibold text-slate-900 text-sm uppercase tracking-widest transition"
                >
                    {isSubmitting ? 'Creating…' : 'Sign up'}
                </button>

                <p className="text-slate-500 text-xs text-center">
                    By continuing you agree to our privacy policy & terms.
                </p>
                <a href="/login" className="block text-emerald-400 hover:text-emerald-300 text-sm text-center hover:underline">
                    Already have an account? Log in
                </a>
            </form>
        </div>
    )
}

export default Signup
