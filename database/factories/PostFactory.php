<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titles = [
            'Hướng dẫn học lập trình từ cơ bản đến nâng cao',
            'Xu hướng công nghệ mới trong năm 2024',
            'Tips và tricks để code hiệu quả hơn',
            'Giới thiệu về Machine Learning cho người mới bắt đầu',
            'Cách xây dựng website responsive với Tailwind CSS',
            'Database optimization: Những kỹ thuật cần biết',
            'Security best practices cho web developers',
            'React vs Vue: So sánh chi tiết hai framework',
            'Kinh nghiệm làm việc remote hiệu quả',
            'Cách deploy ứng dụng lên AWS',
            'Git workflow và best practices',
            'API design patterns và RESTful services',
            'Docker và containerization trong development',
            'Performance optimization cho website',
            'Testing strategies: Unit, Integration, E2E'
        ];

        $content = $this->generateRichContent();

        return [
            'title' => $this->faker->randomElement($titles),
            'content' => $content,
            'category_id' => Category::factory(),
            'published_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'created_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
            'updated_at' => now(),
        ];
    }

    private function generateRichContent(): string
    {
        $paragraphs = [
            '<p>Trong thời đại công nghệ 4.0, việc nắm vững các kỹ năng lập trình trở nên quan trọng hơn bao giờ hết. <strong>Lập trình không chỉ là viết code</strong>, mà còn là khả năng <em>tư duy logic</em> và giải quyết vấn đề một cách sáng tạo.</p>',

            '<h2>Những điều cần biết khi bắt đầu</h2>
            <ul>
                <li><strong>Chọn ngôn ngữ lập trình phù hợp</strong> với mục tiêu của bạn</li>
                <li>Thực hành đều đặn và <em>kiên trì</em></li>
                <li>Tham gia cộng đồng developer để học hỏi</li>
                <li>Đọc tài liệu và code của người khác</li>
            </ul>',

            '<p>Một trong những yếu tố quan trọng nhất là <strong>thực hành liên tục</strong>. Như câu nói nổi tiếng: <blockquote>"Practice makes perfect"</blockquote> - chỉ có thực hành mới giúp bạn thành thạo.</p>',

            '<h3>Lộ trình học tập hiệu quả</h3>
            <ol>
                <li>Học cú pháp cơ bản của ngôn ngữ</li>
                <li>Thực hành với các bài tập nhỏ</li>
                <li>Xây dựng project cá nhân</li>
                <li>Đóng góp vào open source projects</li>
                <li>Tìm hiểu về best practices và design patterns</li>
            </ol>',

            '<p>Cuối cùng, hãy nhớ rằng <em>lập trình là một hành trình dài</em>. Đừng nản lòng khi gặp khó khăn, mà hãy coi đó là cơ hội để <strong>học hỏi và phát triển</strong> bản thân.</p>'
        ];

        return implode('\n\n', $this->faker->randomElements($paragraphs, $this->faker->numberBetween(3, 5)));
    }
}
