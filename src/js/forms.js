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