import Component from 'can-component';
import Map from 'can-define/map/map';
import './registros_cliente.less!';
import template from './registros_cliente.stache!';

// Importar modelos
import Clientes from 'aleph-frontend/models/clientes';
// Libreria de funciones para hacer querys de listas
import 'aleph-frontend/util/func.js';

export const ViewModel = Map.extend(
	{
		message:
		{
			value: "Registros Cliente"
		}
		// Los clientes puntualmente que vamos a ver en la tabla
	,	clientes:
		{
			value: function()
			{
					var self
					= this;
					console.log("holamundo");
					console.log(Clientes.getList());
					return	Clientes.getList();
			}
		}
	,	tempCliente:
		{
			value: Clientes
		}
		// Query rara para el paginador ....
	,	query:
		{
			value: function()
			{
				var self
				= this;

				var query
				= new Map(
						{
							$skip: 0
						}
					);

				query
					.bind(
						'change'
					, function()
						{
							self.clientes
							=	Clientes.getList(query.get());
						}
					);

				return query;
			}
		}
	// Metodo para buscar
	,	search: function(value)
		{
			var value
			=	this.searchInput
			,	fields
			=	[
					{
						name: 'nombre'
					,	type: String	
					}
				,	{
						name: 'apellido'
					,	type: String
					}
				,	{
						name: 'dni'
					,	type: Number
					}
				];

			this.query.$or
			=	value.length
				? createQuery(fields,value)
				: undefined;
		}
	,	setTempCliente: function(art)
		{
			this.tempCliente = new Clientes(art.get());
		}
	,	destroyCliente: function(el)
		{
			var $button
			= $(el)
			, $modal
			= $(el).parents('.modal')
			, self
			= this;

			$button.button('loading');

			this.tempCliente.destroy()
				.then(
					function()
					{
						$button.button('reset');
						$modal.modal('hide');

						self.clientes
						=	Clientes.getList(self.query.get());

						$.notify(
							{
								message:	'Cliente eliminado correctamente.' 
							}
						,	{
								type:	 'success'
							,	placement:
								{
									from: 'bottom',
									align:	'right'
								}
							}
						);
					}
				,	function(data)
					{
						$.notify(
							{
								message:	'Ocurrio un error al eliminar el cliente. Intentelo nuevamente.' 
							}
						,	{
								type:	 'danger'
							,	placement:
								{
									from: 'bottom',
									align:	'right'
								}
							}
						);
						$button.button('reset');
					}
				)
		}
});

export default Component.extend(
	{
		tag: 'aleph-ventas-registros-cliente'
	,	viewModel: ViewModel
	,	view: template
	}
);