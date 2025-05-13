    let segundos = 0;
    let intervalo = null;
    let pausado = false;

    function formatarTempo(seg){
        const h = String(Math.floor(seg / 3600)).padStart(2, '0');
        const m = String(Math.floor((seg % 3600) / 60)).padStart(2, '0');
        const s = String(seg % 60).padStart(2, '0');
        return `${h}:${m}:${s}`
    }

    function atualizarDisplay(){
        document.getElementById("cronometro").textContent = formatarTempo(segundos);
    }

    function iniciarCronometro(){
        if(intervalo !== null) return;
        intervalo =  setInterval (() => {
            segundos++;
            atualizarDisplay();
        }, 1000);
    }

    document.addEventListener("keydown", (e) => {
        if(e.key === 'p' || e.key === 'P'){
            pausado = !pausado;

            if(pausado){
                clearInterval(intervalo);
                intervalo = null;
                document.getElementById("pausado").style.display = "flex";
            } else{
                iniciarCronometro();
                document.getElementById("pausado").style.display = "none";
            }
        }
    })

    window.onload = iniciarCronometro;