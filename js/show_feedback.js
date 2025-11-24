document.addEventListener("DOMContentLoaded", function() {
    const jsonUrl = 'data/feedback.json';

    fetch(jsonUrl)
        .then(response => {
            if (!response.ok) throw new Error("File not found");
            return response.json();
        })
        .then(data => {
            const displaySection = document.getElementById('rating-display');
            
            if (data.length === 0) {
                if(displaySection) displaySection.innerHTML = '<p class="text-white-50">No reviews yet.</p>';
                return;
            }

            let totalRating = 0;
            data.forEach(review => {
                totalRating += parseFloat(review.rating);
            });
            const avgRating = (totalRating / data.length).toFixed(1);

            if(displaySection) renderAverage(avgRating, data.length);
            renderCarousel(data);
        })
        .catch(error => {
            console.error('Error loading feedback:', error);
            const displaySection = document.getElementById('rating-display');
            if(displaySection) displaySection.innerHTML = '<p class="text-danger">Failed to load reviews.</p>';
        });

    function renderAverage(avg, count) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            starsHtml += (i <= Math.round(avg)) ? '★' : '☆';
        }

        const html = `
            <div class="col-md-6 text-white">
                <div class="avg-score">${avg}</div>
                <div class="rating-star mb-2">${starsHtml}</div>
                <p class="text-white-50">Based on ${count} reviews</p>
            </div>
        `;
        document.getElementById('rating-display').innerHTML = html;
    }

    function renderCarousel(reviews) {
        const container = document.getElementById('reviews-container');
        if (!container) return; 

        let html = '';

        reviews.forEach((review, index) => {
            const activeClass = (index === 0) ? 'active' : '';
            
            let userStars = '';
            for (let k = 1; k <= 5; k++) {
                userStars += (k <= Math.round(review.rating)) ? '★' : '☆';
            }

            const dateObj = new Date(review.timestamp);
            const dateStr = dateObj.toLocaleDateString('en-GB'); 

            // --- จุดที่แก้: ใส่ style="..." เข้าไปใน div เลย เพื่อบังคับความสวย ---
            html += `
                <div class="carousel-item ${activeClass}">
                    <div class="card p-4 mx-auto" style="
                        background-color: rgba(0, 0, 0, 0.4) !important; 
                        backdrop-filter: blur(15px); 
                        -webkit-backdrop-filter: blur(15px);
                        border: 1px solid rgba(255, 255, 255, 0.3) !important; 
                        border-radius: 20px !important;
                        box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
                        max-width: 700px;
                        min-height: 250px;">
                        
                        <div class="card-body text-center">
                            <h5 class="card-title fw-bold mb-3 text-white" style="text-shadow: 0 2px 4px rgba(0,0,0,0.6); text-transform: uppercase;">
                                ${review.firstname} ${review.lastname}
                            </h5>
                            
                            <div class="mb-3" style="color: #ffc107; font-size: 1.25rem; letter-spacing: 3px; filter: drop-shadow(0 0 3px rgba(255, 193, 7, 0.5));">
                                ${userStars}
                            </div>
                            
                            <p class="card-text fst-italic px-md-5" style="color: #e0e0e0 !important; font-weight: 300;">
                                "${review.message}"
                            </p>
                            
                            <small class="mt-4 d-block" style="color: rgba(255,255,255,0.5);">
                                Review Date: ${dateStr}
                            </small>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        const carouselEl = document.getElementById('feedbackCarousel');
        if(carouselEl) carouselEl.style.display = 'block';
    }
});