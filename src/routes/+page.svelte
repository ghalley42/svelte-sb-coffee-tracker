<script>
    export let data;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<a href="/blends">blends</a>
<a href="/wholesale-tracker">wholesale</a>
<ul>
    {#each data.customerData as customer}
      <li>{customer.name}</li>
    {/each}
</ul>
