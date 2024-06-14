<script>
    export let data;

    const customerList = Array.from(data.customerData).map(e => e.name);
    const blends = Array.from(data.blendData).map(e => e.name);
    const products = Array.from(data.productData);
</script>

<div class="dashboard">
<div class="products-column">
    <div class="5lb">
        <div>5 lb Bags</div>
        {#each products as product}
        {#if product.category == '5 lb'}
        <div>{product.description}</div>
        {/if}
        {/each}
    </div>
    <div class="10oz"></div>
    <div class="barrel-aged"></div>
    <div class="kegs"></div>
</div>
<div class="customer-bar">
    {#each customerList as customer}
    <div class="customer">{customer}</div>
    {/each}
</div>
</div>

<style>
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .dashboard{
        display: flex;
        gap: 5px;
    }

    .products-column > div {
        padding-top: 50px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .customer-bar {
        display: flex;
    }
    
    .customer {
        width: max-content;
        flex: 1;
    }
</style>