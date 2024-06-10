<script>
    export let blend;
</script>

<div class="card">
<h2>{blend.name}</h2>
<div class=bottom>
{#each Object.keys(blend.recipe) as green}
<div class="ingredient">{green}: {blend.recipe[green]}</div>
{/each}
</div>
</div>

<style>
    .card{
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid black;
        border-radius: 1rem;
        padding: 1rem;
    }
    .bottom {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        gap: 0.5rem;
    }
</style>