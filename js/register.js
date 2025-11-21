document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const inputs = form.querySelectorAll('input, select');

    //รอ 1 วิค่อยตรวจตอนพิมพ์
    inputs.forEach(input => {
        let timer;

        input.addEventListener('input', () => {
            clearTimeout(timer);
            input.classList.remove('is-invalid', 'is-valid'); // ลบสีออกก่อนระหว่างพิมพ์
            
            timer = setTimeout(() => {
                if (input.value.trim() !== "") validateInput(input);
            }, 1000); // รอ 1000ms (1 วินาที)
        });

        // ถ้าเมาส์หลุดโฟกัส (Blur) ให้ตรวจเลยไม่ต้องรอ
        input.addEventListener('blur', () => {
            if (input.value.trim() !== "") validateInput(input);
        });
    });

    function validateInput(input) {
        if (input.checkValidity()) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }

    // --- ส่วนที่ 2: Submit Logic (แก้จากอันเก่าของคุณ) ---
    form.addEventListener('submit', function (e) {
        // ถ้าฟอร์ม "ไม่ผ่าน"
        if (!form.checkValidity()) {
            e.preventDefault();  // ห้ามส่งข้อมูล
            e.stopPropagation();
            
            // บังคับโชว์แดงทุกช่องที่ผิด (เผื่อ user กด submit เลยโดยไม่รอพิมพ์)
            form.classList.add('was-validated'); 
            
            // ลบ class สีที่เราทำเองออก เพื่อให้ bootstrap ทำงาน
            inputs.forEach(input => input.classList.remove('is-invalid', 'is-valid'));
        } 
        
        // ถ้าฟอร์ม "ผ่าน" (Else):
        // ไม่ต้องเขียนอะไรเลย ปล่อยให้มันวิ่งไปหา action="php/save_data.php" ตามปกติ
    });
});