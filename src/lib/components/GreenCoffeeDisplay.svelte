<script>
    export let currentScreen;
    export let currentGreenCoffees;

</script>

<p>current screen: {currentScreen}</p>
<ul>
{#each currentGreenCoffees as coffee}
<li>{coffee}</li>
{/each}
</ul>