define(
	[
	//	Librerias de Can
		'lib/util'
	,	'models/client'
	]
,	function()
	{
		//	Aleph.Ventas_ClientCard es el control de la tarjeta de cliente en el wizard invoice
		can.Control(
			'Aleph.Ventas_ClientCard'
		,	{
				defaults:
				{
					view:	'views/ventas/sales/invoice/client.mustache'
				,	client:	undefined
				}
			}
		,	{
				init: function(element,options)
				{
					can.append(
						element
					,	can.view(
							options.view
						,	options.client
						)
					)

					this.setValidations()
				}

			,	setValidations: function()
				{
					var	$form
					=	this.element.find('form')

					$form
						.bootstrapValidator(
							{
								fields:
								{
									dni_cuil:
									{
										validators:
										{
											notEmpty:
											{
												message:	'Debe ingresar un DNI o CUIL.'
											}
										,	integer:
											{
												message:	'El DNI o CUIL ingresado es no es valido.'
											}
										}
									}
								,	denomination:
									{
										validators:
										{
											notEmpty:
											{
												message:	'Debe un Nombre y Apellido o Razón Social.'
											}
										}
									}
								,	phone:
									{
										validators:
										{
											integer:
											{
												message:	'El teléfono es no es valido.'
											}
										}
									}
								,	email:
									{
										validators:
										{
											emailAddress:
											{
												message:	'El E-Mail ingresado no es valido.'
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

			,	clientFound: function(client)
				{
					this
						.options
							.client
								.attr(
									client
								)
				}

			,	clientNotFound: function()
				{
					this.changedDNIorCUIL
					=	false

					this
						.element
							.find('form input:not([name=dni_cuil])')
								.attr('disabled',false)
				}

			,	'[name=dni_cuil] focusin': function(el,ev)
				{
					this.clientNotFound()
				}

			,	'[name=dni_cuil] focusout': function(el,ev,changedDNIorCUIL)
				{
					if	(!this.changedDNIorCUIL)
						this
							.element
								.find('form input:not([name=dni_cuil])')
									.attr('disabled',false)
				}

			,	'[name=dni_cuil] change': function(el,ev)
				{
					this.changedDNIorCUIL
					=	true

					Aleph
						.Model
							.Client
								.findByDNIOrCUIL(can.$(el).val())
									.then(
										can.proxy(this.clientFound,this)
									).always(
										can.proxy(this.clientNotFound,this)
									)
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