<script>

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

	const buttons = [
		'1', '2', '3', '+',
		'4', '5', '6', '-',
		'7', '8', '9', '*',
		'=', '0', 'C', '/'
	]

    function enviar(btn){
        dispatch('botaoClicado', btn);
    }

</script>

		<div class = "botoes">
			{#each buttons as btn}
				<button on:click={() => enviar(btn)}>{btn}</button>
			{/each}
		</div>

<style>
	.botoes{
		width: 20.8vw;
		display: flex;
		flex-wrap: wrap;
		}

	button{
		width: 4.7vw;
		margin: 0.25vw;
		background-color: darkblue;
		font-size: 2vw;
		color: white;
		font-weight: bold;
		border-radius: 1vw;
	}

	button:hover{
		opacity: 0.5;
	}
</style>