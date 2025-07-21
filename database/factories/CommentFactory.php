<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $comments = [
            'Bài viết rất hay và bổ ích! Cảm ơn tác giả đã chia sẻ.',
            'Mình đã áp dụng được những gì bạn chia sẻ và thấy hiệu quả rất tốt.',
            'Có thể giải thích thêm về phần này được không?',
            'Thông tin rất chi tiết và dễ hiểu. Thanks bạn!',
            'Mình cũng đang gặp vấn đề tương tự, bài viết này giúp ích rất nhiều.',
            'Bạn có thể recommend thêm một số tài liệu khác không?',
            'Code example rất clear, mình đã test thành công rồi.',
            'Bài viết quality cao, mong bạn viết thêm nhiều bài nữa.',
            'Approach này mình chưa biết, sẽ thử nghiệm xem sao.',
            'Cảm ơn bạn đã chia sẻ kinh nghiệm thực tế.',
            'Documentation rất tốt, giúp mình hiểu rõ hơn về vấn đề này.',
            'Best practices rất hữu ích, mình sẽ apply vào project.',
            'Có vẻ interesting, mình sẽ tìm hiểu thêm.',
            'Tutorial step-by-step rất dễ follow. Excellent!',
            'Mình đã bookmark bài này để reference sau.',
            'Performance improvement thực sự impressive!',
            'Cách giải quyết vấn đề rất creative, học được nhiều.',
            'Code structure clean và maintainable. Like it!',
            'Explanation rất clear, newbie cũng có thể hiểu được.',
            'Real-world example rất practical và useful.'
        ];

        return [
            'content' => $this->faker->randomElement($comments),
            'user_id' => User::factory(),
            'post_id' => Post::factory(),
            'created_at' => $this->faker->dateTimeBetween('-3 months', 'now'),
            'updated_at' => now(),
        ];
    }
}
