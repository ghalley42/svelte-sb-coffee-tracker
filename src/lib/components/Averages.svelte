<script>
	import { BedSingle } from "lucide-svelte";

    export let blendList;
    export let totals;
</script>

<h1>Weekly Average in lbs</h1>
<div class="long-bar">
    {#each blendList as blend}
    <div class="bar-section">
    <p>{blend}</p>
    <p>{totals[blend]}</p>
    </div>
    {/each}
</div>

<style>

    h1 {
        padding-top: 3rem;
        font-weight: 700;
        font-size: 1.2rem;
    }

    div.long-bar {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 25px;
        padding-top: 1.5rem;
    }
</style>
