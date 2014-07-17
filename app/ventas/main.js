can.Control(
	'HomeVentas'
,	{
		defaults:
		{
			view:	'app/ventas/main.mustache'
		}
	}	
,	{
		init: function(element,options)
		{
			can.append(
				element
			,	can.view(
					options.view
				)
			)

			this.$main
			=	this.element.find('#main-ventas')

			element.find('a.control-ventas').click()
		}

	,	'a.control-ventas click': function()
		{
			this.$main.empty()

			new	Ventas(
				can.$('<div>')
					.appendTo(
						this.$main
					)
			,	{

				}
			)
		}

	,	'a.control-cambios click': function()
		{
			this.$main.empty()

			new	Cambios(
				can.$('<div>')
					.appendTo(
						this.$main
					)
			,	{

				}
			)
		}

	,	'a.control-clientes click': function()
		{
			this.$main.empty()

			new	Clientes(
				can.$('<div>')
					.appendTo(
						this.$main
					)
			,	{

				}
			)
		}

	,	'a.control-descuentos click': function()
		{
			this.$main.empty()

			new	Descuentos(
				can.$('<div>')
					.appendTo(
						this.$main
					)
			,	{

				}
			)
		}

	,	'a.control-articulos click': function()
		{
			this.$main.empty()

			new	Articulos(
				can.$('<div>')
					.appendTo(
						this.$main
					)
			,	{

				}
			)
		}

	,	'a.control-forma-pagos click': function()
		{
			this.$main.empty()

			new	FormaPagos(
				can.$('<div>')
					.appendTo(
						this.$main
					)
			,	{

				}
			)
		}
	}
)