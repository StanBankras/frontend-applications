<g fill="none" id="x-axis" >
  <path stroke="black" d={ `M0.5,6V0.5H${ width }.5V6` } transform={ `translate(${ xPadding },${ height + 10})` }></path>
  { #each mappedData as bar }
  <g
    class="tick"
    opacity="1"
    font-size="10"
    font-family="sans-serif"
    text-anchor="middle"
  >
    <line stroke="currentColor" y2="6" transform={`translate(${ xPadding + bar.x + bar.width / 2 }, ${ height + 10 })`}></line>
    <text fill="currentColor" y="9" dy="0.71em" transform={`translate(${ xPadding + bar.x + bar.width / 2 }, ${ height + 10 })`}>{ bar.xLabel }</text>
  </g>
  { /each }
</g>

<script>
  export let height = 0;
  export let width = 0;
  export let mappedData = 0;
  export let xPadding = 0;
</script>