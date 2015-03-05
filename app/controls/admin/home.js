//	Importo las dependencias de can
import	'can/control'
import	'can/construct/super'
import	'can/route'
//	Importo dependencias adicionales
import	'util/lib'
//	Importo los modelos
import	'models/user'
//	Importo las vistas
import	homeView from 'views/admin/home.mustache!'
//	Importo las secciones
import	'controls/admin/thumbnails'
import	'controls/admin/reports'
import	'controls/sales/sales'
import	'controls/sales/requests'
import	'controls/sales/changes'
import	'controls/sales/paymentMethod'
import	'controls/sales/client'
import	'controls/purchases/purchaseOrders'
import	'controls/purchases/tags'
import	'controls/purchases/suppliers'
import	'controls/stock/items'
import	'controls/stock/refers'
//	Importo los controladores genericos
import	'controls/logout'
import	'controls/profile'

//	Aleph.Admin.Home sera el Control principal de todo el modulo de Administración
can.Control(
	'Aleph.Admin.Home'
,	{
		defaults:
		{
			user:	undefined
		,	view:	homeView
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
			//	Instancio los thubnails de la seccion de Admin
			new Aleph.Admin.Thumnails(
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
	//	Sección de Pedidos
	,	clients: function()
		{
			//	Instancio la seccion de clientes de ventas
			new	Aleph.Sales.Clients(
				this.where()
			,	{	}
			)
		}
	//	Sección de cambios
	,	paymentMethods: function()
		{
			//	Instancio la seccion de metodos de pago de ventas
			new	Aleph.Sales.PaymentMethods(
				this.where()
			,	{	}
			)
		}
	//	Sección de ordenes de compra	
	,	purchaseOrders: function()
		{
			//	Instancio la seccion de ordenes de compra de compras
			new	Aleph.Purchases.PurchaseOrders(
				this.where()
			,	{

				}
			)
		}
	//	Sección de Proveedores
	,	suppliers: function()
		{
			//	Instancio la seccion de proveedores de compras
			new	Aleph.Purchases.Suppliers(
				this.where()
			,	{	}
			)
		}
	//	Sección de etiquetas
	,	tags: function()
		{
			//	Instancio la seccion de etiquetas de compras
			new	Aleph.Purchases.Tags(
				this.where()
			,	{	}
			)
		}
	//	Sección de Articulos
	,	items: function()
		{
			//	Instancio la seccion de articulos de stock
			new	Aleph.Stock.Items(
				this.where()
			,	{	}
			)
		}
	//	Sección de Remitos
	,	refers: function()
		{
			//	Instancio la seccion de remitos de stock
			new	Aleph.Stock.Refers(
				this.where()
			,	{	}
			)
		}
	//	Sección de Reportes
	,	reports: function()
		{
			//	Instancio la seccion de reportes de admin
			new	Aleph.Admin.Reports(
				this.where()
			,	{	}
			)
		}
	//	Lugar donde crear los contenidos	
	,	where: function(view)
		{
			this.element.find('#page-content').empty()
			
			return	can.$('<div>').appendTo(this.element.find('#page-content'))
		}
	//	Escucho que cambie el hash y renderizo la sección que corresponde.
	,	'{can.route} change': function(instance, ev, attr, how, newVal, oldVal)
		{
			
			if	(attr == 'option') {
				var toRender
				=	newVal || 'principal'
				
				this.element.find('.nav li.active').removeClass('active')
				
				this.element.find('.nav li a[href=#'+toRender+']').parent().addClass('active')
				
				this[toRender]()
			}
		}
	}
)