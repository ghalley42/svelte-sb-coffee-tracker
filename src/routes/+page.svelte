<script lang="ts">
	import { filterByDateRange, buildAccumulator } from '@/commonVariables';

    export let data;

    type Blends = {
        blacksmith?: number;
        embers?: number;
        espressomatica?: number;
        "mocha java"?: number;
        decaf?: number;
        "old school"?: number;
        "italian roast"?: number;
    }
    
    type Order = {
        order_line_id: number;
        date: string;
        customer_name: string;
        item: string;
        qty: number;
    }

    type Product = {
        code: string;
        description: string;
        category: string;
        multiplier: number;
        base: Blends;
    }

    const greenCoffees = Array.from(data.greenCoffeeData);
    const orders = Array.from(data.orderData);
    const blends = Array.from(data.blendData);
    const products = Array.from(data.productData);

    let orderAccumulator:any = buildAccumulator(products, 'code');
    let blendAccumulator:any = buildAccumulator(blends, 'name');
    let batchAccumulator:any = buildAccumulator(greenCoffees, 'origin');
    let product: string, amount: number;
    let dateRange = {'start date': '', 'end date': ''};

    const getRecipe = (order: Order) => products.filter(e => e.code == order.item)[0]['base'];
    const getKeys = (order: Order) => Object.keys(products.filter(e => e.code == order.item)[0]["base"]);

    const categoryCheck = (product: Product) => {
        return product.category == "5 lb" || product.category == "10 oz" || product.category == "1 lb" ? product.category : "";
    }   

    const sumOrdersByItem = (orders: Array<any>, accumulator: any ) => {
        orders.forEach(order => accumulator[order.item] += order.qty);
    };

    const accumulateBatches = (accumulatedBlends:any , accumulator: any) => {
        let batchObject = JSON.parse(JSON.stringify(accumulatedBlends))
        blends.forEach(blend => batchObject[blend.name] = batchObject[blend.name] / 50)
        // Object.keys(accumulatedBlends).forEach(blend => {
        //     console.log(blends.filter(e => e.name == blend)[0].recipe);
        // });

        let greens = greenCoffees.map(e => e.origin);
        Object.keys(batchObject).forEach(blend => {
            let theRecipe = blends.filter(e => e.name == blend)[0].recipe;
            greens.forEach(green => {
                if (theRecipe[green] > 1) accumulator[green] += Number((batchObject[blend] * theRecipe[green]).toFixed(3));
            })
        })
    }

    const sumBlendsTotalLbs = (accumulatedOrders: any, accumulator: any) => {
        Object.keys(accumulatedOrders).forEach(order => {
            let theProduct = products.filter(e => e.code == order)[0]
            let theMultiplier = Number(theProduct.multiplier);
            let theBlends = Object.keys(theProduct.base).map(blend => blends.filter(e => e.name == blend));
            let blendRecipe:any = new Object();
            theBlends.forEach(x => blendRecipe[x[0]["name"]] = theProduct.base[x[0]["name"]])
            theBlends.forEach(blend => {
               accumulator[blend[0]["name"]] += Number(accumulatedOrders[order]) * Number(theProduct.base[blend[0]['name']] / 100) * (theMultiplier / 1000);
            })
        })
    }

    sumOrdersByItem(filterByDateRange(orders, new Date(2024, 5, 1), new Date(2024, 6, 20)), orderAccumulator);
  

    sumBlendsTotalLbs(orderAccumulator, blendAccumulator);
    accumulateBatches(blendAccumulator, batchAccumulator);
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
<div style="padding-bottom: 100px;">
    {#each blends as blend (blend.name)}
    <p>{blend.name}: {Math.floor(blendAccumulator[blend.name])}</p>
    {/each}
</div>
{#each greenCoffees as green (green.origin)}
<p>{green.origin}: {batchAccumulator[green.origin]}</p>
{/each}