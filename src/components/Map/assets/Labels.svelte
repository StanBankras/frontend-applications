{ #if $selectedParkings.length > 0 }
<div class="labels" transition:fade>
  <p>
    <span class="circle red"></span>
    Parking outside environmental zone
  </p>
  <p>
    <span class="circle green"></span>
    Parking inside environmental zone
  </p>
</div>  
{ /if }

<script>
  import { fade } from 'svelte/transition';
  import { selectedParkings } from '/src/store/store.js';
</script>

<style lang="scss">
  .labels {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #fffaec;
    padding: 1rem;
    p {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      &:last-child {
        margin-bottom: 0;
      }
      .circle {
        display: block;
        border-radius: 50%;
        background-color: black;
        width: 15px;
        height: 15px;
        margin-right: 0.5rem;
        &.red {
          background-color: red;
        }
        &.green {
          background-color: lightgreen;
        }
      }
    }
  }
</style>