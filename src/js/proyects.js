window.addEventListener("DOMContentLoaded", function() {
    videoAutoplay();
    scrollUp();
    seeMore();
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

function scrollUp() {
    const scrollbar = document.getElementById("scrollbar");
    if(scrollbar) {
        scrollbar.addEventListener("click", function() {
            document.documentElement.scrollTop = 0;
        })   
        window.addEventListener("scroll", function() {
            if(document.documentElement.scrollTop > 0) {
                document.querySelector(".arrow-scroll").classList.remove("hidden");
            } else {
                document.querySelector(".arrow-scroll").classList.add("hidden");
            }
        })     
    }
}

function seeMore() {
    const buttonSeeMore = document.querySelectorAll(".button");

    buttonSeeMore.forEach(function(button) {
        
        button.addEventListener("click", function(e) {
            const article = e.target.parentElement.parentElement;
            const elementHidden = e.target.previousElementSibling.previousElementSibling;
            elementHidden.classList.toggle("hidden");
            if(e.target.textContent == "Ver más") {
                e.target.textContent = "Ver menos";
                article.classList.add("large");
            } else {
                e.target.textContent = "Ver más";
                article.classList.remove("large");
            };
        });
    });
}