define(
	[
	//	Librerias de Can
		'lib/util'
	//	Cargo el wizard
	,	'wizard/bootstrap-wizard.min'
	,	'css!wizard/bootstrap-wizard'
	//	Cargo los controlers de la tarjetas
	,	'venta/sales/invoice/clientCard'
	,	'venta/sales/invoice/paymentMethodCard'
	]
,	function()
	{
		//	Aleph.Ventas_Facturar_Venta sera el Control de Facturacion de Ventas
		can.Control(
			'Aleph.Ventas_Invoice'
		,	{
				defaults:
				{
					view:		'views/ventas/sales/invoice/init.mustache'
				,	shopCart:	undefined
				,	amount:		0
				}
			}
		,	{
			//	Inicializo el controlador
				init: function(element,options)
				{
					//	Genero una variable del controlador para la vista
					this.viewData
					=	new can.Map(
							{
								shopCart:		options.shopCart
							,	amount:			options.amount
							,	client:			new	can.Map({})
							,	paymentMethod:	new	can.Map({method:{value: 1, label: 'Efectivo'}})
							}
						)
					//	Inserto el modal
					can.append(
						element
					,	can.view(
							options.view
						,	this.viewData
						)
					)
					//	Inicializo las tarjetas del formualario
					this.initCards()
					//	Inicializo el wizard
					this.initWizard() 
				}
			,	initCards: function()
				{
					//	Inicializo la tarjeta cliente
					this.clientCard
					=	new	Aleph.Ventas_ClientCard(
							this.element.find('[data-cardname=clientCard]')
						,	{
								client:			this.viewData.attr('client')
							}
						)
					//	Inicializo la tarjeta de metodo de pago
					this.paymentMethodCard
					=	new	Aleph.Ventas_PaymentMethodCard(
							this.element.find('[data-cardname=paymentMethodCard]')
						,	{
								paymentMethod:	this.viewData.attr('paymentMethod')
							}
						)
				}
			,	initWizard: function()
				{
					//	Obtengo el lemento del wizard (Ojo el elemento una ves que se muestra el wizard se pasa al body)
					this.$wizard
					=	this.element.find('#wizardFacturarVenta')
					//	Instancio el wizard junto a su configuracion y obtengo el controlador del wizard 
					this.wizard
					=	this
							.$wizard
								.wizard(
									{
										keyboard:			false
									,	progressBarCurrent:	true
									,	contentHeight:		650
									,	contentWidth:		1000
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
					//	Armo las validaciones para la tarjeta de cliente
					this
						.wizard
							.cards
								.clientCard
									.on(
										'validate'
									,	can.proxy(this.validateClientCard,this)
									)
					//	Armo las validaciones para la tarjeta de metodo de pago
					this
						.wizard
							.cards
								.paymentMethodCard
									.on(
										'validate'
									,	can.proxy(this.validatePaymentMethodCard,this)
									)
					//	Escucho que el wizard se cierre
					this
						.wizard
							.on(
								'closed'
							,	can.proxy(this.resetWizard,this)
							)
					//	Escucho que se submitee el wizard
					this
						.wizard
							.on(
								'submit'
							,	can.proxy(this.submitWizard,this)
							)
				}
			,	validateClientCard: function()
				{
					return	this.clientCard.isValidated()
				}
			,	validatePaymentMethodCard: function()
				{
					return	this.paymentMethodCard.isValidated()
				}
			//	Submite el wizard
			,	submitWizard: function(wizardControl)
				{
					//FAKE
					//	Reseteo el wizard cuando lo cierro
					wizardControl.close()
					//	Muestro la notificacion
					//	Triggeo el notify del tipo "success"
					this
						.element
							.trigger(
								'frame.notify.success'
							,	'La venta se facturo correctamente.'
							)
					//	Triggeo el reset de ventas
					this
						.element
							.trigger(
								'aleph.ventas.sales.reset'
							)
				}
			//	Reseteo los formularios del wizard
			,	resetWizard: function(wizardControl)
				{	
					//	Reseteo el wizard cuando lo cierro
					wizardControl.reset()
				}
			//	Muestro el wizard
			,	show: function(options)
				{
					//	Actualizo la data del wizard
					this.viewData.attr(options)
					//	Muestro el wizard
					this.wizard.show()
				}
			}
		)
	}
)