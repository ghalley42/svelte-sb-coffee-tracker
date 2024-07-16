<script lang="ts">
    export let data;

    const greenCoffees = Array.from(data.greenCoffeeData);
    const orders = Array.from(data.orderData);
    const blends = Array.from(data.blendData);
    const products = Array.from(data.productData);

    const getRecipe = (item) => {
         let theProduct = products.filter(e => e.code == item);
         let theBlends = Object.keys(theProduct[0]["base"]);
         return theBlends.map(e => {
            let o = new Object();
            o[e] = Number(theProduct[0]["base"][e]);
            return o;
         });
    }

    const getKeys = (item) => {
        return Object.keys(products.filter(e => e.code == item)[0]["base"]);
    } 

    const addToTotal = (order) => {

        if (order.item.includes('5LB')) return order.qty * 1;
    }

    let devilsCutRecipe = getRecipe("BS_10OZ");
    console.log(devilsCutRecipe)
</script>


<h1>Testing Logic</h1>
{#each getKeys("BS_10OZ") as key}
<p>{key}:  {Number(devilsCutRecipe.filter(e => Object.keys(e)[0] == key)[0][key])}</p>
{/each}
