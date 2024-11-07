export function initScrollToTop() {
    const scrollToTopBtn = document.getElementById("scrollToTop");
    
    // Tampilkan/sembunyikan tombol berdasarkan posisi scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollToTopBtn.classList.add("visible");
        } else {
            scrollToTopBtn.classList.remove("visible");
        }
    });

    // Event listener untuk scroll ke atas
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
} 