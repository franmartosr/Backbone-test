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