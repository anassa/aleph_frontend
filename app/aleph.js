define(
	[
	//	Cargo el Login
		'frame/controls/login/login'
	,	'frame/controls/notify/notify'
	//	Cargo el Profile
	,	'common/profile'
	//	Cargo el Logout
	,	'common/logout'
	//	Cargo Ventas
	,	'venta/home'
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
		//	Aleph.Home va a controlar la gestion de la APP. Desde el Login hasta el Logout.
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
					//	Instancio el Handler de Notificaciones
					new	Frame.Notify(
						this.element
					,	{}
					)
					//	Genera un DIV para contener el topbar
					this.$topbar
					=	can.$('<div>')
							.appendTo(
								element
							)
					//	Agrega el Footbar
					can.append(
						element
					,	can.view(
							'views/common/footbar.mustache'
						)
					)
					//	Borra el Hash
					location.hash = ""
					//	Setea la forma que va a tener nuestro Hash, #!:page donde :page es variable y tomara la forma que se le envie
					can.route(':'+options.route, {});
					//	Avisa que el hash esta listo para escuchar cambios
					can.route.ready();
					//	Insterta el Topbar dentro del DIV generado antes
					this.topbar
					=	new	Frame.Menu(
							this.$topbar
						,	{
								view:			'views/common/topbar.mustache'
							,	options:
								{
									brand:		'Aleph'
								,	options:	[]
								}
							,	default_option:	'login'
							,	event_prefix:	'aleph.render'
							,	route:			options.route
							,	prevent:		['profile','logout']
							}
						)
				}
				//	Evento que al ser escuchado renderiza el Login
			,	'aleph.render.login': function(el,ev,data)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar el Login
					new Frame.Login(
						can.$(ev.target)
					,	{
							view:		'views/common/login.mustache'
						,	view_alert:	'views/common/alert.mustache'
						,	onSignin:	can.proxy(this.signIn,this)
						}
					)
				}
				/*
				//	Evento que al ser escuchado renderiza el contenido dependiendo del usuario
			,	'aleph.render.content': function(el,ev)
				{
					//	User.getProfile devuelve el nombre del perfil del usuario, por ejemplo Ventas.
					//	Al hacer Aleph["Ventas"] se hace referencia al controlador Aleph.Ventas.
					//	Recordar que es Aleph es un objeto y "Ventas" sera la key a acceder
					new Aleph[this.currentUser.getProfile()](
						can.$(ev.target)
					,	{
							user:	this.currentUser
						}
					)
					//	Inserto el Handler del Modal Profile
					this.userProfile
					=	new	Aleph.Profile(
							can.$('<div>')
								.appendTo(this.$topbar)
						,	{
								user:	this.currentUser
							}	
						)
					//	Inserto el Handler del Modal de Logout
					this.userLogout
					=	new	Aleph.Logout(
							can.$('<div>')
								.appendTo(this.$topbar)
						,	{
								user:	this.currentUser
							}	
						)
				}
				*/
				//	Evento que al ser escuchado renderiza profile
			,	'aleph.render.profile': function(el,ev)
				{
					//	Activo el Modal del Profile
					this.userProfile.show()
				}
				//	Evento que al ser escuchado renderiza logout
			,	'aleph.render.logout': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar logout
					this.userLogout.show()
				}
				//	Funcion a llamar cuando se solicita el login
			,	signIn: function(formData)
				{
					return	Aleph.Model.User.signIn(formData)
				}
			,	getUserMenu: function()
				{
					return	[
								{
									title:	'Ventas'
								,	key:	'ventas'
								}
							,	{
									title:	'Cambios'
								,	key:	'cambios'
								}
							,	{
									title:	'Clientes'
								,	key:	'clientes'
								}
							,	{
									title:	'Descuentos'
								,	key:	'descuentos'
								}
							,	{
									title:	'Articulos'
								,	key:	'articulos'
								}
							,	{
									title:	'Formas de Pago'
								,	key:	'formas_de_pago'
								}
							]
				}
			,	getUserDefaultOption: function()
				{
					return	'ventas'
				}
				//	Evento a escuchar i el login es satisfactorio
			,	'frame.login.signin.success': function(el,ev,user)
				{
					/*
					//	Seteo quien es el usuario logeado
					this.currentUser
					=	user
					//	Ev.target contiene el DIV donde se va a instanciar el contenido.
					//	Vacio el elemento
					can.$(ev.target).empty()
					//	Triggeo el evento que renderizara el contenido dependiendo el usuario
					can.$(ev.target)
						.trigger(
							'aleph.render.content'
						)
					*/
					this
						.$topbar
							.trigger(
								'frame.menu.update'
							,	{
									viewData:
									{
										options:	this.getUserMenu(user)
									,	user:		user
									}
								,	controlData:
									{
										default_option:	this.getUserDefaultOption(user)
									}
								,	contentHandler:	Aleph[user.getProfile()]
								,	handlerOptions:
									{
										user:		user
									}
								}
							)
					//	Inserto el Handler del Modal Profile
					this.userProfile
					=	new	Aleph.Profile(
							can.$('<div>')
								.appendTo(this.$topbar)
						,	{
								user:	user
							}	
						)
					//	Inserto el Handler del Modal de Logout
					this.userLogout
					=	new	Aleph.Logout(
							can.$('<div>')
								.appendTo(this.$topbar)
						,	{
								user:	user
							}	
						)
				}
			}
		)
	}
)