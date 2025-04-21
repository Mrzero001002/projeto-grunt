document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('sorteador').addEventListener('submit', function(){
        let numeromax = document.getElementById('número-max');
        numeromax = parseInt(numeromax.value);

        let numeroalet = Math.random() * numeromax;
        alert(numeroalet);
    })
});