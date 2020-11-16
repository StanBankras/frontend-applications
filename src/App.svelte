<script>
	import Test from './components/Test.svelte';
	import { count } from './store/store';

	function increment() {
		$count += 1;
	}
</script>

<main>
	<Test/>
	<button on:click={increment}>Increment</button>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>