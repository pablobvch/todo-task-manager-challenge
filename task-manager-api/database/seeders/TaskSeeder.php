<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create(['name' => 'Buy groceries', 'completed' => false]);
        Task::create(['name' => 'Finish challenge', 'completed' => true]);
        Task::create(['name' => 'Read Laravel docs', 'completed' => false]);
    }
}
