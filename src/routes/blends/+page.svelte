<script>
    export let data;
    import BlendCard from '$lib/components/BlendCard.svelte';
</script>

<a href="./">Home</a>
<div class="dashboard-container">
{#each data.blendData as blend}
<BlendCard {blend} />
{/each}
</div>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    .dashboard-container {
        display: flex;
        gap: 2rem;
        flex-wrap: wrap;
    }
</style>