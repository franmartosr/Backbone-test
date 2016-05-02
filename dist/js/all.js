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
/*Creamos la colección de datos que se guardará
  en LocalStorage bajo el nombre de listaPersonas.*/
var Personas=Backbone.Collection.extend({
  model: Persona,
  localStorage: new Backbone.LocalStorage('listaPersonas')
});
var collectionView=Backbone.View.extend({
  /**
   * @function
   * @author Francisco Martos Roa
   * @name initialize
   * @example Code example
   * @license License example
   * @since 27/03/2014
   * @description Initialize the view fetching the collection and creating event listeners.
   * @param {Object} param1 Parametro de prueba 1.
   * @param {String} param2 Parametro de prueba 2.
   */
  initialize: function(){
    this.listenTo(this.collection, 'add', this.filaNueva);
    this.listenTo(this.collection, 'destroy', this.vacio);
    this.collection.fetch();
    this.render();
  },
  template: _.template($('#tablaDatos').html()),
  render: function(){
    if(this.collection.length!==0){
      this.$el.html(this.template());
      for(var i=0; i<this.collection.length; i++){
        this.filaVista=new rowView({
          model: this.collection.models[i]
        });
      }
    }else{
      this.vacio();
    }
  },
  //Al añadir un nuevo modelo, se renderiza solo la fila añadida.
  filaNueva: function(){
    if(this.collection.length===1){
      this.render();
    }else{
      this.filaVista=new rowView({
        model: this.collection.models[this.collection.length-1]
      });
    }
  },
  /*Comprueba si no hay datos en la coleccion
    y muestra un mensaje en caso afirmativo.*/
  vacio: function(){
    //TODO: Usar Underscore.
    if(this.collection.length===0){
      this.$el.html('No hay ningún dato disponible.');
    }
  }
});
//Configuramos la vista de cada fila de la tabla.
var rowView=Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'change', this.noEdit);
    this.render();
  },
  tagName: 'tr',
  className: 'text-muted',
  template: _.template($('#fila').html()),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    $('#lista').append(this.$el);
  },
  events:{
    'click #edita': 'editar',
    'click #borra': 'borrar',
    'click #guarda': 'noEdit',
    'click #cancela': 'noEdit'
  },
  //Borra el dato del LocalStorage y de la página.
  borrar: function(){
    this.undelegateEvents();
    this.$el.remove();
    this.model.destroy();
  },
  //Muestra un formulario para editar los datos.
  editar: function(){
    this.formuEdit=new formulario({
      model: this.model,
      template: _.template($('#filaEdit').html())
    }).render();
    this.$el.html(this.formuEdit.el);
  },
  //Vuelve a la vista normal.
  noEdit: function(){
    //TODO: Usar Underscore.
    if(this.formuEdit!==undefined){
      this.formuEdit.undelegateEvents();
      this.$el.html(this.template(this.model.toJSON()));
    }
  }
});
//Variable para adaptar el formulario al sexo.
var sexo={
  'Hombre': ['Soltero', 'Casado'],
  'Mujer': ['Soltera', 'Casada']
};
//Variable que controla los formularios.
var formulario=Backbone.Form.extend({
  schema:{
    id: {type: 'Text', editorAttrs:{disabled: true}},
    nombre: {type: 'Text', editorAttrs:{placeholder: 'Hola'}},
    edad: {type: 'Number', editorAttrs:{min: '0', max: '125', onkeydown: 'return false'}},
    localidad: 'Text',
    fechaNacimiento: 'Date',
    sexo: {type: 'Radio', options: ['Hombre', 'Mujer']},
    estadoCivil: {type: 'Select', options: sexo.Hombre}
  },
  events:{
    'click input[name=sexo]':  'cambioSexo',
    'click #guarda': 'guarda'
  },
  /**
   * @function
   * @author Francisco Martos Roa
   * @name cambioSexo
   * @example Code example
   * @license License example
   * @since 30/03/2014
   * @description Cambia el 'select' de Estado Civil dependiendo del 'radio' sexo.
   * @param {Object} e Event triggered.
   */
  cambioSexo: function(e){
    var cambia=sexo[e.currentTarget.value];
    this.fields.estadoCivil.editor.setOptions(cambia);
    $('select[name=estadoCivil]').val(cambia[0]);
  },
  //Actualiza el modelo según el formulario
  guarda: function(){
    //TODO: Usar Underscore.
    if($('select[name=estadoCivil]').val()===null){
      var tmp=this.model.get('estadoCivil');
      this.commit();
      this.model.attributes.estadoCivil=tmp;
    }else{
      this.commit();
    }
    this.model.mostrar();
    this.model.save();
  }
});
//Configuramos la vista del formulario y sus eventos.
var formView=Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'change', this.aniadir);
    //Genera una 'id' con el menor nº positivo posible.
    //TODO: Cambiar por bucle '_.each'.
    for(var i=1; ; i++){
      //TODO: Usar Underscore.
      if(this.collection.get(i)===undefined){
        //TODO: Cambiar por 'this.model.set'.
        this.model.attributes.id=i;
        break;
      }
    }
    this.render();
  },
  events:{
    'click #cancel': 'noFormu'
  },
  render: function(){
    this.formuNuevo=new formulario({
      model: this.model,
      template: _.template($('#formulario').html())
    }).render();
    this.$el.html(this.formuNuevo.el);
  },
  //Vacía el div y borra los eventos asociados.
  noFormu: function(){
    this.formuNuevo.undelegateEvents();
    this.undelegateEvents();
    this.$el.empty();
  },
  //Añade el nuevo modelo a la colección y lo guarda.
  aniadir: function(){
    this.collection.add(this.model);
    this.noFormu();
  }
});
var enrutador=Backbone.Router.extend({
  routes: {
    'formu': 'formu',
    'nueva': 'nueva',
    'tabla': 'tabla'
  },
  initialize: function() {
    this.listenTo(Backbone.history, 'routeNotFound', this.error);
  },
  //TODO: Change alert with modal window.
  error: function() {
    if (location.hash === '') {
      inicio();
    } else {
      alert('Page not found!');
    }
  },
  //Show add new person form
  formu: function() {
    this.formuVista=new formView({
      model: new Persona(),
      el: '#formu',
      collection: coleccion
    });
    this.toggleDiv();
  },
  //Add new person to the table and show it.
  nueva: function() {
    if(typeof this.formuVista !== 'undefined') {
      this.formuVista.formuNuevo.guarda();
      this.toggleDiv();
    }
  },
  //Show persons table.
  tabla: function() {
    if(typeof this.formuVista !== 'undefined') {
      var yo=this;
      $('#principal').slideDown('slow');
      $('#formu').slideUp('slow', function(){
        yo.formuVista.noFormu();
      });
    }
  },
  //Hide form and show table.
  toggleDiv: function() {
    $('#principal').slideToggle('slow');
    $('#formu').slideToggle('slow');
  }
});
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