<script>
    import * as Table from '$lib/components/ui/table';

    export let customer;
    export let orders;
    export let itemList;
</script>

<Table.Row>
    <Table.Cell style="font-weight: 800">{customer}</Table.Cell>
    {#each itemList as i}
    {#if customer == "Total"}
        <Table.Cell style="font-weight: 600; text-align: center">
            {orders.filter(f => f.item == i).reduce((total, currentValue) => total + currentValue.qty, 0)}
        </Table.Cell>
    {:else if customer == "Website/Other"}
        <Table.Cell style="text-align: center">
            {orders.filter(f => f.item == i).reduce((total, currentValue) => total + currentValue.qty, 0)}
        </Table.Cell>
    {:else}
        <Table.Cell style="text-align: center; border-right">
            {orders.filter(e => e.customer_name == customer).filter(f => f.item == i).reduce((total, currentValue) => total + currentValue.qty, 0)}
        </Table.Cell>
    {/if}
    {/each}
</Table.Row>