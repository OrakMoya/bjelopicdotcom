<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Video;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
        'title',
        'description',
        'subject',
        'publication_date',
        'link',
        'user_id',
        'uuid',
        'collection',
        'category',
 */

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Video>
 */
class VideoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(2),
            'description' => fake()->sentence(10),
            'subject' => fake()->company(),
            'publication_date' => fake()->dateTimeBetween('-2 years')->format('Y-m-d'),
            'link' => fake()->url(),
            'user_id' => User::inRandomOrder()->first()->id,
            'uuid' => Str::uuid(),
            'collection' => random_int(0, 9) % 2 != 0 ? null : Video::inRandomOrder()->first()->collection,
            'thumbnail_path' => fake()->imageUrl(),
        ];
    }
}
