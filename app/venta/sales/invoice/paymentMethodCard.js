define(
	[
	//	Librerias de Can
		'lib/util'
	]
,	function()
	{
		//	Aleph.Ventas_ClientCard es el control de la tarjeta de cliente en el wizard invoice
		can.Control(
			'Aleph.Ventas_PaymentMethodCard'
		,	{
				defaults:
				{
					view:	'views/ventas/sales/invoice/paymentMethod.mustache'
				,	client:	undefined
				}
			}
		,	{
			//	Inicalizo el controlador de la tarjeta
				init: function(element,options)
				{
					//	Inserto el contenido de la tarjeta en el wizard
					can.append(
						element
					,	can.view(
							options.view
						,	options.paymentMethod
						)
					)
					//	Inicializo las validaciones
					this.setValidations()
					//	Muestro el metodo de pago descuento
					this.showDisccount()
				}
			//	Inicializa las validaciones del formulario
			,	setValidations: function()
				{
					//	Obtengo el formulario
					var $form
					=	this.element.find('form')
					//	Seteo las validaciones
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
			//	Espero que cambie el form
			,	'form change': function(el,ev)
				{
					this
						.options
							.paymentMethod
								.attr(
									can.$(ev.target).attr('name')
								,	(_.isEqual(can.$(ev.target).attr('name'),'method'))
									?	{
											value:	can.$(ev.target).val()
										,	label:	can.trim(can.$(ev.target).find('option[value='+can.$(ev.target).val()+']').text())
										}
									:	can.$(ev.target).val()
								)
				}

			//	Espero que se cambie el select cuyo nombre es "method"
			,	'[name="method"] change': function(el,ev)
				{
					//	Parseo el valor del select
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
			//	Oculto todos
			,	hideAll: function()
				{
					//	Busco lo elementos con clase all-control y los oculto
					this
						.element
							.find('.all-control')
								.hide()
					//	Reseteo el formulario
					this
						.formValidator
							.resetForm()
					//	Vacio los valores de todos los inputs
					this
						.element
							.find('form input')
								.val("")
					//	Reseto el valor de cualquier otro select que no sea el de metodo
					this
						.element
							.find('form select:not([name=method])')
								.val(1)
				}
			//	Muestro todos
			,	showAll: function()
				{
					//	Busco los elementos con clase all-control y los muestro
					this
						.element
							.find('.all-control')
								.show()
				}
			//	Muesto las opciones de Descuento
			,	showDisccount: function()
				{
					//	Oculto todos
					this.hideAll()
					//	Muestro aquellos cuya clase es disccount-control
					this
						.element
							.find('.disccount-control')
								.show()
				}
			//	Muesto las opciones de Debito
			,	showDebit: function()
				{
					//	Oculto todos
					this.hideAll()
					//	Muestro aquellos cuya clase es bank-control
					this
						.element
							.find('.bank-control')
								.show()
				}
			//	Muesto las opciones de Credito
			,	showCredit: function()
				{
					//	Muestro todos
					this.showAll()
					//	Oculto aquellos cuya clase es disccount-control
					this
						.element
							.find('.disccount-control')
								.hide()
				}
			//	Valida si el formulario es valido para todos los campos
			,	isValidated: function()
				{
					//	Fuerzo la validacion del formulario
					this.formValidator.validate()
					//	Devuelvo si esta validado o no
					return	this.formValidator.isValid()
				}
			}
		)
	}
)