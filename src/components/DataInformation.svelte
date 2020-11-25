<footer>
  <h2>What data is used?</h2>
  <ul>
    <li>
      <span>Opendata RDW: <a href="#">parking specifications</a>, <a href="#">parking geometry</a></span>
      <span><i>Location of the parkings, charging points</i></span>
    </li>
    <li>
      <span>NPR opendata: <a href="#">NPR opendata API</a></span>
      <span><i>Cost per hour & is parking a Park & ride or not?</i></span>
    </li>
    <li>
      <span>Environmental zones in The Netherlands: <a href="#">API</a></span>
      <span><i>Get polygon data from the environmental zones in The Netherlands</i></span>
    </li>
  </ul>
  <p>By Stan Bankras</p>
</footer>

<style lang="scss">
  footer {
    background-color: #FBF3DA;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      margin-bottom: 2rem;
    }
    ul {
      padding-left: 30px;
      list-style: lower-roman;
      margin-bottom: 5rem;
      li {
        margin-bottom: 2rem;
        span {
          display: block;
          margin-bottom: 0.5rem;
        }
      }
    }
  }
</style>