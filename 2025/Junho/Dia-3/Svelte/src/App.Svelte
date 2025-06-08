<script>
    import Display from './Display.svelte';
    import Keyboard from './Keyboard.svelte';


    let display = '0';
    const TAMANHO_MAXIMO = 15;

    function apertarBotao(btn){

		if(btn === 'C'){
			display = '0';
		} else if(btn === '='){
			try{
				let resultado = Function(`return ${display}`)();
				display = Number.isInteger(resultado) ? resultado.toString() : resultado.toFixed(2);
			} catch{
				display = 'Erro';
			}
		} else{
			if(display.length >= TAMANHO_MAXIMO) return;

			display = (display === '0' || display === 'Erro') ? btn: display + btn;	
		}

	}
</script>

<main>
    <Display {display}/>
    <Keyboard on:botaoClicado={(e) => apertarBotao(e.detail)}/>
</main>

<style>
    main {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
</style>