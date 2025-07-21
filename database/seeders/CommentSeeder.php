<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = Post::all();
        $users = User::all();

        if ($posts->isEmpty()) {
            $this->command->warn('No posts found. Please run PostSeeder first.');
            return;
        }

        if ($users->isEmpty()) {
            $this->command->warn('No users found. Creating some users.');
            User::factory(10)->create();
            $users = User::all();
        }

        // Create comments for each post (random number between 0-8 comments per post)
        foreach ($posts as $post) {
            $commentCount = fake()->numberBetween(0, 8);

            Comment::factory($commentCount)->create([
                'post_id' => $post->id,
                'user_id' => fn() => $users->random()->id,
            ]);
        }

        $this->command->info('Created comments for all posts successfully!');
    }
}
