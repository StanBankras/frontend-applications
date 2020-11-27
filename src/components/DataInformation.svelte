<footer id="footer">
  <h2>Welke data wordt gebruikt?</h2>
  <ul>
    <li>
      <span>
        Opendata RDW: <a href="https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s">parkeergebied specificaties</a>,
        <a href="https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEOMETRIE-GEBIED/nsk3-v9n7">parkeergebied geometrie</a>
      </span>
      <span><i>Locatie parkeergebied, hoeveelheid oplaadpunten</i></span>
    </li>
    <li>
      <span>NPR opendata: <a href="https://nationaalparkeerregister.nl/home.html">NPR opendata API</a></span>
      <span><i>Parkeerkosten per uur & is deze parkeerplaats een park & ride?</i></span>
    </li>
    <li>
      <span>Milieuzones in Nederland: <a href="https://services.arcgis.com/kE0BiyvJHb5SwQv7/arcgis/rest/services/Milieuzones_NL/FeatureServer/0/query?f=geojson&where=1%3D1&returnGeometry=true">API</a></span>
      <span><i>Geojson data van milieuzones in Nederland</i></span>
    </li>
  </ul>
  <p>Door Stan Bankras</p>
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