<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->numberBetween(1, 10),
            'post_id' => $this->faker->numberBetween(1, 10),
            'comment' => $this->faker->realText(60),
            'created_at' => $this->faker->dateTimeBetween('-2 week', '-1 week'),
        ];
    }
}
