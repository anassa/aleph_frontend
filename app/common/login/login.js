define(
	[
		'common/base'
	,	'can/util/string/deparam'
	]
,	function()
	{
		can.Control(
			'Frame.Login'
		,	{
				defaults:
				{
					view:	'dev/views/login/init.mustache'
				,	view_form: undefined
				,	data:
					{
						title: 'Ingreso'
					,	form:
						[
							{
								type: 'text'
							,	name: 'username'
							,	validate:
								{
									required:	true
								,	minLength:	6
								}
							}
						,	{
								type: 'password'
							,	name: 'password'
							,	validate:
								{
									required:	true
								,	minLength:	6
								}
							}
						]
					}
				,	onSigninSuccess:	function() {console.log("Sign in satisfactorio")}
				,	onSigninError:		function() {console.log("Error al realizar sign in")}
				,	onSignupSucess:		function() {console.log("Sign up satisfactorio")}
				,	onSignupError:		function() {console.log("Error al realizar sign up")}
				,	onSignoutSucess:	function() {console.log("Sign out satisfactorio")}
				,	onSignoutError:		function() {console.log("Error al realizar sign out")}
				}
			}
		,	{
				init: function(element,options)
				{
					can.append(
						element
					,	can.view(
							options.view
						,	options.data
						)
					)

					/*
					this.loginForm
					=	new	Frame.Form(
							element.find('form')
						,	{
								data:	options.data.form
							,	view:	options.view_form
							}
						)
					*/
				}

			,	clearLogin: function()
				{
					this.element.find('.alert').remove()
				}

			,	addAlert: function(data)
				{
					var	$alert
					=	can.$('<div>')

					can.append(
						$alert
					,	can.view(
							this.options.view_alert
						,	data
						)
					)

					$alert
						.insertBefore(
							this.element.find('.signin')
						)
				}

			,	onSigninSuccess: function(data)
				{
					can.trigger(
						this.element
					,	'frame.login.signin.success'
					,	data
					)
				}

			,	onSigninError: function(data)
				{
					can.trigger(
						this.element
					,	'frame.login.signin.fail'
					,	data.responseJSON || data
					)

					this
						.addAlert(
							data.responseJSON
						)

					can.trigger(
						this.loginForm
					,	'frame.form.fail'
					)
				}

			,	'.close click': function(el,ev)
				{
					can.$(el)
						.parents('.alert')
							.remove()
				}

			,	'.signin click': function(el,ev)
				{
					this.clearLogin()

					if	(!can.isFunction(this.options.onSignin))
						console.log('Error onSignin: No se proporciono una funcion')
					else
						//this.options.onSignin(this.loginForm.getData())
						this.options.onSignin(can.deparam(this.element.find('form').serialize()))
							.then(
								//	Success Sign In
								can.proxy(this.onSigninSuccess,this)
								//	Failed Sign In
							,	can.proxy(this.onSigninError,this)
							)
				}

			,	'.signup click': function(el,ev)
				{
					if	(!can.isFunction(this.options.onSignup))
						console.log('Error onSignup: No se proporciono una funcion')
					else
						this.options.onSignup()
							.then(
								//	Success Sign Up
								can.proxy(this.onSignupSucess,this)
								//	Failed Sign Up
							,	can.proxy(this.onSignupError,this)
							)	
				}

			,	'.signout click': function(el,ev)
				{
					if	(!can.isFunction(this.options.onSignup))
						console.log('Error onSignout: No se proporciono una funcion')
					else
						this.options.onSignout()
							.then(
								//	Success Sign Up
								can.proxy(this.onSignoutSucess,this)
								//	Failed Sign out
							,	can.proxy(this.onSignoutError,this)
							)	
				}
			}
		)
	}
)