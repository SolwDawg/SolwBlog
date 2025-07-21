<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Công nghệ',
                'Lập trình',
                'AI & Machine Learning',
                'Web Development',
                'Mobile Development',
                'DevOps',
                'Database',
                'Bảo mật',
                'UI/UX Design',
                'Khởi nghiệp',
                'Kinh doanh',
                'Marketing',
                'Đời sống',
                'Du lịch',
                'Ẩm thực',
                'Sức khỏe',
                'Thể thao',
                'Giáo dục',
                'Khoa học',
                'Tin tức'
            ])
        ];
    }
}
