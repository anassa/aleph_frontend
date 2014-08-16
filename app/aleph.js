define(
	[
	//	Cargo el Login
		'frame/controls/login/login'
	//	Cargo Ventas
	,	'venta/venta'
	//	Cargo el Modelo de Usuario
	,	'models/user'
	//	Cargo los Estilos Genericos
	,	'lib/styles'
	//	Cargo los Estilos De la App
	,	'css!styles/aleph'
	,	'css!styles/login'
	]
,	function()
	{
		can.Control(
			'Aleph.Home'
		,	{
				defaults:
				{
					route:	'page'
				}
			}
		,	{
				init: function(element,options)
				{
					this.$topbar
					=	can.$('<div>')
							.appendTo(
								element
							)

					this.$content
					=	can.$('<div>')
							.appendTo(
								element
							)

					can.append(
						element
					,	can.view(
							'views/footbar/footbar.mustache'
						)
					)

					location.hash = ""

					can.route(':'+options.route, {});
					
					can.route.ready();
					
					new	Frame.Menu(
						this.$topbar
					,	{
							view:	'views/topbar/topbar.mustache'
						,	options:
							{
								brand:			'Aleph'
							,	options:		[]
							}
						,	default_option:	'login'
						,	event_prefix:	'aleph.render'
						,	route:			options.route
						}
					)

					//this._render_login()
				}

			,	'aleph.menu.update': function(el,ev,data)
				{
					this
						.$topbar
							.trigger(
								'frame.menu.update'
							,	data
							)
				}

			,	'aleph.render.login': function()
				{
					new Frame.Login(
						can.$('<div>')
							.appendTo(
								this.$content.empty()
							)
					,	{
							view:		'views/login/login.mustache'
						,	view_alert:	'views/login/alert.mustache'
						,	data:
							{
								brand:	'Aleph'	
							}
						,	onSignin:	can.proxy(this.signIn,this)
						,	onSignout:	can.proxy(this.signOut,this)
						}
					)
				}

			,	_render_content: function(content,user)
				{
					//	Elimino el contenido del DIV $content
					this.$content.empty()
					//	Instancio el controlador que se encuentra en la variable content (Ventas, Compras, etc)
					new	Aleph[content](
						this.$content
					,	{
							user:	user
						}
					)
				}

			,	signIn: function(formData)
				{
					return	Aleph.Model.User.signIn(formData)
				}

			,	signOut: function()
				{
					return	true
				}

			,	'frame.login.signin.success': function(el,el,user)
				{
					if	(!_.isEmpty(user.getProfile()))
						this._render_content(can.capitalize(user.getProfile()),user)
				}
			}
		)
	}
)