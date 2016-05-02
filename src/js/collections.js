/*Creamos la colección de datos que se guardará
  en LocalStorage bajo el nombre de listaPersonas.*/
var Personas=Backbone.Collection.extend({
  model: Persona,
  localStorage: new Backbone.LocalStorage('listaPersonas')
});