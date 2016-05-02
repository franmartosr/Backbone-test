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