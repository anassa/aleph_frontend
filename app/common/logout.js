define(
	[
		//	Cargo las librerias basicas
		'lib/util'
	]
,	function()
	{
		//	Aleph.Logout sera el Control que se encarga de manejar el logout del usuario
		can.Control(
			'Aleph.Logout'
		,	{
				defaults:
				{
					user:	undefined
				,	view:	'views/common/logout.mustache'
				}
			}
		,	{
				init: function(element,options)
				{
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
								.find('#logoutModal')

				}

			,	show: function()
				{
					this
						.$modal
							.modal('show')
				}

			,	'.btn-primary click': function(el,ev)
				{					
					$(el).button('loading')
					
					this
						.options
							.user
								.signOut()
									.then(
										can.proxy(this.logoutComplete,this)
									,	can.proxy(this.logoutFailed,this)										
									).always(
										function()
										{
											$(el).button('reset')											
										}
									)
				}

			,	logoutComplete: function()
				{
					this
						.element
							.trigger(
								'frame.notify.success'
							,	'Has salido de forma correcta.'
							)

					this
						.$modal
							.modal('hide')
				}

			,	logoutFailed: function()
				{
					this
						.element
							.trigger(
								'frame.notify.danger'
							,	'Ocurrio un error al salir. <br> Por favor intentelo nuevamente.'
							)
				}
			}
		)
	}
)