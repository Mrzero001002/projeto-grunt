document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sorteador').addEventListener('submit', function(evento){
        evento.preventDefault();
        let numeromax = document.getElementById('numero-max');
        numeromax = parseInt(numeromax.value);

        let numeroalet = Math.random() * numeromax;
        numeroalet = Math.floor(numeroalet + 1);

        document.getElementById('resultado-valor').innerText = numeroalet;
    })
});