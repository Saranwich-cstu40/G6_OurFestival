<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $file_name = '../data/feedback.json';

    $message   = htmlspecialchars($_POST['message'] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $firstname = htmlspecialchars($_POST['firstname'] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $lastname  = htmlspecialchars($_POST['lastname'] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $email     = htmlspecialchars($_POST['email'] ?? '', ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $rating    = htmlspecialchars($_POST['rating'] ?? '5.0', ENT_QUOTES | ENT_HTML5, 'UTF-8');

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