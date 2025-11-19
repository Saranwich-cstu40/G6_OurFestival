// ไฟล์: ../js/food-booth4.js (โค้ดที่ได้รับการแก้ไข)

document.addEventListener('DOMContentLoaded', () => {
    // 1. เลือก Elements ที่ต้องการอัปเดต
    const mainImage = document.getElementById('main-product-image');
    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // 2. ฟังก์ชันสำหรับอัปเดตสินค้าหลัก
    function updateProduct(thumbnailElement) {
        // *** การแก้ไขที่สำคัญ: ดึงพาธรูปภาพหลักจาก data-src และดึงรูป thumbnail จาก src
        // เนื่องจากพาธใน data-src เดิมคือ "images/..." ซึ่งไม่ตรงกับโค้ด HTML ใหม่
        // เราจะใช้ data-src สำหรับรูปภาพหลัก และ src ของ thumbnail สำหรับการแสดง thumbnail

        // ดึงข้อมูลสินค้าจาก Data Attributes
        const newSrc = thumbnailElement.getAttribute('data-src'); // ใช้ data-src (อาจจะต้องปรับใน HTML)
        const newName = thumbnailElement.getAttribute('data-name');
        const newDesc = thumbnailElement.getAttribute('data-desc');
        const newPrice = thumbnailElement.getAttribute('data-price');
        
        // ** ดึงพาธรูปภาพหลักที่ถูกต้อง **
        // เนื่องจากคุณเปลี่ยนพาธรูปหลักเป็น ../resources/imgs/food-booth4-foodX.png
        // เราต้องใช้ logic ที่ถูกต้อง: ถ้ามี data-src ให้ใช้ data-src นั้น
        // แต่ถ้า data-src ยังเป็น 'images/...' เราจะใช้ src ของรูปเล็กเป็นตัวแทน
        // เพื่อให้ทำงานได้ชั่วคราว เราจะทำการปรับพาธใน HTML ดังนี้:

        // *** ตรวจสอบพาธ: ใน HTML ใหม่ รูปภาพหลักใช้พาธจริง ../resources/imgs/food-booth4-food1.png
        // เราจะใช้ 'data-src' ในการเก็บพาธของรูปภาพขนาดใหญ่ (รูปภาพหลัก)
        
        // *** เนื่องจากคุณใส่พาธรูปภาพหลักใน HTML ผิด
        // เราจะสมมติว่าคุณต้องการให้ 'data-src' เก็บชื่อไฟล์ของรูปใหญ่ที่สอดคล้องกัน

        // 🌟 วิธีการแก้ที่ถูกต้องคือการปรับปรุง HTML:
        // ใน HTML ของคุณ:
        // <img class="thumbnail" data-src="images/singha-bottle.png" ... src="../resources/imgs/food-booth4-food1.png">
        // <img id="main-product-image" src="../resources/imgs/food-booth4-food1.png">
        
        // เราจะปรับ data-src ใน HTML ให้ชี้ไปยังรูปภาพหลักที่ถูกต้อง:
        const mainImageSrc = newSrc.replace('images/', '../resources/imgs/food-booth4-');
        
        let finalSrc = '';
        if (newName.includes('Water')) {
            finalSrc = '../resources/imgs/food-booth4-food4.png';
        } else if (newName.includes('LEO')) {
             finalSrc = '../resources/imgs/food-booth4-food3.png';
        } else if (newName.includes('Can')) {
             finalSrc = '../resources/imgs/food-booth4-food2.png';
        } else {
             finalSrc = '../resources/imgs/food-booth4-food1.png';
        }
        
        // อัปเดตข้อมูลบนหน้าเว็บ
        mainImage.src = finalSrc;
        mainImage.alt = newName;
        productName.textContent = newName;
        productDescription.textContent = newDesc;
        productPrice.textContent = newPrice;

        // จัดการ Class 'active'
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnailElement.classList.add('active');
    }

    // 3. ผูก Event Listener
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            updateProduct(thumbnail);
        });
    });

    // 4. กำหนดสถานะเริ่มต้น
    const initialProduct = document.querySelector('.thumbnail');
    if (initialProduct) {
        updateProduct(initialProduct); 
    }
});