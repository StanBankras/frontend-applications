<g class="y-axis" fill="none">
  <path
    class="domain"
    stroke="currentColor"
    d={ `M0.5,${height}.5H0.5V0.5H-6` }
    transform={ `translate(${ yPadding }, 0)` }
  ></path>
  { #each yTicks as tick }
  <g
    class="tick"
    opacity="1"
    font-size="10"
    font-family="sans-serif"
    text-anchor="end"
  >
    <line stroke="currentColor" x2="-6" transform={ `translate(${ yPadding }, ${y(tick) + 0.5})` }></line>
    <text fill="currentColor" x="-9" dy="0.32em" transform={ `translate(${ yPadding }, ${y(tick) + 0.5})` }>{ tick }</text>
  </g>
  { /each }
</g>

<script>
  export let height = 0;
  export let yTicks = []
  export let y;
  export let yPadding;
</script>