import	'can/control'
import	'can/construct/super'
import	'can/control/plugin'
import	'can/observe'
import	'can/event'
import	'can/util/string/deparam'


can.Control(
	'can.Login'
,	{
		defaults:
		{
			view:	undefined
		}
	}
,	{
		init: function(element, options)
		{
			can.append(
				element
			,	can.view(
					options.view
				)
			)
			
			this.$form
			=	this.element.find('#login-form')
			
			this.$form.bootstrapValidator(
				{
					feedbackIcons:
					{
						valid:		'fa fa-check'
					,	invalid:	'fa fa-times'
					,	validating:	'fa fa-refresh'
					}
				,	fields:
					{
						username:
						{
							message:			'Usuario invalido'
						,	validators:
							{
								notEmpty:
								{
									message:	'Debe ingresar un usuario'
								}
							,	regexp:
								{
									regexp:		/^[a-zA-Z]+$/
								,	message:	'El usuario solo puede contener letras'
								}
							,	'custom':
								{
									message:	''
								}
							}
						}
					,	password:
						{
							validators:
							{
								notEmpty:
								{
									message:	'Debe ingresar una contraseña'
								}
							,	'custom':
								{
									message:	''
								}
							}
						}
					}
				}
			).on(
				'error.validator.bv'
			,	function(e, data)
				{
					data
						.element
							.data('bv.messages')
								.find('.help-block[data-bv-for="' + data.field + '"]')
									.hide()
								.filter('[data-bv-validator="' + data.validator + '"]')
									.show()
				}
			)
			
			this.formValidator
			=	this.$form.data('bootstrapValidator')
		}
	
	,	'#login-form input[name="username"] keyup': function(el, ev)
		{
			if	(ev.keyCode == 13)
				this.$form.find('input[name="password"]').focus()
		}
	
	,	'#login-form input[name="password"] keyup': function(el, ev)
		{
			if	(ev.keyCode == 13)
				this.attemptToLogin()
		}
	
	,	'#login-form button.log-in click': function(el, ev)
		{
			this.attemptToLogin()
		}
	
	,	attemptToLogin: function()
		{			
			if	(this.formValidator.validate() && this.formValidator.isValid())
			{
				var $loginButton
				=	this.element.find('button.log-in')

				$loginButton.button('loading')

				Aleph.Model.User
					.login(
						can.deparam(this.$form.serialize())
					).then(
						can.proxy(this.loginSucceeded,this)
					,	can.proxy(this.loginFailed,this)
					)
			}
		}
	
	,	loginSucceeded: function(user)
		{
			window.location.reload()
		}
	
	,	loginFailed: function(deferred,status,code)
		{
			this.element.find('button.log-in').button('reset')
			
			this.formValidator.resetField('password',true)
			
			this.formValidator.updateMessage(deferred.responseJSON.field, 'custom', deferred.responseJSON.message)
			
			this.formValidator.updateStatus(deferred.responseJSON.field, 'INVALID', 'custom')
		}
	}
)