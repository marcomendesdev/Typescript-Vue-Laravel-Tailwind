<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ProductResource::collection(Product::paginate(4));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $validatedData = $request->validated();

        $user = auth()->user();

        $product = new Product([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'price' => $validatedData['price'],
            'user_id' => $validatedData['user_id'],
            'image' => $validatedData['image'],
        ]);

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $filename = time() . '.' . $image->getClientOriginalExtension();

            $image->storeAs('public/images', $filename);

            $product->image = asset('storage/images/' . $filename);
        }
        /** @var \App\Models\Product $user */
        $user->products()->save($product);

        return new ProductResource($product);
    }



    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $user = Auth::user();
        /** @var \App\Models\User $user */
        $products = Product::where('user_id', $user->id)->get();

        return ProductResource::collection($products);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $productData = $request->validated();

        if ($request->hasFile('image')) {
            $image_path = public_path('storage/images/' . $product->image);
            if (file_exists($image_path)) {
                unlink($image_path);
            }

            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/images', $filename);
            $productData['image'] = url('storage/images/' . $filename);
        } else {
            $productData['image'] = $product->image;
        }

        $product->update($productData);

        $product->refresh();

        return new ProductResource($product);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return response(['message' => 'Product deleted']);
    }
}
