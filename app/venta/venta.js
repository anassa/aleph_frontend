define(
	[
	//	Librerias de Can
		'lib/util'
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
					user:	undefined
				,	view:	'views/ventas/ventas.mustache'
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
				}

			,	generateQuery: function()
				{
					var	formData
					=	can.getFormData(
							this.$form
						)

					return	{
								name:
								{
									contains:	formData.name
								}
							,	code:
								{
									contains:	formData.code
								}
							}
				}

			,	updateTable: function()
				{
					console.log(arguments)
				}

			,	notifyError: function()
				{
					console.log(arguments)
				}

			,	'button.search-items click': function(el,ev)
				{
					Aleph
						.Model
							.Item
								.findAll(
									{
										where:	this.generateQuery()
									,	limit:	10
									,	sort:	'name DESC'
									}
								).then(
									can.proxy(this.updateTable,this)
								,	can.proxy(this.notifyError,this)
								)
				}
			}
		)
	}
)