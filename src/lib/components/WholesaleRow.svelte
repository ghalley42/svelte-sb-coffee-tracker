<script>
    import * as Table from '$lib/components/ui/table';

    export let customer;
    export let orders;
    export let itemList;
</script>

<Table.Row>
    <Table.Cell>{customer}</Table.Cell>
    {#each itemList as i}
    <Table.Cell>
        {orders.filter(e => e.customer_name == customer).filter(f => f.item == i).reduce((total, currentValue) => total + currentValue.qty, 0)}
    </Table.Cell>
    {/each}
</Table.Row>

