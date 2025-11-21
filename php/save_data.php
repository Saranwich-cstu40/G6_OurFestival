<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $file_name = '../data/users.json';

    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $firstname = $_POST['firstname'] ?? '';
    $lastname  = $_POST['lastname'] ?? '';
    $age       = $_POST['age'] ?? '';
    $gender    = $_POST['gender'] ?? '';
    $phone     = $_POST['phone'] ?? '';

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