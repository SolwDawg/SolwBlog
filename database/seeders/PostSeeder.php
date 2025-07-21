<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get existing categories and users
        $categories = Category::all();
        $users = User::all();

        if ($categories->isEmpty()) {
            $this->command->warn('No categories found. Please run CategorySeeder first.');
            return;
        }

        if ($users->isEmpty()) {
            $this->command->warn('No users found. Creating a default user.');
            User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
            ]);
        }

        // Create posts with existing categories
        Post::factory(50)->create([
            'category_id' => fn() => $categories->random()->id,
        ]);

        $this->command->info('Created 50 posts successfully!');
    }
}
