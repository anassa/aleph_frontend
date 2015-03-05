//	Importo las dependencias de can
import	'can/control'
import	'can/construct/super'
import	'can/route'
//	Importo dependencias adicionales
import	'util/lib'
//	Importo los modelos
import	'models/user'
//	Importo las vistas
import	salesHomeView from 'views/sales/home.mustache!'
//	Importo las secciones
import	'controls/sales/thumbnails'
import	'controls/sales/sales'
import	'controls/sales/requests'
import	'controls/sales/changes'
import	'controls/sales/reports'
//	Importo los controladores genericos
import	'controls/logout'
import	'controls/profile'

//	Aleph.Sales.Home sera el Control principal de todo el modulo de Ventas
can.Control(
	'Aleph.Sales.Home'
,	{
		defaults:
		{
			user:	undefined
		,	view:	salesHomeView
		}
	}
,	{
		init: function(element, options)
		{
			//	Obtengo el usuario actual segun la sesión
			Aleph.Model.User.getCurrentUser()
				.then(
					can.proxy(this.home,this)
				,	can.proxy(this.wrong,this)
				)
		}
	//	Inicializo el home
	,	home: function(user)
		{
			//	Seteo dentro de las options el usuario obtenido
			this.options.user = user
			//	Inserto la vista y paso como argumento el usuario
			can.append(
				this.element
			,	can.view(
					this.options.view
				,	{
						user:	this.options.user
					}
				)
			)
			//	Instancio el controlador que gestiona el logout y le paso como argumento el usuario
			new	Aleph.Logout(
				this.element
			,	{
					user:	this.options.user
				}
			)
			//	Instancio el controlador que gestiona el perfil del usuario y paso como argumento el usuario
			new	Aleph.Profile(
				this.element
			,	{
					user:	this.options.user
				}
			)
			//	Setea la forma que va a tener nuestro Hash, #!:page donde :page es variable y tomara la forma que se le envie
			can.route(':option', {});
			//	Avisa que el hash esta listo para escuchar cambios
			can.route.ready();
			//	Obtengo el hash actual, si hay uno, sino voy a aleph
			can.route.attr('option') || this.aleph()
		}
	//	Notifico un error
	,	wrong: function()
		{
			steal.dev.log("OCURRIO UN ERROR AL OBTENER EL USUARIO")
		}
	//	Sección principal
	,	aleph: function()
		{
			//	Instancio los thubnails de la seccion de ventas
			new Aleph.Sales.Thumnails(
				this.where()
			,	{

				}
			)
		}
	//	Sección de ventas	
	,	sales: function()
		{
			//	Instancio la seccion de ventas de ventas
			new	Aleph.Sales.Sales(
				this.where()
			,	{

				}
			)
		}
	//	Sección de Pedidos
	,	requests: function()
		{
			//	Instancio la seccion de pedidos de ventas
			new	Aleph.Sales.Requests(
				this.where()
			,	{	}
			)
		}
	//	Sección de cambios
	,	changes: function()
		{
			//	Instancio la seccion de cambios de ventas
			new	Aleph.Sales.Changes(
				this.where()
			,	{	}
			)
		}
	//	Sección de Reportes
	,	reports: function()
		{
			//	Instancio la seccion de reportes de ventas
			new	Aleph.Sales.Reports(
				this.where()
			,	{	}
			)
		}
	//	Lugar donde crear los contenidos	
	,	where: function(view)
		{
			//	Vacio el contenido del elemento con id page-content
			this.element.find('#page-content').empty()
			//	Devuelvo un nuevo div vacio insertado dentro del elemento con id page-content
			return	can.$('<div>').appendTo(this.element.find('#page-content'))
		}
	//	Escucho que cambie el hash y renderizo la sección que corresponde.
	,	'{can.route} change': function(instance, ev, attr, how, newVal, oldVal)
		{
			//	Verifco el hash
			if	(attr == 'option') {
				//	Obtengo el hash, por defecto aleph
				var toRender
				=	newVal || 'aleph'
				//	Remuevo la opcion actual del menu
				this.element.find('.nav li.active').removeClass('active')
				//	Marco la nueva opcion en el menu
				this.element.find('.nav li a[href=#'+toRender+']').parent().addClass('active')
				//	Renderizo la seccion que corresponde
				can.isFunction(this[toRender])
				?	this[toRender]()
				:	this.aleph()
			}
		}
	}
)