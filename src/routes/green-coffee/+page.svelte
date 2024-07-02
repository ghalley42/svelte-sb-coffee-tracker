<script lang="ts">
    export let data;
    import { Button } from '$lib/components/ui/button'
    import { afterUpdate } from 'svelte';


    const greenCoffees = Array.from(data.greenCoffeeData).map(e => e.origin);
    const blends = Array.from(data.blendData);
    const orders = Array.from(data.orderData);
    const products = Array.from(data.productData);

    const formatDate = (date) => {
        if (date == undefined) return;
        let month = date.getMonth() + 1;
        month = month.toString()
        return [date.getFullYear(), month.padStart(2, '0'), date.getDate().toString().padStart(2, '0')].toString().replaceAll(',','-')
    }

    const filterByDateRange = (array, start, end) => {
        return array.filter(e => new Date(e.date) >= new Date(formatDate(start)) && new Date(e.date) <= new Date(formatDate(end)))
    }

    const sumBlendTotal = (blend, orderList) => {
        let productList = products.filter(e => e.description == blend);
        return orderList.filter(o => productList.some(product => product.code == o.item)).reduce((sum, order) => {
            return (order.qty * productList.filter(p => order.item == p.code)[0].multiplier) + sum
        }, 0)
    };

    let startDate;
    let endDate = new Date();
    let currentScreen;
    let bsTotal: number;
    let months: number;

    afterUpdate(() => {
        bsTotal = sumBlendTotal('Blacksmith', filterByDateRange(orders, startDate, endDate)) / 1000;
    })

    const changeScreen = (e) => {
        currentScreen = e.srcElement.innerText;
    };

    const changeDate = (e) => {
        months = Number(e.srcElement.id);
        startDate = new Date(new Date().setDate(-Number(e.srcElement.id) * 30));
    }

</script>

<div class="topbar">
    <h1>Green Coffee</h1>
    <div class="menu-div">
       <Button id="1" on:click={changeDate}>Past Month <i class="baseline-data_usage"></i></Button>
       <Button id="2" on:click={changeDate}>Past 2 Monts</Button>
       <Button id="3" on:click={changeDate}>Past 3 Months</Button>
       <Button id="6" on:click={changeDate}>Past 6 Months</Button>
    </div>

</div>

<!-- <GreenCoffeeDisplay {currentScreen} currentGreenCoffees={greenCoffees} /> -->
<p>{formatDate(startDate)} to {formatDate(endDate)}</p>
<p>5lb BS Bags: {filterByDateRange(orders, startDate, endDate).filter(o => o.item == 'BS_5LB').reduce((total, item) => {return total + item.qty}, 0)}</p>
<p>10oz BS Bags: {filterByDateRange(orders, startDate, endDate).filter(o => o.item == 'BS_10OZ').reduce((total, item) => {return total + item.qty}, 0)}</p>
<p>{bsTotal} total lbs of BS is {Math.ceil(bsTotal / 50)} batches over {months * 4} weeks or {(Math.ceil(bsTotal / 50) / (months * 4)).toFixed(2)} batches per week!</p>

<!-- {#each blends as blend}
<h3 style="font-weight: 800">{blend.name}</h3>
<ul>
    {#each greenCoffees as coffee}
    {#if blend.recipe[coffee] != undefined}
    <li>{coffee}: {blend.recipe[coffee]} lbs per batch</li>
    {/if}
    {/each}
</ul>
{/each} -->
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