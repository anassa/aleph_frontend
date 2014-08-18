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

					this.$modal
					=	this
							.element
								.find('#profileModal')

					this.setValidations()
				}

			,	setValidations: function()
				{
					var $form
					=	this.element.find('form#profileForm')
					,	userUsername
					=	this.options.user.attr('username')

					$form
						.bootstrapValidator(
							{
								excluded: [':disabled']
							,	fields:
								{
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

					this.formValidator
					=	$form.data('bootstrapValidator')
				}

			,	show: function()
				{
					this
						.$modal
							.modal('show')
				}

			,	'.btn-primary click': function(el,ev)
				{

					this
						.formValidator
							.validate()
					
					if	(this.formValidator.isValid()) {
						$(el).button('loading')
						this
							.options
								.user
									.attr(
										'password'
									,	can.getFormData(
											this
												.element
													.find('form#profileForm')
										).newPassword
									).save(
										can.proxy(this.passwordUpdated,this)
									,	can.proxy(this.passwordNotUpdated,this)
									).always(
										function()
										{
											$(el).button('reset')
										}
									)
					}
				}

			,	passwordUpdated: function()
				{
					this
						.element
							.trigger(
								'frame.notify.success'
							,	'La contraseña se cambio satisfactoriamente.'
							)

					this
						.$modal
							.modal('hide')
				}

			,	passwordNotUpdated: function()
				{
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