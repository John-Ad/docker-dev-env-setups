<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Register user successfully.
     */
    public function test_register_user_successful(): void
    {
        $response = $this->post('/api/auth/register', [
            'email' => 'email@email.com',
            'password' => 'password'
        ]);

        $response->assertStatus(201);
    }
}
