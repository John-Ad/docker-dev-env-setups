<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('user_id')->index('user_id');
            $table->text('title');
            $table->text('description')->nullable();
            $table->integer('position');
            $table->string('created_at', 0)->nullable()->default('CURRENT_TIMESTAMP');
            $table->string('completed_at', 0)->nullable();
        });

        Schema::create('users', function (Blueprint $table) {
            $table->integer('id', true);
            $table->text('email');
            $table->text('password');
            $table->string('created_at', 0)->nullable()->default('CURRENT_TIMESTAMP');
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->foreign(['user_id'], 'tasks_ibfk_1')->references(['id'])->on('users')->onUpdate('NO ACTION')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign('tasks_ibfk_1');
        });

        Schema::dropIfExists('users');

        Schema::dropIfExists('tasks');
    }
};
