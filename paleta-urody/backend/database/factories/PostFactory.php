<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
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
        return [
            'image' => 'https://images.unsplash.com/photo-1687161877224-9b1b0448cc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'content' => fake()->text(1200),
            'created_at' => fake()->dateTimeBetween('2023-04-01 00:00:00', 'now')
        ];
    }
}
