<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $file_name = '../data/feedback.json';

    $message   = $_POST['message'] ?? '';
    $firstname = $_POST['firstname'] ?? '';
    $lastname  = $_POST['lastname'] ?? '';
    $email     = $_POST['email'] ?? '';
    $rating    = $_POST['rating'] ?? '5.0';

    if (empty($message) || empty($firstname) || empty($lastname) || empty($email)) { //ไม่ได้ตรวจสอบ rating เพราะมีค่า default
        die("Please fill all fields");
    }

    $new_feedback = [
        'id'        => uniqid(),
        'firstname' => $firstname,
        'lastname'  => $lastname,
        'email'     => $email,
        'rating'    => $rating,
        'message'   => $message,
        'timestamp' => date('Y-m-d H:i:s')
    ];

    $current_data = [];
    if (file_exists($file_name)) {
        $json_content = file_get_contents($file_name);
        $current_data = json_decode($json_content, true);
        
        if (!is_array($current_data)) {
            $current_data = [];
        }
    }

    $current_data[] = $new_feedback;

    if (file_put_contents($file_name, json_encode($current_data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
        header("Location: ../index.html");
        exit();
    } else {
        echo "Error saving feedback";
    }
}
?>