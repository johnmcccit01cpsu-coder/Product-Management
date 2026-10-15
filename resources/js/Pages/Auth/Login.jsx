
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Package, LockKeyhole } from 'lucide-react';

export default function Login({ status, canResetPassword = true }) {
    const form = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        form.post(route('login'));
    };

    return (
        <>
            <Head title="Login | Simple Product Manager" />

            <main className="flex min-h-screen bg-white">
                <section className="relative hidden overflow-hidden bg-blue-600 px-12 py-12 text-white lg:flex lg:w-1/2 lg:flex-col lg:justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-700">
                            <Package size={24} />
                        </div>
                        <span className="text-xl font-bold">
                            Simple Product Manager
                        </span>
                    </Link>

                    <div className="relative max-w-lg">
                        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[45px] border-white/10" />

                        <h1 className="relative text-5xl font-bold leading-tight tracking-tight">
                            Welcome back.
                            <span className="mt-2 block text-blue-100">
                                Let's manage your products.
                            </span>
                        </h1>

                        <p className="relative mt-6 text-base leading-8 text-blue-100">
                            Log in to organize your products, update information,
                            and keep everything in one convenient place.
                        </p>
                    </div>

                    <p className="text-sm text-blue-100">
                        Simple tools. Organized products.
                    </p>
                </section>

                <section className="flex w-full items-center justify-center px-5 py-12 sm:px-10 lg:w-1/2">
                    <div className="w-full max-w-md">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
                        >
                            <ArrowLeft size={16} />
                            Back to home
                        </Link>

                        <div className="mt-10 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 lg:hidden">
                            <Package size={25} />
                        </div>

                        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Welcome back
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            Log in to your account
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Enter your details to continue to your dashboard.
                        </p>

                        {status && (
                            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                {status}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="username"
                                    autoFocus
                                    required
                                    value={form.data.email}
                                    onChange={(event) => form.setData('email', event.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.email && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.email}</p>
                                )}
                            </div>

                            <div>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <label htmlFor="password" className="text-sm font-semibold text-slate-800">
                                        Password
                                    </label>

                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-xs font-semibold text-blue-600 hover:text-blue-800"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    value={form.data.password}
                                    onChange={(event) => form.setData('password', event.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.password}</p>
                                )}
                            </div>

                            <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-600">
                                <input
                                    type="checkbox"
                                    checked={form.data.remember}
                                    onChange={(event) => form.setData('remember', event.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                />
                                Remember me
                            </label>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                            >
                                {form.processing ? 'Logging in...' : 'Log in'}
                                {!form.processing && <ArrowRight size={17} />}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-500">
                            Don't have an account?{' '}
                            <Link
                                href={route('register')}
                                className="font-semibold text-blue-600 hover:text-blue-800"
                            >
                                Create an account
                            </Link>
                        </p>

                        <div className="mt-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <LockKeyhole size={18} className="mt-0.5 shrink-0 text-blue-600" />
                            <p className="text-xs leading-6 text-slate-500">
                                Your account lets you access and manage your product list.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
