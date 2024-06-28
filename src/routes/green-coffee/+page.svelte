<script lang="ts">
    export let data;
    import { Button } from '$lib/components/ui/button'
    import GreenCoffeeDisplay from '@/components/GreenCoffeeDisplay.svelte';
    
    const greenCoffees = Array.from(data.greenCoffeeData).map(e => e.origin);

    let currentScreen;

    const changeScreen = (e) => {
        currentScreen = e.srcElement.innerText;
    }

</script>

<div class="topbar">
    <h1>Green Coffee</h1>
    <div class="menu-div">
       <Button on:click={changeScreen}>Current <i class="baseline-data_usage"></i></Button>
       <Button on:click={changeScreen}>Forecast</Button>
       <Button on:click={changeScreen}>Stock/Reserve</Button>
       <Button on:click={changeScreen}>Future</Button>
    </div>

</div>

<GreenCoffeeDisplay {currentScreen} currentGreenCoffees={greenCoffees} />

<style>
    .topbar {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    h1 {
        font-size: 2em;
    }
</style>