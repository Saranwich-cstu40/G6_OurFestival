function toggleMenu() {
    document.querySelector("nav").classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("nav > ul > li").forEach(li => {
        li.addEventListener("click", function(e) {
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