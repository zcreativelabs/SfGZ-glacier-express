
document.addEventListener("DOMContentLoaded", () => {
  d3.json("/ch.json")
    .then(country => {
      d3.json("/route-stops.json")
        .then(routeStops => {

          // ==================================================

          // Visualisierung...
          
          // ==================================================

        })
    })
})
