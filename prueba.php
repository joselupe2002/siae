<!DOCTYPE html>
<html>
<head>
 <title> INSERTAR MAPA EN GOOGLE MAPS</title>



 <script type="text/javascript" 
 src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfEbgv2P7Qtdzbu484uZdtwK0Bk411S60&callback=initMap"></script>

 <script>

  function initMap() {
          var map;
          var bounds = new google.maps.LatLngBounds();
          var mapOptions = {
              mapTypeId: 'roadmap'
          };
 
          map = new google.maps.Map(document.getElementById('mapa'), {mapOptions});
          map.setTilt(50);
 
          // Crear múltiples marcadores desde la Base de Datos 
          var marcadores = [['CENTRO','17.9892','-92.9281'],
                            ['MACUSPANA','17.767','-92.6'],
          ];
 
          // Creamos la ventana de información para cada Marcador
          var ventanaInfo = [
              ['<div class="info_content">'+'<h3>CENTRO</h3><p>CENTRO</p></div>'],
              ['<div class="info_content">'+'<h3>MACUSPAAAAA</h3><p>MACUSPAAAAA</p></div>'],
          ];
 
          // Creamos la ventana de información con los marcadores 
          var mostrarMarcadores = new google.maps.InfoWindow(),
              marcadores, i;
 
          // Colocamos los marcadores en el Mapa de Google 
          for (i = 0; i < marcadores.length; i++) {
              var position = new google.maps.LatLng(marcadores[i][1], marcadores[i][2]);
              bounds.extend(position);
              marker = new google.maps.Marker({
                  position: position,
                  map: map,
                  title: "4"
              });
 
              // Colocamos la ventana de información a cada Marcador del Mapa de Google 
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                  return function() {
                      mostrarMarcadores.setContent(ventanaInfo[i][0]);
                      mostrarMarcadores.open(map, marker);
                  }
              })(marker, i));
 
              // Centramos el Mapa de Google para que todos los marcadores se puedan ver 
              map.fitBounds(bounds);
          }
 
          // Aplicamos el evento 'bounds_changed' que detecta cambios en la ventana del Mapa de Google, también le configramos un zoom de 14 
          var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
              this.setZoom(8);
              google.maps.event.removeListener(boundsListener);
          });
 
      }
 
      // Lanzamos la función 'initMap' para que muestre el Mapa con Los Marcadores y toda la configuración realizada 
      google.maps.event.addDomListener(window, 'load', initMap);


 </script>


  </head>
  <body>

  <div id="mapa" style="width:1000px; height: 300px; border: solid; border-color: #00FFFF  "></div>


</body>
</html>