import	'can/control'
import	'can/construct/super'
import	'can/control/plugin'
import	'can/observe'
import	'can/event'
import	'can/view'
import	'can/route'

/*
	@nombre
	Frame.Menu
	
	@descripción

	Maneja un menu, ya sea topbar o lateral, etc. Gestiona los contenidos mediante el uso del hash.
	
	@utilización

	Se debe instanciar el controlador en un elemento html, se pasaran como argumentos, las opciones del menu, la estrucutra de la ruta,
	la opcion que se toma por defecto, y el prefijo del evento a lanzar al usar una opcion.
*/
can.Control(
	'can.Menu'
,	{
		pluginName:	'menu'
	,	defaults:
		{
		/*
			OPCIONES DEL MENU
			options:
			[
				{
					name:	//	NOMBRE
				,	label:	//	TITULO
				,	options:
					[
						...
					]	
				}
			,	...
			]
		*/
			options:		[]
			//	Estrucutra de la Ruta del HASH (ver http://canjs.com/docs/can.route.html)
		,	route:			false
			//	Opcion por defecto
		,	default_option:	false
			//	Prefijo del evento a lanzar al acceder a una opcion
		,	event_prefix:	'menu'
		}
	}
,	{
		init: function(element,options)
		{
			//	Creo un objeto observable dentro del controlador con las opciones del menu
			this.menuOptions
			=	new can.Map(options.options)
			//	Inserto el menu en element y le paso el observable de sus opciones (El objetivo es poder actualizar las opciones)
			can.append(
				element
			,	can.view(
					options.view
				,	this.menuOptions
				)
			)
			//	Creo el container y seteo el handler
			this.setHandler(options.contentHandler,options.handlerOptions)
			//	Si pase una ruta, bindeo el cambio de la misma
			if	(options.route)
				can
					.route
						.bind(
							options.route
						, 	can.proxy(this._render_content,this)
						)
			//	Si pase un opcion por defecto la llamo
			if	(options.default_option)
				this.updateHash(options.default_option)
		}
	,	setHandler: function(handler,handlerOptions)
		{
			//	Interto un DIV vacio que me va a servir como contenido
			this.$container
			=	can.$('<div>')
					.appendTo(
						this.element
					)
			//	Si tengo un handler lo instancio
			if	(!_.isEmpty(handler))
				new	handler(
					this.$container
				,	handlerOptions	||	{}
				)
			
		}
	,	updateHandler: function(handler,handlerOptions)
		{
			this.$container.remove()

			this.setHandler(handler,handlerOptions)
		}
		//	Renderiza el contenido (Lanza un evento para que se renderize)
	,	_render_content: function(routeObject,newRoute,oldRoute)
		{
			//	Activa el LI si es que no esta denegado para esta routa
			if	(!_.include(this.options.prevent,newRoute))
				this.activateLI(newRoute)
			//	Vacia el contenido
			this.$container.empty()
			//	Creo el content
			var	$content
			=	can.$('<div>')
					.appendTo(
						this.$container
					)
			//	Triggea el evento usando el prefijo + el nombre de la nueva ruta
			$content
				.trigger(
					this.options.event_prefix+'.'+newRoute
				)
		}
		//	Actualiza las opciones del menu
	,	updateControlData: function(data)
		{
			if	(!_.isEmpty(data.default_option))
				this.updateHash(data.default_option)
		}
		//	Actualiza el HASH
	,	updateHash: function(routeKey)
		{
			//	Cambia el hash por la nueva ruta
			if	(_.include(this.options.prevent,routeKey))
				this._render_content(can.route.attr(),routeKey,undefined)
			else
				can
					.route
						.attr(
							this.options.route
						,	routeKey
						)
		}
		//	Activa el LI
	,	activateLI: function(key)
		{
			//	Verifica que ya hay un LI activo y si lo esta le remueve la classe "active"
			if	(!_.isEmpty(this.$active))
				this.$active.removeClass('active')
			//	Busca el li cuyo menu-key coincida con la nueva key pasada como argumento
			this.$active
			=	this.element.find('li a[menu-key='+key+']').parent()
			//	Activa el LI agrgandole la classe "active"
			this.$active.addClass('active')
		}
		//	Evento que escucha el click sobre un LI que no tenga la clase "active"
	,	'li:not(".active") a click': function(el,ev)
		{
			//	Si el LI tiene atributo menu-key actualiza el HASH con el nuevo key
			if	(!_.isEmpty(can.$(el).attr('menu-key')))
				this.updateHash(can.$(el).attr('menu-key'))
		}
		//	Evento que espera para actualizar las opciones del Menu
	,	'frame.menu.update': function(el,ev,data)
		{
			if	(!_.isEmpty(data.contentHandler))
				this.updateHandler(data.contentHandler,data.handlerOptions)
			//	Actualiza el observable con las nuevas opciones
			this
				.menuOptions
					.attr(
						_.omit(
							data.viewData
						,	'options'
						)
					)
			//	Actualiza la lista de opciones
			if	(_.isArray(data.viewData.options))
				this
					.menuOptions
						.options
							.replace(data.viewData.options)
			//	Actualiza los opciones del controlador con la nueva data
			if	(!_.isEmpty(data.controlData))
				this.updateControlData(data.controlData)
		}
	}
)