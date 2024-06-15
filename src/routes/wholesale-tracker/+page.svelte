<script>
    import * as Table from '$lib/components/ui/table'
    import { productRows, productCategories } from '$lib/commonVariables.js';
    import WholesaleRow from '$lib/components/WholesaleRow.svelte';

    export let data;

    const formatDate = (date) => {
        let month = date.getMonth() + 1;
        month = month.toString()
        return [date.getFullYear(), month.padStart(2, '0'), date.getDate().toString().padStart(2, '0')].toString().replaceAll(',','-')
    }    

    const filterByDateRange = (array, start, end) => {
        console.log(start, end);
        return array.filter(e => new Date(e.date) >= new Date(formatDate(start)) && new Date(e.date) <= new Date(formatDate(end)))
    }

    const customerList = Array.from(data.customerData).map(e => e.name);
    const orders = Array.from(data.orderData);
    let startDate = new Date('2024-5-10');
    let endDate = new Date('2024-5-20');


</script>
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
        <!-- {#each customerList as customer}
        <WholesaleRow customer={customer} orders={orders.filter(e)} itemList={Array.from(productRows).map(e => e.code)}/>
        {/each} -->
    </Table.Body>
</Table.Root>