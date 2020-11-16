<script>
  import { onMount } from "svelte";

  let parkingData = {};
  const data = fetch('/data/milieuzones.json').then(res => res.json()).then(data => data);
</script>

{ #await data }
<p>loading...</p>
{ :then data }
<p>{ JSON.stringify(data) }</p>
{ /await }