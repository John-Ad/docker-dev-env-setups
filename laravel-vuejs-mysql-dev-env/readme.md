# DB Setup

---

* login to adminer at `http://localhost:8080/`

        System: MySQL
        Database: todo_app
        Username: laravel_user
        Password: laravel_password

* click on **execute sql statement**, and paste the contents of **setup.sql** found in **./app/database**

* install Eloquent Model Generator:

        `composer require krlove/eloquent-model-generator --dev`

* Execute the following command to generate models: 

        php artisan krlove:generate:models         