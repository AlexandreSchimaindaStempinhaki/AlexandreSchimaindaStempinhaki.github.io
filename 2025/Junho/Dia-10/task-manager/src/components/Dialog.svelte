<script>
    import { createEventDispatcher } from "svelte";
    import { fade, scale } from "svelte/transition"

    export let tarefaSelecionada;

    const dispatch = createEventDispatcher();

    function fechar(){
        dispatch('fecharInformacoes');
    }
    console.log(tarefaSelecionada);
</script>

<main transition:fade={{ duration: 750 }}>
    <div  class="container" transition:scale={{ start: 0.5, duration: 750 }}>
        <div class="top-line">
            <button on:click = {fechar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFF" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                </svg>
            </button>
        </div>
        <div class="content">
            <span><b>ID: {tarefaSelecionada.id}</b></span>
			<span><b>TAREFA: {tarefaSelecionada.tarefa}</b></span>
			<span><b>DESCRIÇÃO: {tarefaSelecionada.descricao}</b></span> 
			<span><b>PRIORIDADE: {tarefaSelecionada.prioridade}</b></span>
			<span><b>PRAZO: {tarefaSelecionada.prazo}</b></span>
			<span><b>SITUAÇÃO: {tarefaSelecionada.status ? "Finalizada" : "Em Aberto"}</b></span>
        </div>
    </div>
</main>

<style> 

     main {
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: 10;
        display: flex;    
        width: 100%;
        min-height: 100vh;
        justify-content: center;
        align-items: center;
    }

    .container {
        width: 560px;
        height: 320px;
        background-color: rgba(255, 255, 255, 0.8);
        border: 2px solid lightgray;
        box-shadow: 3px 3px 3px 2px darkgray;
    }

    .top-line {
        display: flex;    
        justify-content: end;
        margin: 5px;
    }

    button {
        text-align: end;
        text-decoration: none;
        padding: 5px;
        border: none;
        border-radius: 5px;
        background-color: red;
    }

    button:hover {
        opacity: 0.7;
        cursor:grab;
    }

    span {
        margin-bottom: 10px;
        display: block;
    }

</style>