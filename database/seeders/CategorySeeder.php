<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create specific categories first
        $categories = [
            'Công nghệ',
            'Lập trình',
            'AI & Machine Learning',
            'Web Development',
            'Mobile Development',
            'DevOps',
            'Database',
            'Bảo mật',
            'UI/UX Design',
            'Khởi nghiệp'
        ];

        foreach ($categories as $categoryName) {
            Category::firstOrCreate(['name' => $categoryName]);
        }

        // Create additional random categories if needed
        Category::factory(5)->create();
    }
}
