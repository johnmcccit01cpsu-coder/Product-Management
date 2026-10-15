
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Boxes,
    FileText,
    Package,
    ShieldCheck,
    LogOut,
    LayoutDashboard,
} from 'lucide-react';

export default function Welcome({ canLogin = true, canRegister = true }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const isLoggedIn = Boolean(user);

    const logoutForm = useForm({});

    const handleLogout = (event) => {
        event.preventDefault();
        logoutForm.post(route('logout'));
    };

    return (
        <>
            <Head title="Simple Product Manager" />

            <div className="min-h-screen bg-white text-slate-950">
                <header className="border-b border-slate-200 bg-white">
                    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                                <Package size={23} />
                            </div>
                            <div>
                                <span className="block text-lg font-bold tracking-tight">
                                    Simple Product Manager
                                </span>
                                <span className="block text-xs text-slate-500">
                                    Manage products with ease
                                </span>
                            </div>
                        </Link>

                        <nav className="flex items-center gap-2 sm:gap-3">
                            {isLoggedIn ? (
                                <>
                                    <span className="hidden text-sm text-slate-500 md:inline">
                                        Welcome, {user.name}
                                    </span>

                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-5"
                                    >
                                        <LayoutDashboard size={17} />
                                        Dashboard
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        disabled={logoutForm.processing}
                                        className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 sm:px-4"
                                    >
                                        <LogOut size={17} />
                                        <span className="hidden sm:inline">
                                            {logoutForm.processing ? 'Logging out...' : 'Log out'}
                                        </span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    {canLogin && (
                                        <Link
                                            href={route('login')}
                                            className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                        >
                                            Log in
                                        </Link>
                                    )}

                                    {canRegister && (
                                        <Link
                                            href={route('register')}
                                            className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-5"
                                        >
                                            Get started
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main>
                    <section className="overflow-hidden bg-gradient-to-b from-blue-50 to-white">
                        <div className="mx-auto grid min-h-[570px] max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-24">
                            <div>
                                <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700">
                                    <Boxes size={16} />
                                    Easy product management
                                </span>

                                <h1 className="mt-7 max-w-xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
                                    Manage your products.
                                    <span className="mt-1 block text-blue-600">
                                        Keep things simple.
                                    </span>
                                </h1>

                                <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
                                    Keep your product information organized in one place.
                                    Add products, update details, check prices, and manage
                                    your list without unnecessary complications.
                                </p>

                                <div className="mt-9 flex flex-wrap gap-3">
                                    {isLoggedIn ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                        >
                                            Go to dashboard
                                            <ArrowRight size={18} />
                                        </Link>
                                    ) : (
                                        <>
                                            {canRegister && (
                                                <Link
                                                    href={route('register')}
                                                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
                                                >
                                                    Create an account
                                                    <ArrowRight size={18} />
                                                </Link>
                                            )}

                                            {canLogin && (
                                                <Link
                                                    href={route('login')}
                                                    className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                                                >
                                                    I already have an account
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
                                    <ShieldCheck size={18} className="text-blue-600" />
                                    <span>Simple, organized, and easy to use.</span>
                                </div>
                            </div>

                            <div className="mx-auto w-full max-w-lg">
                                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-950/10 sm:p-7">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                                        <div>
                                            <p className="text-sm text-slate-500">
                                                Product overview
                                            </p>
                                            <h2 className="mt-1 text-xl font-bold">
                                                Your products
                                            </h2>
                                        </div>
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                            <Package size={23} />
                                        </div>
                                    </div>

                                    <div className="mt-5 grid grid-cols-2 gap-4">
                                        <div className="rounded-2xl bg-blue-50 p-5">
                                            <p className="text-sm text-slate-500">
                                                Total products
                                            </p>
                                            <p className="mt-3 text-3xl font-bold text-blue-700">
                                                12
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-slate-950 p-5 text-white">
                                            <p className="text-sm text-slate-400">
                                                Product categories
                                            </p>
                                            <p className="mt-3 text-3xl font-bold">
                                                4
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <div className="mb-4 flex items-center justify-between">
                                            <h3 className="font-bold">Recent products</h3>
                                            <span className="text-xs text-slate-400">
                                                Example preview
                                            </span>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                                    <Package size={20} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold">
                                                        Notebook
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Office supplies
                                                    </p>
                                                </div>
                                                <p className="text-sm font-bold">₱50.00</p>
                                            </div>

                                            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                                    <Package size={20} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold">
                                                        Ballpen
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        School supplies
                                                    </p>
                                                </div>
                                                <p className="text-sm font-bold">₱15.00</p>
                                            </div>

                                            <div className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
                                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                                    <Package size={20} />
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold">
                                                        Folder
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Office supplies
                                                    </p>
                                                </div>
                                                <p className="text-sm font-bold">₱20.00</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-500">
                                        Sample data for design preview only
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-slate-200 bg-white py-20 sm:py-24">
                        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                                    Simple features
                                </p>
                                <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                    Everything you need to manage products.
                                </h2>
                                <p className="mt-4 leading-7 text-slate-600">
                                    No complicated tools. Just the basic features that help
                                    you keep your products organized.
                                </p>
                            </div>

                            <div className="mt-12 grid gap-6 md:grid-cols-3">
                                <article className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-blue-200 hover:shadow-lg">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <Boxes size={24} />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold">
                                        Add products
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Add a product name, description, price, and quantity
                                        using a straightforward form.
                                    </p>
                                </article>

                                <article className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-blue-200 hover:shadow-lg">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FileText size={24} />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold">
                                        View and update
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        See your product list and edit product details
                                        whenever you need to.
                                    </p>
                                </article>

                                <article className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-blue-200 hover:shadow-lg">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold">
                                        Keep data organized
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        Save your product information in a database and
                                        access it when you log in.
                                    </p>
                                </article>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-slate-200 bg-slate-950 text-white">
                    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600">
                                <Package size={19} />
                            </div>
                            <span className="font-bold">
                                Simple Product Manager
                            </span>
                        </Link>

                        <p className="text-sm text-slate-400">
                            A simple way to keep your products organized.
                        </p>

                        <p className="text-xs text-slate-500">
                            © {new Date().getFullYear()} Simple Product Manager
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
