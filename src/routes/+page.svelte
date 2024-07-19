<script lang="ts">
	import { filterByDateRange } from '@/commonVariables';

    export let data;

    const greenCoffees = Array.from(data.greenCoffeeData);
    const orders = Array.from(data.orderData);
    const blends = Array.from(data.blendData);
    const products = Array.from(data.productData);
    
    const buildAccumulator = (array, specifier) => {
        let theAccumulator = new Object();
        array.map(e => theAccumulator[e[specifier]] = 0);
        return theAccumulator;
    }

    let orderAccumulator = buildAccumulator(products, 'code');
    let greenAccumulator = buildAccumulator(greenCoffees, 'origin')
    let product, amount;

    const getRecipe = (item) => {
         let theProduct = products.filter(e => e.code == item);
         let theBlends = Object.keys(theProduct[0]["base"]);
         let o = new Object();
         theBlends.forEach(e => o[e] = Number(theProduct[0]["base"][e]))
         return o;
         };

    const getKeys = (item) => {
        return Object.keys(products.filter(e => e.code == item)[0]["base"]);
    } 

    const addToTotal = (order) => {

        if (order.item.includes('5LB')) return order.qty * 1;
    }

    const categoryCheck = (product) => {
        return product.category == "5 lb" || product.category == "10 oz" || product.category == "1 lb" ? product.category : "";
    }   

    const sumOrdersByItem = (e) => {
        e.forEach(order => orderAccumulator[order.item] += order.qty);
    };

    sumOrdersByItem(filterByDateRange(orders, new Date(2024, 6, 1), new Date(2024, 6, 13)));
    console.log(orderAccumulator)
    console.log(greenAccumulator)
</script>


<h1>Testing Logic</h1>

<p>{amount == undefined ? "Select amount below" : amount} of {product == undefined ? "Select product below" : product}</p>
<div>
    <label for="product">Product: </label>
    <select name="product" id="product"  bind:value={product}>
        {#each products as product}
        <option value={product.code}>{product.description} {categoryCheck(product)}</option>
        {/each}
    </select>
    <label for="amount">How many units: </label>
    <input type="range" name="amount" id="amount" bind:value={amount}>
</div>
<br><br>
<div>
    <p>In order to make the selected number of units you'll need the following:</p>
    <br>

</div>