const squares = document.querySelectorAll('.square');

squares.forEach(square => {
    gsap.fromTo(square, 
        { opacity: 0 },
        {
            opacity: 1,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            delay: Math.random() * 4
        }
    );
});
