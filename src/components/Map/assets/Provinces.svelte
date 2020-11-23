<g class="provinces">
  { #each provinceData.features as province }
  <path d={pathGenerator(province)}/>
  { /each }
</g>

<script>
  export let pathGenerator = undefined;
  export let provinceData = [];
</script>

<style lang="scss">
  .provinces {
    fill: #ddb89b;
    stroke-width: 5px;
    stroke: #fffaec;
    cursor: grabbing;
  }
</style>