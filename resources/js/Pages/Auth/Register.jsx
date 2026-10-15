
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Package, ShieldCheck } from 'lucide-react';

export default function Register() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        form.post(route('register'));
    };

    return (
        <>
            <Head title="Register | Simple Product Manager" />

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
                            Get started.
                            <span className="mt-2 block text-blue-100">
                                Keep your products organized.
                            </span>
                        </h1>

                        <p className="relative mt-6 text-base leading-8 text-blue-100">
                            Create your account and get a simple workspace for
                            managing product names, descriptions, prices, and quantities.
                        </p>

                        <div className="relative mt-8 flex items-center gap-3 text-sm text-blue-100">
                            <ShieldCheck size={19} />
                            <span>Your product management starts here.</span>
                        </div>
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

                        <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 lg:hidden">
                            <Package size={25} />
                        </div>

                        <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Create an account
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                            Get started today
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-slate-500">
                            Fill in your details to create your account.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Full name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    required
                                    maxLength={255}
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                    placeholder="Your full name"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="username"
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
                                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    autoComplete="new-password"
                                    required
                                    value={form.data.password}
                                    onChange={(event) => form.setData('password', event.target.value)}
                                    placeholder="Create a password"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.password && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Confirm password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    autoComplete="new-password"
                                    required
                                    value={form.data.password_confirmation}
                                    onChange={(event) => form.setData('password_confirmation', event.target.value)}
                                    placeholder="Enter your password again"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.password_confirmation && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {form.errors.password_confirmation}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={form.processing}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
                            >
                                {form.processing ? 'Creating account...' : 'Create account'}
                                {!form.processing && <ArrowRight size={17} />}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-500">
                            Already have an account?{' '}
                            <Link
                                href={route('login')}
                                className="font-semibold text-blue-600 hover:text-blue-800"
                            >
                                Log in
                            </Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
