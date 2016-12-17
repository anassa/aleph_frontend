import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './registros_cliente.less!';
import template from './registros_cliente.stache!';

// Importar modelos
import Clientes from 'aleph-frontend/models/clientes';
// Libreria de funciones para hacer querys de listas
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend({
  define: 
  {
	    message:
      {
	    	value: "Registros Cliente"
	    },
      // Los clientes puntualmente que vamos a ver en la tabla
      clientes:
      {
        value: function()
        {
            var self
            = this;
            console.log("holamundo");
            console.log(Clientes.getList());
            return  Clientes.getList();
        }
      }
      , tempCliente:
      {
        value: Clientes
      }
      // Query rara para el paginador ....
      , query:
      {
        value: function()
        {
          var self
          = this;

          var query
          = new can.Map(
              {
                $skip: 0
              }
            );

          query
            .bind(
              'change'
            , function()
              {
                self
                  .attr(
                    'clientes'
                  , Clientes.getList(
                      query.serialize()
                    )
                  )
              }
            );

          return query;
        }
      }
  }
  // Metodo para buscar
  , search: function(value)
    {
      var value
      = this.attr('searchInput')
      , fields
      = [
          {
            name: 'nombre'
          , type: String  
          }
          ,{
            name: 'apellido'
          , type: String
          }
          , {
            name: 'dni'
          , type: Number
          }

        ];

      this.attr(
        'query.$or'
      , value.length
        ? createQuery(fields,value)
        : undefined
      );
    }
  , setTempCliente: function(art)
    {
      this.attr('tempCliente',new Clientes(art.serialize()));
    }
  , destroyCliente: function(el)
    {
      var $button
      = $(el)
      , $modal
      = $(el).parents('.modal')
      , self
      = this;

      $button.button('loading');

      this.attr('tempCliente').destroy()
        .then(
          function()
          {
            $button.button('reset');
            $modal.modal('hide');

            self
              .attr(
                'clientes'
              , Clientes.getList(
                  self.attr('query').serialize()
                )
              );

            $.notify(
              {
                message:  'Cliente eliminado correctamente.' 
              }
            , {
                type:   'success'
              , placement:
                {
                  from: 'bottom',
                  align:  'right'
                }
              }
            );
          }
        , function(data)
          {
            $.notify(
              {
                message:  'Ocurrio un error al eliminar el cliente. Intentelo nuevamente.' 
              }
            , {
                type:   'danger'
              , placement:
                {
                  from: 'bottom',
                  align:  'right'
                }
              }
            );
            $button.button('reset');
          }
        )
    }
});

export default Component.extend({
  tag: 'aleph-ventas-registros-cliente',
  viewModel: ViewModel,
  template
});