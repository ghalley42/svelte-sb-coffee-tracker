<script>
	import '../app.css';
</script>
<div class="main">
	<div class="sidebar-menu">
		<a href="/blends">Blends</a>
		<a href="/sales-tracker">Sales Tracker</a>
		<a href="/green-coffee">Green Coffee</a>
	</div>
	<div class="content">
	<slot></slot>
	</div>
</div>
<style>

	.main {
		display: flex;
		flex-direction: row;
	}

	.sidebar-menu {
		min-width: 10%;
		border-right: 1px solid black;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}

</style>
