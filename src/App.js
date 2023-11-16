import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    const moveMapToBerlin = (map) => {
      map.setCenter({ lat: 52.5159, lng: 13.3777 });
      map.setZoom(14);
    };

    const initMap = async () => {
      // Step 1: initialize communication with the platform
      const platform = new window.H.service.Platform({
        apikey: 'YOUR_API_KEY',
      });
      const defaultLayers = platform.createDefaultLayers();

      // Step 2: initialize a map - this map is centered over Europe
      const map = new window.H.Map(document.getElementById('map'), {
        center: { lat: 50, lng: 5 },
        zoom: 4,
        layers: [defaultLayers.vector.normal.map],
        pixelRatio: window.devicePixelRatio || 1,
      });

      // Add a resize listener to make sure that the map occupies the whole container
      window.addEventListener('resize', () => map.getViewPort().resize());

      // Step 3: make the map interactive
      const behavior = new window.H.mapevents.Behavior(
        new window.H.mapevents.MapEvents(map)
      );

      // Create the default UI components
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);

      // Now use the map as required...
      moveMapToBerlin(map);
    };

    initMap();
  }, []);

  return <div id="map" style={{ height: '400px' }} />;
}

export default App;
