import	'can/control'
import	'validator'
import	'validator.css!'
import	'util/customValidation'
import	profileModalView from 'views/common/profile.mustache!'

//	Aleph.Profile sera el Control principal que gestiona el perfil del usuario
can.Control(
	'Aleph.Profile'
,	{
		defaults:
		{
			user:	undefined
		,	view:	profileModalView
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
								,	custom:
									{
										message:	'La contraseña no es correcta.'
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
		//	Reseteo el boton de guardar
	,	resetButton: function()
		{
			//	Reseteo el boton "Guardando"
			this
				.$modal
					.find('.btn-primary')
						.button('reset')
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
		}
		//	Muestra el modal
	,	'.show-my-profile click': function()
		{
			this.resetForm()
			//	Muestro el modal
			this
				.$modal
					.modal('show')
		}
		//	Espero que se aprete el boton "Guardar"
	,	'#profileModal .btn-primary click': function(el,ev)
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
								//	Obtengo la data del formulario
								can.getFormData(
										this.element.find('form#profileForm')
									)
							).then(
								//	Si se actualzo de forma correcta
								can.proxy(this.passwordUpdated,this)
								//	Si fallo la actualizacion
							,	can.proxy(this.passwordNotUpdated,this)
							).always(
								//	Siempre reseteo el boton del guardar
								can.proxy(this.resetButton,this)
							)
			}
		}
		//	Si se actualizo la contraseña envio un notify con el mensaje
	,	passwordUpdated: function()
		{
			//	Oculto el modal
			this
				.$modal
					.modal('hide')

			this.resetForm()

			console.log("PASSWORD UPDATED")
		}
		//	Si fallo la actualizacion de la contraseña envio un notify con el mensaje
	,	passwordNotUpdated: function(deferred)
		{
			if	(!deferred.responseJSON.valid)
				this.formValidator.updateStatus('currentPassword', 'INVALID', 'custom')
			
			console.log("PASSWORD NO ACTUALIZADA", arguments)
		}
	}
)