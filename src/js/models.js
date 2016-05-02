//Creamos el modelo persona donde se almacenarán los datos.
var Persona=Backbone.Model.extend({
  defaults:{
    nombre: 'Sin nombre',
    edad: 0,
    localidad: 'Ninguna',
    fechaNacimiento: new Date(1950, 1, 1),
    sexo: 'Hombre',
    estadoCivil: 'Soltero'
  },
  localStorage: new Backbone.LocalStorage('listaPersonas'),
  //Muestra en un alert los datos que se han añadido o modificado.
  //TODO: Coger el modelo antes de lanzar alert.
  //TODO: Cambiar por una modal CSS.
  mostrar: function(){
    alert('Datos añadidos/modificados:\n-Nombre: '+this.get('nombre')+'\n-Sexo: '+this.get('sexo')
    +'\n-Edad: '+this.get('edad')+'\n-Localidad: '+this.get('localidad')+'\n-Fecha de Nacimiento: '+
    this.get('fechaNacimiento')+'\n-Estado Civil: '+this.get('estadoCivil'));
  }
});