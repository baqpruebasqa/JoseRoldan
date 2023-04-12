<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $roles=["Visualizador", "Administrador", "Coordinador"];
        $azar=mt_rand(0,2);
        return [
            'nombres' => fake()->firstName(null),
            'apellidos' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => null, //now()
            'password' => Str::random(15), 
            'direccion' => fake()->address(),
            'telefono' => fake()->numerify('##########'),
            'tipoUsuario' => $roles[$azar],
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
