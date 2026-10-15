
<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $recentProducts = Product::query()
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'price', 'quantity', 'created_at']);

        $inventoryValue = Product::query()
            ->selectRaw('COALESCE(SUM(price * quantity), 0) as total')
            ->value('total');

        return Inertia::render('Dashboard', [
            'totalProducts' => Product::count(),
            'totalQuantity' => Product::sum('quantity'),
            'inventoryValue' => $inventoryValue,
            'recentProducts' => $recentProducts,
        ]);
    })->name('dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/products', [ProductController::class, 'index'])
        ->name('products.index');

    Route::post('/products', [ProductController::class, 'store'])
        ->name('products.store');

    Route::put('/products/{product}', [ProductController::class, 'update'])
        ->name('products.update');

    Route::delete('/products/{product}', [ProductController::class, 'destroy'])
        ->name('products.destroy');

    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__.'/auth.php';
