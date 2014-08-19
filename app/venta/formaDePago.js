define(
	[
		'lib/util'
	,	'models/paymentMethod'
	]
,	function()
	{
		//	Aleph.Ventas.Venta sera el Control de Venta
		can.Control(
			'Aleph.Ventas_FormaDePago'
		,	{
				defaults:
				{
					user:	undefined
				,	view:	'views/ventas/formaDePago.mustache'
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

					this.setValidations()
					
					this.showDisccount()
				}

			,	setValidations: function()
				{
					//	Obtengo el formulario
					var $form
					=	this.element.find('#paymentMethod')
					$form
						.bootstrapValidator(
							{
								//	Excluyo los campos que estan ocultos (de esta forma no los valida)
								excluded: [':hidden']
							,	fields:
								{
									instalmentsNumber:
									{
										validators:
										{
											integer:
											{
												message:	'El numero de cuotas debe ser un numero.'
											}
										,	between	:
											{
												message:	'El numero de cuotas debe ser entre 1 y 24.'
											,	min:		1
											,	max:		24	
											}
										,	notEmpty:
											{
												message:	'El campo no debe estar vacio.'
											}
										}
									}
								,	interest:
									{
										validators:
										{
											numeric:
											{
												message:	'El numero de intereses	 debe ser un numero.'
											}
										,	between:
											{
												message:	'El numero de intereses debe ser entre 0 y 100.'
											,	min:		0
											,	max:		100	
											}
										,	notEmpty:
											{
												message:	'El campo no debe estar vacio.'
											}
										}
									}
								,	bank:
									{
										validators:
										{
											notEmpty:
											{
												message:	'Debe seleccionar un banco.'
											}
										}
									}
								,	disccount:
									{
										validators:
										{
											numeric:
											{
												message:	'El numero de descuento debe ser un numero.'
											}
										,	between:
											{
												message:	'El numero de descuento debe ser entre 0 y 100.'
											,	min:		0
											,	max:		100	
											}
										,	notEmpty:
											{
												message:	'El campo no debe estar vacio.'
											}
										}
									}
								}
							}
						)
					//	Obtengo el validador
					this.formValidator
					=	$form.data('bootstrapValidator')
				}

			,	'[name="method"] change': function(el,ev)
				{
					switch(parseInt($(el).val()))
					{
						//	Si es efectivo
						case	1:
							this.showDisccount()
							break;
						//	Si es tarjeta de debito
						case	2:
							this.showDebit()
							break;
						//	Si es tarjeta de credito
						case	3:
							this.showCredit()
							break;
						//	Caso contrario
						default:
							this.hideAll()
							break;
					}
				}

			,	hideAll: function()
				{
					this
						.element
							.find('.all-control')
								.hide()

					this
						.element
							.find('#paymentMethod')
								.data('bootstrapValidator')
									.resetForm()

					this
						.element
							.find('#paymentMethod input')
								.val("")

					this
						.element
							.find('#paymentMethod select:not([name=method])')
								.val(1)
				}

			,	showAll: function()
				{
					this
						.element
							.find('.all-control')
								.show()
				}

			,	showDisccount: function()
				{
					this.hideAll()

					this
						.element
							.find('.disccount-control')
								.show()
				}

			,	showDebit: function()
				{
					this.hideAll()

					this
						.element
							.find('.bank-control')
								.show()
				}

			,	showCredit: function()
				{
					this.showAll()

					this
						.element
							.find('.disccount-control')
								.hide()
				}

			,	'.btn-primary click': function()
				{
					Aleph
						.Model
							.PaymentMethod
								.create(
									can.getFormData(
										this.element.find('#paymentMethod')
									,	true
									)
								).then(
									function()
									{
										console.log(arguments)
									}
								)
				}
			}
		)
	}
)