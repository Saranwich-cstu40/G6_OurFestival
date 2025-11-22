document.addEventListener('DOMContentLoaded', () => {
            
            // ฟังก์ชันหลัก: รับ ID ที่ไม่ซ้ำกันขององค์ประกอบแต่ละกลุ่มมาทำงาน
            function setupProductSelector(mainImageId, productNameId, productDescriptionId, productPriceId, thumbnailSelectorId) {
                const mainImage = document.getElementById(mainImageId);
                const productName = document.getElementById(productNameId);
                const productDescription = document.getElementById(productDescriptionId);
                const productPrice = document.getElementById(productPriceId);
                
                // 💡 ใช้ thumbnailSelectorId เพื่อค้นหา thumbnails ภายในกลุ่มที่ถูกต้อง
                const thumbnailContainer = document.getElementById(thumbnailSelectorId);
                if (!thumbnailContainer) return; // ป้องกันข้อผิดพลาดหากหาคอนเทนเนอร์ไม่เจอ

                const thumbnails = thumbnailContainer.querySelectorAll('.thumbnail');

                function updateProduct(thumbnailElement) {
                    const newSrc = thumbnailElement.getAttribute('data-src');
                    const newName = thumbnailElement.getAttribute('data-name');
                    const newDesc = thumbnailElement.getAttribute('data-desc');
                    const newPrice = thumbnailElement.getAttribute('data-price');

                    mainImage.src = newSrc;
                    mainImage.alt = newName;
                    productName.textContent = newName;
                    productDescription.textContent = newDesc;
                    productPrice.textContent = newPrice;

                    // จัดการ Class 'active' เฉพาะในกลุ่ม thumbnail ของตัวเองเท่านั้น
                    thumbnails.forEach(thumb => {
                        thumb.classList.remove('active');
                    });
                    thumbnailElement.classList.add('active');
                }

                thumbnails.forEach(thumbnail => {
                    thumbnail.addEventListener('click', () => {
                        updateProduct(thumbnail);
                    });
                });

                // กำหนดสถานะเริ่มต้น
                const initialProduct = thumbnails[0];
                if (initialProduct) {
                    updateProduct(initialProduct); 
                }
            }

            // 1. เรียกใช้สำหรับ Product Container 1 (Best Seller)
            setupProductSelector('main-product-image1', 'product-name1', 'product-description1', 'product-price1', 'thumbnail-selector1'); 

            // 2. 💡 เรียกใช้สำหรับ Product Container 2 (Korean BBQ)
            setupProductSelector('main-product-image2', 'product-name2', 'product-description2', 'product-price2', 'thumbnail-selector2'); 
            
        });