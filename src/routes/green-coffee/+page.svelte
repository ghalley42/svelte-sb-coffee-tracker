<script lang="ts">
   import { Button } from '$lib/components/ui/button'

    let currentScreen;

    const changeScreen = (e) => {
        currentScreen = e.srcElement.innerText;
    }

</script>

<div class="topbar">
    <h1>Green Coffee</h1>
    <div class="menu-div">
       <Button on:click={changeScreen}>Forecast</Button>
       <Button on:click={changeScreen}>Stock/Reserve</Button>
       <Button on:click={changeScreen}>Future</Button>
    </div>

</div>
<p>{currentScreen}</p>


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