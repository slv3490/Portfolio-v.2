window.addEventListener("DOMContentLoaded", function() {
    videoAutoplay();
})

function videoAutoplay() {
    const clip = document.querySelectorAll(".proyect-video");

    clip.forEach(e => {
        e.addEventListener("mouseenter", function() {
            e.play();
        })
        e.addEventListener("mouseout", function() {
            e.pause();
        })
    })
}