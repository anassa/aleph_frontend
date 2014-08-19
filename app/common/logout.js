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
					//	Inserto el modal
					can.append(
						element
					,	can.view(
							options.view
						,	options.user
						)
					)
					//	Seteo una variable del controlador con el modal insertado
					this.$modal
					=	this
							.element
								.find('#logoutModal')
					//	Seteo una condicion de deslogueo en falso. 
					this.isLoggedOut
					=	false
				}
				//	Muestro el modal
			,	show: function()
				{
					this
						.$modal
							.modal('show')
				}
				//	Escucho que se aprete el boton "Salir"
			,	'.btn-primary click': function(el,ev)
				{					
					//	Pongo a cargar el boton "Saliendo"
					$(el).button('loading')
					//	Deslogueo el usuario actual
					this
						.options
							.user
								.signOut()
									.then(
										//	Si el deslogueo fue satisfactorio
										can.proxy(this.logoutComplete,this)
										//	Si el deslogueo fallo
									,	can.proxy(this.logoutFailed,this)										
									).always(
										//	En ambos casos
										function()
										{
											$(el).button('reset')											
										}
									)
				}
				//	Muestor una notificacion indicando que se deslogueo el usuario
			,	logoutComplete: function()
				{
					//	Seteo la condicion de deslogueo en verdadero 
					this.isLoggedOut
					=	true
					//	Oculto el modal
					this
						.$modal
							.modal('hide')
					//	Triggeo un notify del tipo "succes"
					this
						.element
							.trigger(
								'frame.notify.success'
							,	'Has salido de forma correcta.'
							)
				}
				//	Escucho cuando se oculta el modal para desloguearme
			,	'hidden.bs.modal': function(el,ev)
				{
					//	Si esta deslogueado triggeo el logout
					if	(this.isLoggedOut)
						this
							.element
								.trigger(
									'frame.menu.update'
								,	{
										viewData:
										{
											options:	[]
										,	user:		undefined
										}
									,	controlData:
										{
											default_option:	'login'
										}
									}
								)
				}
				//	Muestro una notificacion indicando que fallo el deslogueo
			,	logoutFailed: function()
				{
					//	Triggeo un notify del tipo "danger"
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