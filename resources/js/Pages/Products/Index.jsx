
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import {
    ArrowDownUp,
    Boxes,
    House,
    LogOut,
    Menu,
    Package,
    Pencil,
    Plus,
    Search,
    Trash2,
    X,
} from 'lucide-react';
import { useMemo, useState } from 'react';

export default function Index({ products = [] }) {
    const { auth, flash } = usePage().props;
    const user = auth?.user;

    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const form = useForm({
        name: '',
        description: '',
        price: '',
        quantity: '0',
    });

    const logoutForm = useForm({});

    const firstName = user?.name?.trim()?.split(/\s+/)[0] || 'there';

    const filteredProducts = useMemo(() => {
        const query = search.trim().toLowerCase();

        return products.filter((product) => {
            return (
                product.name?.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query)
            );
        });
    }, [products, search]);

    const totalQuantity = products.reduce(
        (total, product) => total + Number(product.quantity || 0),
        0,
    );

    const totalValue = products.reduce(
        (total, product) =>
            total + Number(product.price || 0) * Number(product.quantity || 0),
        0,
    );

    const formatPrice = (price) =>
        Number(price || 0).toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
        });

    const openCreateForm = () => {
        setEditingProduct(null);
        form.clearErrors();
        form.setData({
            name: '',
            description: '',
            price: '',
            quantity: '0',
        });
        setFormOpen(true);
    };

    const openEditForm = (product) => {
        setEditingProduct(product);
        form.clearErrors();
        form.setData({
            name: product.name ?? '',
            description: product.description ?? '',
            price: String(product.price ?? ''),
            quantity: String(product.quantity ?? 0),
        });
        setFormOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setEditingProduct(null);
        form.clearErrors();
        form.reset();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const options = {
            preserveScroll: true,
            onSuccess: () => closeForm(),
        };

        if (editingProduct) {
            form.put(route('products.update', editingProduct.id), options);
        } else {
            form.post(route('products.store'), options);
        }
    };

    const handleDelete = () => {
        if (!deleteTarget) return;

        router.delete(route('products.destroy', deleteTarget.id), {
            preserveScroll: true,
            onSuccess: () => setDeleteTarget(null),
            onError: () => setDeleteTarget(null),
        });
    };

    const handleLogout = (event) => {
        event.preventDefault();
        logoutForm.post(route('logout'));
    };

    const navigation = [
        { label: 'Dashboard', href: '/dashboard', icon: House },
        { label: 'Products', href: '/products', icon: Package },
    ];

    return (
        <>
            <Head title="Products | Simple Product Manager" />

            <div className="min-h-screen bg-slate-50 text-slate-950">
                <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
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
                                const active = item.label === 'Products';

                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                                            active
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
                                All your product details in one place.
                            </p>
                        </div>

                        <form onSubmit={handleLogout}>
                            <button
                                type="submit"
                                disabled={logoutForm.processing}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
                            >
                                <LogOut size={18} />
                                {logoutForm.processing ? 'Logging out...' : 'Log out'}
                            </button>
                        </form>
                    </div>
                </aside>

                <div className="lg:pl-64">
                    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                        <div className="flex h-[72px] items-center justify-between px-5 sm:px-8 lg:px-10">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                                    className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                                >
                                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                                </button>

                                <div>
                                    <p className="text-xs text-slate-500">Workspace</p>
                                    <h1 className="font-bold tracking-tight">Products</h1>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="hidden text-sm font-medium text-slate-600 sm:block">
                                    {firstName}
                                </span>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                    {firstName.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        </div>

                        {menuOpen && (
                            <div className="border-t border-slate-200 bg-white p-4 lg:hidden">
                                <nav className="space-y-1">
                                    {navigation.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setMenuOpen(false)}
                                                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${
                                                    item.label === 'Products'
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
                        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                            <div>
                                <p className="text-sm font-medium text-blue-600">
                                    Product management
                                </p>
                                <h2 className="mt-2 text-3xl font-bold tracking-tight">
                                    Your products
                                </h2>
                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Add, update, and manage your product information.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={openCreateForm}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                <Plus size={18} />
                                Add product
                            </button>
                        </section>

                        {flash?.success && (
                            <div
                                role="status"
                                className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                            >
                                {flash.success}
                            </div>
                        )}

                        <section className="grid gap-5 sm:grid-cols-3">
                            <article className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Package size={22} />
                                </div>
                                <p className="mt-4 text-sm text-slate-500">
                                    Total products
                                </p>
                                <p className="mt-1 text-2xl font-bold">
                                    {products.length}
                                </p>
                            </article>

                            <article className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Boxes size={22} />
                                </div>
                                <p className="mt-4 text-sm text-slate-500">
                                    Total quantity
                                </p>
                                <p className="mt-1 text-2xl font-bold">
                                    {totalQuantity.toLocaleString()}
                                </p>
                            </article>

                            <article className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <ArrowDownUp size={22} />
                                </div>
                                <p className="mt-4 text-sm text-slate-500">
                                    Inventory value
                                </p>
                                <p className="mt-1 text-2xl font-bold">
                                    {formatPrice(totalValue)}
                                </p>
                            </article>
                        </section>

                        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                            <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-bold">Product list</h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {products.length} product{products.length === 1 ? '' : 's'} saved
                                    </p>
                                </div>

                                <div className="relative w-full sm:max-w-xs">
                                    <Search
                                        size={17}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input
                                        type="search"
                                        value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                        placeholder="Search products..."
                                        aria-label="Search products"
                                        className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            {filteredProducts.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[760px] text-left">
                                        <thead className="bg-slate-50">
                                            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                <th className="px-5 py-4">Product</th>
                                                <th className="px-5 py-4">Price</th>
                                                <th className="px-5 py-4">Quantity</th>
                                                <th className="px-5 py-4">Value</th>
                                                <th className="px-5 py-4 text-right">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-slate-100">
                                            {filteredProducts.map((product) => (
                                                <tr key={product.id} className="transition hover:bg-slate-50">
                                                    <td className="max-w-sm px-5 py-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                                                <Package size={19} />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="break-words text-sm font-semibold text-slate-900">
                                                                    {product.name}
                                                                </p>
                                                                <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                                                                    {product.description || 'No description'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium">
                                                        {formatPrice(product.price)}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                                                            Number(product.quantity) === 0
                                                                ? 'bg-red-50 text-red-700'
                                                                : 'bg-blue-50 text-blue-700'
                                                        }`}>
                                                            {product.quantity}
                                                        </span>
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium">
                                                        {formatPrice(Number(product.price) * Number(product.quantity))}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => openEditForm(product)}
                                                                aria-label={`Edit ${product.name}`}
                                                                className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
                                                            >
                                                                <Pencil size={17} />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => setDeleteTarget(product)}
                                                                aria-label={`Delete ${product.name}`}
                                                                className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                                            >
                                                                <Trash2 size={17} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="px-6 py-16 text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <Package size={26} />
                                    </div>

                                    <h3 className="mt-5 font-bold text-slate-900">
                                        {search ? 'No matching products' : 'No products yet'}
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                                        {search
                                            ? 'Try another search term.'
                                            : 'Add your first product to start building your product list.'}
                                    </p>

                                    {search ? (
                                        <button
                                            type="button"
                                            onClick={() => setSearch('')}
                                            className="mt-5 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                        >
                                            Clear search
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={openCreateForm}
                                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                                        >
                                            <Plus size={17} />
                                            Add your first product
                                        </button>
                                    )}
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

            {formOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="product-form-title"
                        className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                    <Package size={22} />
                                </div>
                                <h2 id="product-form-title" className="mt-4 text-2xl font-bold tracking-tight">
                                    {editingProduct ? 'Edit product' : 'Add product'}
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Enter the product details below.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                aria-label="Close product form"
                                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                            <div>
                                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Product name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    maxLength={255}
                                    value={form.data.name}
                                    onChange={(event) => form.setData('name', event.target.value)}
                                    placeholder="Enter product name"
                                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.name && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="description" className="mb-2 block text-sm font-semibold text-slate-800">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={3}
                                    maxLength={2000}
                                    value={form.data.description}
                                    onChange={(event) => form.setData('description', event.target.value)}
                                    placeholder="Optional product description"
                                    className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                />
                                {form.errors.description && (
                                    <p className="mt-2 text-sm text-red-600">{form.errors.description}</p>
                                )}
                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="price" className="mb-2 block text-sm font-semibold text-slate-800">
                                        Price (₱)
                                    </label>
                                    <input
                                        id="price"
                                        type="number"
                                        required
                                        min="0"
                                        max="99999999.99"
                                        step="0.01"
                                        value={form.data.price}
                                        onChange={(event) => form.setData('price', event.target.value)}
                                        placeholder="0.00"
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    />
                                    {form.errors.price && (
                                        <p className="mt-2 text-sm text-red-600">{form.errors.price}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="quantity" className="mb-2 block text-sm font-semibold text-slate-800">
                                        Quantity
                                    </label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        required
                                        min="0"
                                        step="1"
                                        value={form.data.quantity}
                                        onChange={(event) => form.setData('quantity', event.target.value)}
                                        placeholder="0"
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                                    />
                                    {form.errors.quantity && (
                                        <p className="mt-2 text-sm text-red-600">{form.errors.quantity}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={form.processing}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {form.processing
                                        ? 'Saving...'
                                        : editingProduct
                                            ? 'Save changes'
                                            : 'Add product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {deleteTarget && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div
                        role="alertdialog"
                        aria-modal="true"
                        aria-labelledby="delete-title"
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <Trash2 size={22} />
                        </div>

                        <h2 id="delete-title" className="mt-5 text-xl font-bold">
                            Delete this product?
                        </h2>
                        <p className="mt-3 break-words text-sm leading-6 text-slate-500">
                            Are you sure you want to delete "{deleteTarget.name}"? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setDeleteTarget(null)}
                                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                Delete product
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
