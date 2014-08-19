define(
	[
		//	Cargo las librerias basicas
		'lib/util'
		//	Bootstrap Form Validator
	,	'validator/js/bootstrapValidator'
	,	'css!validator/css/bootstrapValidator'
	]
,	function()
	{
		//	Aleph.Profile sera el Control principal que gestiona el perfil del usuario
		can.Control(
			'Aleph.Profile'
		,	{
				defaults:
				{
					user:	undefined
				,	view:	'views/common/profile.mustache'
				}
			}
		,	{
				init: function(element,options)
				{
					//	Inserta el modal al body
					can.append(
						element
					,	can.view(
							options.view
						,	options.user
						)
					)
					//	Defino en una variable del controllador quien es el modal
					this.$modal
					=	this
							.element
								.find('#profileModal')
					//	Configuro las validaciones
					this.setValidations()
				}
				//	Configura las validaciones del formulario
			,	setValidations: function()
				{
					//	Obtengo el formulario
					var $form
					=	this.element.find('form#profileForm')
					//	Obtengo el username del usuario actual
					,	userUsername
					=	this.options.user.attr('username')
					//	Configuro las validaciones
					$form
						.bootstrapValidator(
							{
								//	Excluyo los campos que estan deshabilitados (de esta forma no los valida)
								excluded: [':disabled']
							,	fields:
								{
									//	Validaciones el campo "contraseña actual". No debe estar vacia y debe coincidir con la password del usuario
									currentPassword:
									{
										validators:
										{
											notEmpty:
											{
												message:	'La contraseña no puede estar vacia.'
											}
										,	remote:
											{
												url:	Aleph.Model.User.getValidatePasswordURL()
											,	data: function(validator)
												{
													return {
														username:		userUsername
													}
												}
											,	message:	'La contraseña no es correcta.'
											}
										}
									}
									/*
									 *	Validaciones el campo "nueva contraseña".
									 *	No debe estar vacia, no debe tener menos de 6 caracteres,
								,	 *	debe ser identica al campo "confirmar contraseña" y diferente al campo "contrasña actual"
									 */
								,	newPassword:
									{
										validators:
										{
											notEmpty:
											{
												message:	'La nueva contraseña no puede estar vacia.'
											}
										,	identical:
											{
												field:		'confirmPassword',
												message:	'Las contraseñas no coinciden.'
											}
										,	different:
											{
												field:		'currentPassword',
												message:	'La nueva contraseña no puede ser la misma que la contraseña actual.'
											}
										,	stringLength:
											{
												min:		6
											,	message:	'La contraseña debe tener al menos 6 caracteres.'
											}
										}
									}
									/*
									 *	Validaciones el campo "confirmar contraseña".
									 *	No debe estar vacia, no debe tener menos de 6 caracteres,
								,	 *	debe ser identica al campo "nueva contraseña" y diferente al campo "contrasña actual"
									 */
								,	confirmPassword:
									{
										validators:
										{
											notEmpty:
											{
												message:	'La nueva contraseña no puede estar vacia.'
											}
										,	identical:
											{
												field:		'newPassword',
												message:	'Las contraseñas no coinciden.'
											}
										,	different:
											{
												field:		'currentPassword',
												message:	'La nueva contraseña no puede ser la misma que la contraseña actual.'
											}
										,	stringLength:
											{
												min:		6
											,	message:	'La contraseña debe tener al menos 6 caracteres.'
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
				//	Resetea el formulario
			,	resetForm: function()
				{
					//	Obitengo el Form
					var	$form
					=	this.element.find('form#profileForm')
					//	Reseteo los valores del form
					can.resetForm($form)
					//	Resteo las validaciones del form
					$form		
						.data('bootstrapValidator')
							.resetForm()
					//	Reseteo el boton "Guardando"
					this
						.$modal
							.find('.btn-primary')
								.button('reset')
				}
				//	Muestra el modal
			,	show: function()
				{
					this.resetForm()
					//	Muestro el modal
					this
						.$modal
							.modal('show')
				}
				//	Espero que se aprete el boton "Guardar"
			,	'.btn-primary click': function(el,ev)
				{
					//	Valido el formulario
					this
						.formValidator
							.validate()
					//	Si el formulario es valido
					if	(this.formValidator.isValid()) {
						//	Activo el boton "Guardando..."
						$(el).button('loading')
						//	Guardo la nueva contraseña en el usuario
						this
							.options
								.user
									.updatePassword(
										//	Obtengo la nueva contraseña
										can.getFormData(
												this
													.element
														.find('form#profileForm')
											).newPassword
									).then(
										//	Si se actualzo de forma correcta
										can.proxy(this.passwordUpdated,this)
										//	Si fallo la actualizacion
									,	can.proxy(this.passwordNotUpdated,this)
									).always(
										//	En abmos casos
										can.proxy(this.resetForm,this)
									)
					}
				}
				//	Si se actualizo la contraseña envio un notify con el mensaje
			,	passwordUpdated: function()
				{
					//	Triggeo el notify del tipo "success"
					this
						.element
							.trigger(
								'frame.notify.success'
							,	'La contraseña se cambio satisfactoriamente.'
							)
					//	Oculto el modal
					this
						.$modal
							.modal('hide')
				}
				//	Si fallo la actualizacion de la contraseña envio un notify con el mensaje
			,	passwordNotUpdated: function()
				{
					//	Triggeo el notify del tipo "danger"
					this
						.element
							.trigger(
								'frame.notify.danger'
							,	'Ocurrio un error al actualizar la contraseña. <br> Por favor intentelo nuevamente.'
							)
				}
			}
		)
	}
)