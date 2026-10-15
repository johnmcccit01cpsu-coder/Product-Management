
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Boxes,
    Clock,
    DollarSign,
    LayoutDashboard,
    LogOut,
    Menu,
    Package,
    Plus,
    X,
} from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({
    totalProducts = 0,
    totalQuantity = 0,
    inventoryValue = 0,
    recentProducts = [],
}) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const firstName = user?.name?.trim()?.split(/\s+/)[0] || 'there';

    const [menuOpen, setMenuOpen] = useState(false);
    const logoutForm = useForm({});

    const handleLogout = (event) => {
        event.preventDefault();
        logoutForm.post(route('logout'));
    };

    const formatPrice = (price) =>
        Number(price || 0).toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        });

    const formatDate = (date) => {
        if (!date) return 'Recently';

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) return 'Recently';

        return parsedDate.toLocaleDateString('en-PH', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const navigation = [
        {
            label: 'Dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
            active: true,
        },
        {
            label: 'Products',
            href: '/products',
            icon: Package,
            active: false,
        },
    ];

    return (
        <>
            <Head title="Dashboard | Simple Product Manager" />

            <div className="min-h-screen bg-slate-50 text-slate-950">
                <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white md:flex">
                    <Link
                        href="/"
                        className="flex h-20 items-center gap-3 border-b border-slate-100 px-6"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                            <Package size={22} />
                        </div>
                        <div>
                            <span className="block font-bold tracking-tight">
                                Simple Product
                            </span>
                            <span className="text-xs text-slate-500">Manager</span>
                        </div>
                    </Link>

                    <div className="px-4 pt-8">
                        <p className="px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                            Menu
                        </p>

                        <nav className="mt-4 space-y-1">
                            {navigation.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                            item.active
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-blue-700'
                                        }`}
                                    >
                                        <Icon size={19} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="mt-auto border-t border-slate-100 p-4">
                        <div className="mb-4 rounded-xl bg-blue-50 p-4">
                            <p className="text-sm font-semibold text-blue-900">
                                Keep it simple
                            </p>
                            <p className="mt-2 text-xs leading-5 text-slate-600">
                                Keep all your product information organized in one place.
                            </p>
                        </div>

                        <form onSubmit={handleLogout}>
                            <button
                                type="submit"
                                disabled={logoutForm.processing}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
                            >
                                <LogOut size={18} />
                                {logoutForm.processing ? 'Logging out...' : 'Log out'}
                            </button>
                        </form>
                    </div>
                </aside>

                <div className="md:pl-64">
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                        <div className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden"
                                >
                                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                                </button>

                                <div>
                                    <p className="text-xs text-slate-500">Workspace</p>
                                    <h1 className="font-bold tracking-tight">Dashboard</h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="hidden text-right sm:block">
                                    <p className="text-sm font-semibold">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-slate-500">My account</p>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                    {firstName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {menuOpen && (
                            <div className="border-t border-slate-200 bg-white p-4 md:hidden">
                                <nav className="space-y-1">
                                    {navigation.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                                                    item.active
                                                        ? 'bg-blue-50 text-blue-700'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                <Icon size={19} />
                                                {item.label}
                                            </Link>
                                        );
                                    })}

                                    <form onSubmit={handleLogout}>
                                        <button
                                            type="submit"
                                            disabled={logoutForm.processing}
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-slate-600 hover:bg-slate-50"
                                        >
                                            <LogOut size={19} />
                                            Log out
                                        </button>
                                    </form>
                                </nav>
                            </div>
                        )}
                    </header>

                    <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
                        <section className="rounded-3xl bg-blue-600 px-6 py-8 text-white sm:px-9 sm:py-10">
                            <p className="text-sm font-medium text-blue-100">
                                Your workspace
                            </p>

                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Welcome back, {firstName}!
                            </h2>

                            <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                                Manage your products in one place. Add new items,
                                update their details, and keep your product list organized.
                            </p>

                            <Link
                                href="/products"
                                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                            >
                                View products
                                <ArrowRightIcon />
                            </Link>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold tracking-tight">
                                Inventory overview
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                The latest information from your product database.
                            </p>

                            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <Package size={23} />
                                    </div>
                                    <p className="mt-5 text-sm font-medium text-slate-500">
                                        Total products
                                    </p>
                                    <p className="mt-2 text-3xl font-bold">
                                        {totalProducts}
                                    </p>
                                    <p className="mt-2 text-xs text-slate-400">
                                        Different products saved.
                                    </p>
                                </article>

                                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <Boxes size={23} />
                                    </div>
                                    <p className="mt-5 text-sm font-medium text-slate-500">
                                        Total quantity
                                    </p>
                                    <p className="mt-2 text-3xl font-bold">
                                        {Number(totalQuantity).toLocaleString()}
                                    </p>
                                    <p className="mt-2 text-xs text-slate-400">
                                        Units across all products.
                                    </p>
                                </article>

                                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                        <DollarSign size={23} />
                                    </div>
                                    <p className="mt-5 text-sm font-medium text-slate-500">
                                        Inventory value
                                    </p>
                                    <p className="mt-2 break-words text-2xl font-bold">
                                        {formatPrice(inventoryValue)}
                                    </p>
                                    <p className="mt-2 text-xs text-slate-400">
                                        Price multiplied by quantity.
                                    </p>
                                </article>
                            </div>
                        </section>

                        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight">
                                        Recent products
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Your five most recently added products.
                                    </p>
                                </div>

                                <Link
                                    href="/products"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                                >
                                    View all products
                                    <ArrowRightIcon />
                                </Link>
                            </div>

                            {recentProducts.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[550px] text-left">
                                        <thead className="bg-slate-50">
                                            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                <th className="px-5 py-4">Product</th>
                                                <th className="px-5 py-4">Price</th>
                                                <th className="px-5 py-4">Quantity</th>
                                                <th className="px-5 py-4">Added</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {recentProducts.map((product) => (
                                                <tr key={product.id} className="hover:bg-slate-50">
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                                                                <Package size={18} />
                                                            </div>
                                                            <span className="text-sm font-semibold">
                                                                {product.name}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-5 py-4 text-sm">
                                                        {formatPrice(product.price)}
                                                    </td>
                                                    <td className="px-5 py-4 text-sm">
                                                        {product.quantity}
                                                    </td>
                                                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                                                        {formatDate(product.created_at)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-6 py-12 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Package size={25} />
                                    </div>
                                    <h3 className="mt-4 font-semibold">
                                        No products yet
                                    </h3>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Add your first product to see it here.
                                    </p>
                                    <Link
                                        href="/products"
                                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                                    >
                                        <Plus size={17} />
                                        Add a product
                                    </Link>
                                </div>
                            )}
                        </section>

                        <footer className="border-t border-slate-200 pt-5">
                            <p className="text-xs text-slate-400">
                                Simple Product Manager · Keep your products organized.
                            </p>
                        </footer>
                    </main>
                </div>
            </div>
        </>
    );
}

function ArrowRightIcon() {
    return <ArrowRight size={16} />;
}
