define(
	[
	//	Librerias de Can
		'lib/util'
	//	Cargo el wizard
	,	'wizard/bootstrap-wizard.min'
	,	'css!wizard/bootstrap-wizard'
	]
,	function()
	{
		//	Aleph.Ventas_Facturar_Venta sera el Control de Facturacion de Ventas
		can.Control(
			'Aleph.Ventas_Facturar_Venta'
		,	{
				defaults:
				{
					view:		'views/ventas/facturar.mustache'
				,	shopCart:	undefined
				,	amount:		0
				}
			}
		,	{
			//	Inicializo el controlador
				init: function(element,options)
				{
					//	Inserto el modal
					can.append(
						element
					,	can.view(
							options.view
						,	{
								shopCart:	options.shopCart
							,	amount:		options.amount
							}
						)
					)

					this.$wizard
					=	this.element.find('#wizardFacturarVenta')

					this.wizard
					=	this
							.$wizard
								.wizard(
									{
										keyboard:			false
									,	progressBarCurrent:	false
									,	contentHeight:		500
									,	contentWidth:		900
									,	backdrop:			'static'
									,	buttons:
										{
											nextText:		'Siguiente'
										,	backText:		'Anterior'
										,	submitText:		'Facturar'
										,	submittingText:	'Facturando'
										}
									}
								)

					this.wizard.on('closed',can.proxy(this.closedWizard,this))
				}
			//	Escucho que se cierre el wizard
			,	'closedWizard': function(el,ev)
				{
					//	Trigeo el evento
					this
						.element
							.trigger(
								'aleph.ventas.facturar.done'
							)
				}
			}
		)
	}
)