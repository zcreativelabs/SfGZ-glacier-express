
# Glacier Express

In dieser Übung geht es darum die Bahnlinie des Glacier Express von Zermatt nach St. Moritz, durch die Alpen zu visualisieren.

## Aufgabe

1. Erstelle eine Karte in einem passenden Format (z.B. 4:3 — 800x600), die auf die Schweiz fokussiert ist (siehe Hinweis 1).

2. Erstelle eine GeoJSON Linie anhand der Koordinaten in `routeStops` (siehe Hinweis 2).

3. Binde diese Linie an einen Pfad mithilfe eines Pfadgenerators (siehe Hinweis 3).

4. Binde die Haltestellen in `routeStops` an Kreise und rendere diese auf deiner Karte. Zeige dabei nur die Haltestellen, welche tatsächlich from Glacier Express benutzt werden (sie sind mit einem `isMajor` Attribut markiert).

## Hinweise

#### 1. Kartenprojektion

Für diese Karte kannst du die Projektion aus der Abstimmungsübung nehmen:

```js
const projection = d3.geoAlbers()
  .center([0, 46.7])
  .rotate([-9, 0, 0])
  .parallels([40, 50])
  .scale(12500)
```

Korrekterweise könnte man hier auch die Lambert Conic Conformal Kartenprojektion verwenden. Diese Kartenprojektion wird von Piloten verwendet um Distanzen korrekt abzumessen. Da in diesem Fall die Distanz nicht besonders wichtig ist, und diese Karte nicht von Piloten oder Navigatoren benutzt werden sollte, haben wir freiere Wahl.

In diesem Fall gibt es keine Kantone mehr, da uns nur die Landesgrenze interessiert. Du must die Kantone also nicht mit `.selectAll` an Daten binden. Du kannst einfach `.append` benutzen.

```js
const pathGenerator = d3.geoPath().projection(projection)

const countryShape = svg.append("path")
  .attr("d", pathGenerator(country))
  .attr("fill", "#EEE")
```

#### 2. GeoJSON Linien

Um eine GeoJSON Linie zu erstellen brauchst du eine Liste von Koordinaten. Du brauchst nur jeweils einen Array von Koordinaten (z.B. `[7.747727, 46.024393]`) von jeder Haltestelle.

Um einen Array in einen anderen Array umzuwandeln kannst du `Array.map` benutzen.

```js
const routeStops = [
  { "coordinates": [7.747727, 46.024393], "name":"Zermatt" },
  { "coordinates": [7.774707, 46.067162], "name":"Täsch" },
  {...}
]

const routeStopsCoordinates = routeStops.map(function(routeStop) {
  return routeStop.coordinates
})

console.log(routeStopsCoordinates) // [ [7.747727, 46.024393], [7.774707, 46.067162] ]

```

Mithilfe von `Array.map` kannst du jetz relativ einfach eine Koordinatenliste zusammenstellen und sie in deiner GeoJSON Linie an das `coordinates` Attribut hängen:

```js

const routeStops = [
  { "coordinates": [7.747727, 46.024393], "name":"Zermatt" },
  { "coordinates": [7.774707, 46.067162], "name":"Täsch" },
  {...}
]

const lineData = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: routeStops.map(function(routeStop) { return routeStop.coordinates }),
  },
}

```

#### 3. Linien mithilfe eines Pfadgenerators

Um eine Linie mit einem d3 Pfadgenerator zu rendern brauchst du eine GeoJSON linie (siehe Hinweis 2). In diesem Fall handelt es sich nur um eine Linie also musst du nicht `selectAll`, oder `enter` benutzen.

```js
const lineData = {
  type: "Feature",
  geometry: {...},
}

const line = svg.append("path")
  .attr("d", pathGenerator(lineData))
```

## Weiters

Wenn dir diese Aufgabe zu einfach ist, kanns du bereits versuchen die Linie zu animieren. Um eine Linie zu animieren musst du zuerst wissen wie lang die Linie ist. Dann kannst du mit `stroke-dasharray` und `stroke-dashoffset` die zeichnung der Linie simulieren.

#### 1. Finde die Länge der Linie mithilfe vom Pfadgenerator

```js
const pathLength = pathGenerator.measure(lineData)
```

#### 2. Mache deine Linie 'unsichtbar'

Mithilfe von `stroke-dasharray`, `stroke-dashoffset`, und `pathLength` kannst du die Linie 'unsichtbar' machen.

```js
line
  .attr("stroke-dasharray", pathLength)
  .attr("stroke-dashoffset", pathLength)
```

#### 3. Animiere die Linie

Benutze `d3.transition` um deine Linie zu animieren.

```js
line
  .transition()
  .duration(5000)
  .delay(500)
  .attr("stroke-dashoffset", 0)
```
