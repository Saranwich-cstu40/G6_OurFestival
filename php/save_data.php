<?php

date_default_timezone_set('Asia/Bangkok');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $file_name = '../data/users.json';

    $email     = htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES, 'UTF-8');
    $password  = htmlspecialchars($_POST['password'] ?? '', ENT_QUOTES, 'UTF-8');
    $firstname = htmlspecialchars($_POST['firstname'] ?? '', ENT_QUOTES, 'UTF-8');
    $lastname  = htmlspecialchars($_POST['lastname'] ?? '', ENT_QUOTES, 'UTF-8');
    $age       = htmlspecialchars($_POST['age'] ?? '', ENT_QUOTES, 'UTF-8');
    $gender    = htmlspecialchars($_POST['gender'] ?? '', ENT_QUOTES, 'UTF-8');
    $phone     = htmlspecialchars($_POST['phone'] ?? '', ENT_QUOTES, 'UTF-8');

    if (empty($firstname) || empty($lastname) || empty($email) || empty($password)) {
        die("Please fill all required fields");
    }

    $new_user = [
        'id'            => uniqid(), //primary key สำหรับแต่ละ user
        'firstname'     => $firstname,
        'lastname'      => $lastname,
        'age'           => $age,
        'gender'        => $gender,
        'phone'         => $phone,
        'email'         => $email,
        'password_hash' => password_hash($password, PASSWORD_DEFAULT), //เข้ารหัส
        'timestamp'     => date('Y-m-d H:i:s')
    ];

    $current_data = [];
    if (file_exists($file_name)) {
        $json_content = file_get_contents($file_name);
        $current_data = json_decode($json_content, true);
        
        if (!is_array($current_data)) {
            $current_data = [];
        }
    }

    $current_data[] = $new_user;

    if (file_put_contents($file_name, json_encode($current_data, JSON_PRETTY_PRINT))) {
        header("Location: ../Register_Complete.html");
        exit();
    } else {
        echo "Error saving data";
    }
}
?>