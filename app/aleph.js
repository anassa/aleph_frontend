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
							'views/footbar/footbar.mustache'
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
								view:			'views/topbar/topbar.mustache'
							,	options:
								{
									brand:		'Aleph'
								,	options:	[]
								}
							,	default_option:	'login'
							,	event_prefix:	'aleph.render'
							,	route:			options.route
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
				//	Evento que al ser escuchado renderiza el contenido dependiendo del usuario
			,	'aleph.render.content': function(el,ev,user)
				{
					//	User.getProfile devuelve el nombre del perfil del usuario, por ejemplo Ventas.
					//	Al hacer Aleph["Ventas"] se hace referencia al controlador Aleph.Ventas.
					//	Recordar que es Aleph es un objeto y "Ventas" sera la key a acceder
					new Aleph[user.getProfile()](
						can.$(ev.target)
					,	{
							user:	user
						}
					)
				}
				//	Evento que al ser escuchado renderiza profile
			,	'aleph.render.profile': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar profile
					console.log("Profile",arguments)
				}
				//	Evento que al ser escuchado renderiza logout
			,	'aleph.render.logout': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar logout
					console.log("Logout",arguments)
				}
				//	Funcion a llamar cuando se solicita el login
			,	signIn: function(formData)
				{
					return	Aleph.Model.User.signIn(formData)
				}
				//	Funcion a llamar cuando se solicita el logout
			,	signOut: function()
				{
					return	true
				}
				//	Evento a escuchar i el login es satisfactorio
			,	'frame.login.signin.success': function(el,ev,user)
				{
					//	Ev.target contiene el DIV donde se va a instanciar el contenido.
					//	Vacio el elemento
					can.$(ev.target).empty()
					//	Triggeo el evento que renderizara el contenido dependiendo el usuario
					can.$(ev.target)
						.trigger(
							'aleph.render.content'
						,	user
						)
				}
			}
		)
	}
)