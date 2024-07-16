<script lang="ts">
    export let data;
    import { Button } from '$lib/components/ui/button'
    import { afterUpdate } from 'svelte';
    import { formatDate, filterByDateRange } from '@/commonVariables.js';
    import { ordersOneMonth } from '@/store.js';
	import Averages from '$lib/components/Averages.svelte';


    const greenCoffees = Array.from(data.greenCoffeeData).map(e => e.origin);
    const blends = Array.from(data.blendData).map(e => e.name);
    const orders = Array.from(data.orderData);
    const products = Array.from(data.productData);
    
    let totals = {
        Blacksmith: 200
    }
    

    const sumBlendTotal = (blend, orderList) => {
        let productList = products.filter(e => e.description == blend);
        return orderList.filter(o => productList.some(product => product.code == o.item)).reduce((sum, order) => {
            return (order.qty * productList.filter(p => order.item == p.code)[0].multiplier) + sum
        }, 0)
    };

    let endDate = new Date();
    let startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 30);
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
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + (- Number(e.srcElement.id) * 30));
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

<Averages blendList={blends} totals={totals} />

</div>

<p>{$ordersOneMonth}</p>


<!-- <GreenCoffeeDisplay {currentScreen} currentGreenCoffees={greenCoffees} /> -->
<p>{formatDate(startDate)} to {formatDate(endDate)}</p>
<p>5lb BS Bags: {filterByDateRange(orders, startDate, endDate).filter(o => o.item == 'BS_5LB').reduce((total, item) => {return total + item.qty}, 0)}</p>
<p>10oz BS Bags: {filterByDateRange(orders, startDate, endDate).filter(o => o.item == 'BS_10OZ').reduce((total, item) => {return total + item.qty}, 0)}</p>
<p>{bsTotal} total lbs of BS is {Math.ceil(bsTotal / 50)} batches over {months * 4} weeks or {(Math.ceil(bsTotal / 50) / (months * 4)).toFixed(2)} batches per week!</p>

<style>
    .topbar {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 100px;
    }

    h1 {
        font-size: 2em;
    }
    </style>