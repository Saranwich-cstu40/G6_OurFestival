function toggleMenu() {
    document.querySelector("nav").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("click", function (e) {
        const nav = document.querySelector("nav");
        const btn = document.querySelector(".menu-toggle");

        if (window.innerWidth <= 768) {

            if (nav.classList.contains("active")) {

                if (!nav.contains(e.target) && !btn.contains(e.target)) {
                    nav.classList.remove("active");

                    document.querySelectorAll("nav ul > li.open")
                        .forEach(li => li.classList.remove("open"));
                }
            }
        }
    });

    document.querySelectorAll("nav > ul > li").forEach(li => {
        li.addEventListener("click", function (e) {
            if (window.innerWidth <= 768) {

                if (e.target.tagName === "A") return;

                e.preventDefault();
                e.stopPropagation();
                li.classList.toggle("open");
            }
        });
    });
});

document.querySelectorAll("nav ul > li").forEach(item => {
    const link = item.querySelector(":scope > a");
    const dropdown = item.querySelector(":scope > ul");

    if (dropdown) {
        let opened = false;

        link.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {

                if (!opened) {
                    e.preventDefault();
                    item.classList.toggle("open");
                    opened = true;

                    document.addEventListener("click", function closeMenu(ev) {
                        if (!item.contains(ev.target)) {
                            item.classList.remove("open");
                            opened = false;
                            document.removeEventListener("click", closeMenu);
                        }
                    });

                } else {
                    opened = false;
                }
            }
        });
    }
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector("nav");
    if (!nav) return;

    // Make navbar sticky on all devices. If you prefer different
    // behavior on small screens, adjust the threshold or add checks
    // for when the mobile menu is open.
    const threshold = 80;
    if (window.scrollY > threshold) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
});