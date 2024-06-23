<script lang='ts'>
    import * as Table from '$lib/components/ui/table'
    import { productRows, productCategories } from '$lib/commonVariables.js';
    import WholesaleRow from '$lib/components/WholesaleRow.svelte';
	import WholesaleDateBar from '@/components/WholesaleDateBar.svelte';
	import { CableIcon } from 'lucide-svelte';

    export let data;

    const formatDate = (date) => {
        let month = date.getMonth() + 1;
        month = month.toString()
        return [date.getFullYear(), month.padStart(2, '0'), date.getDate().toString().padStart(2, '0')].toString().replaceAll(',','-')
    }

    const setStartDate = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);

    const filterByDateRange = (array, start, end) => {
        return array.filter(e => new Date(e.date) >= new Date(formatDate(start)) && new Date(e.date) <= new Date(formatDate(end)))
    }

    const getTotals = (customer) => filterByDateRange(orders, startDate, endDate).filter(e => e.customer_name == customer).reduce((total, currentValue) => total + currentValue.qty, 0)

    const customerList = Array.from(data.customerData).map(e => e.name);
    const orders = Array.from(data.orderData);
    let endDate = new Date(2024, 4, 15);
    let startDate = setStartDate(endDate);
    


</script>
<WholesaleDateBar />
<Table.Root>
    <Table.Caption>Wholesale Customer Sales by Period</Table.Caption>
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
        {#each customerList as customer}
        {#if getTotals(customer) != 0}
        <WholesaleRow customer={customer} orders={filterByDateRange(orders, startDate, endDate)} itemList={Array.from(productRows).map(e => e.code)}/>
        {/if}
        {/each}
    </Table.Body>
</Table.Root>
<h2>Customers Who Didn't Order:</h2>
{#each customerList as customer}
{#if getTotals(customer) == 0}
<p>{customer}</p>
{/if}
{/each}