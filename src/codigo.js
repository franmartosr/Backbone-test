function inicio(){
	location.href='#tabla';
}
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
//Configuramos la vista de la colección con sus eventos.
var collectionView=Backbone.View.extend({
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
		edad: 'Number',
		localidad: 'Text',
		fechaNacimiento: 'Date',
		sexo: {type: 'Radio', options: ['Hombre', 'Mujer']},
		estadoCivil: {type: 'Select', options: sexo.Hombre}
	},
	events:{
		'click input[name=sexo]':  'cambioSexo',
		'click #guarda': 'guarda'
	},
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
//Configuramos el router.
var enrutador=Backbone.Router.extend({
	routes: {
		'formu': 'formu',
		'nueva': 'nueva',
		'tabla': 'tabla'
	},
	//Muestra el formulario para añadir una nueva Persona.
	formu: function(){
		this.formuVista=new formView({
			model: new Persona(),
			el: '#formu',
			collection: coleccion
		});
		this.toggleDiv();
	},
	//Añade la nueva persona a la tabla y vuelve a mostrar esta.
	nueva: function(){
		//TODO: Usar Underscore.
		if(this.formuVista!==undefined){
			this.formuVista.formuNuevo.guarda();
			this.toggleDiv();
		}
	},
	tabla: function(){
		//TODO: Usar Underscore.
		if(this.formuVista!==undefined){
			var yo=this;
			$('#principal').slideDown('slow');
			$('#formu').slideUp('slow', function(){
				yo.formuVista.noFormu();
			});
		}
	},
	//Oculta el formulario y vuelve a mostrar la tabla.
	toggleDiv: function(){
		$('#principal').slideToggle('slow');
		$('#formu').slideToggle('slow');
	}
});
//Inicializamos las variables.
var coleccion=new Personas;
var coleccionVista=new collectionView({collection: coleccion, el: '#tabla'});
var rutas=new enrutador();
Backbone.history.start();