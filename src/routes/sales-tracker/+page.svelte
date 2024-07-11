<script lang='ts'>
    import * as Table from '$lib/components/ui/table'
    import { productRows, productCategories, formatDate, filterByDateRange } from '$lib/commonVariables.js';
    import WholesaleRow from '$lib/components/WholesaleRow.svelte';
	import Button from '@/components/ui/button/button.svelte';

    export let data;

    const setStartDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());

    let endDate = new Date();
    let startDate = setStartDate(endDate);

    const changeWeek = (e) => {
        if (e.target.innerText == 'Previous Week') endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - 7);
        if (e.target.innerText == 'Next Week') endDate = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 7);
        startDate = setStartDate(endDate);
        currentOrders = filterByDateRange(orders, startDate, endDate);
        currentCustomers = customerList.filter(e => getTotals(e) != 0).sort();
    }

    const getTotals = (customer) => filterByDateRange(orders, startDate, endDate).filter(e => e.customer_name == customer).reduce((total, currentValue) => total + currentValue.qty, 0)

    const customerList = Array.from(data.customerData).map(e => e.name);
    const orders = Array.from(data.orderData);

    let currentOrders = filterByDateRange(orders, startDate, endDate);
    let currentCustomers = customerList.filter(e => getTotals(e) != 0).sort();
   
    


</script>

<div class="topbar">
    <h2>{formatDate(startDate)} to {formatDate(endDate)}</h2>
</div>
<div class="change-week">
    <Button on:click={changeWeek}>Previous Week</Button>
    <Button on:click={changeWeek}>Next Week</Button>
</div>

<Table.Root>
    <Table.Caption>Total Sales by Period</Table.Caption>
    <Table.Header>
        <Table.Row>
            <Table.Head rowspan="2">CUSTOMER</Table.Head>
            {#each productCategories as cat}
            <Table.Head colspan={productRows.filter(e => e.category == cat).length}>{cat.toUpperCase()}</Table.Head>
            {/each}
        </Table.Row>
        <Table.Row>
            {#each productRows as product}
            <Table.Head>{product.name}</Table.Head>
            {/each}
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#each currentCustomers as customer}
        <WholesaleRow customer={customer} orders={currentOrders} itemList={Array.from(productRows).map(e => e.code)}/>
        {/each}
        <WholesaleRow customer='Website/Other' orders={currentOrders.filter(e => !customerList.some(cust => cust == e.customer_name))} itemList={Array.from(productRows.map(e => e.code))}/>
        <WholesaleRow customer='Total' orders={currentOrders} itemList={Array.from(productRows).map(e => e.code)}/>
    </Table.Body>
</Table.Root>