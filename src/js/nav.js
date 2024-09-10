window.addEventListener("DOMContentLoaded", function() {
    if(document.querySelectorAll('.square')) {
        const squares = document.querySelectorAll('.square');

        function azar() {
            let resultado = Math.floor(Math.random() * 24);
            return resultado;
        }

        function addAnimation(number) {
            let numeroAzar = azar();
            if(number <= 50) {
                setTimeout(() => {
                    squares[numeroAzar]
                    squares[numeroAzar].classList.add("animation");
                    addAnimation(number + 1);
                }, 50);
            }
        }
        addAnimation(0)
    }
})
