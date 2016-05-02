//TODO:Literales en un fichero JSON por idioma (Ingles y Español).
//TODO:Cuando pincha en cancelar edicion, no debe cerrar todos las ediciones abiertas.
function inicio() {
  location.href='#tabla';
}
//Inicializamos las variables.
var coleccion=new Personas;
var coleccionVista=new collectionView({collection: coleccion, el: '#tabla'});
var rutas=new enrutador();
Backbone.history.start();