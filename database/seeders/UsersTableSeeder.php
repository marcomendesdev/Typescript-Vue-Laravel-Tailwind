<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Create 10 users
        $users = User::factory()->count(10)->create();

        // Create 5 products for each user
        foreach ($users as $user) {
            Product::factory()->count(5)->create([
                'user_id' => $user->id,
            ]);
        }
    }
}
