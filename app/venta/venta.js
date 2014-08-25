define(
	[
	//	Librerias de Can
		'lib/util'
	//	Frame table
	,	'controls/table/table'
	//	Modelo de Articulos
	,	'models/item'
	//	Estilos de Venta
	,	'css!styles/sidebar'
	]
,	function()
	{
		//	Aleph.Ventas.Venta sera el Control de Venta
		can.Control(
			'Aleph.Ventas_Venta'
		,	{
				defaults:
				{
					user:				undefined
				,	view:				'views/ventas/ventas.mustache'
				,	view_table:			'views/ventas/tablaArticulos.mustache'
				,	view_pagination:	'views/common/pagination.mustache'
				}
			}
		,	{
				//	Cuando se inicia por primera vez debera actualizar las opciones del Topbar
				init: function(element,options)
				{
					can.append(
						element
					,	can.view(
							options.view
						)
					)
					this.$form
					=	this.element.find('#searchItems')

					this.$content
					=	this.element.find('.main-content')



					this.table
					=	new	Frame.Table(
							this.$content
						,	{
								view:				options.view_table
							,	model:				Aleph.Model.Item
							,	defaultErrorMsg:	'Ocurrio un error al buscar los Articulos. <br> Por favor intente nuevamente.'
							,	view_pagination:	options.view_pagination
							}
						)
				}
			}
		)
	}
)