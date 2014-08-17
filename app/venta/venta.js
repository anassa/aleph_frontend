define(
	[
	//	Cargo el Menu
		'frame/controls/menu/menu'
	//	Cargo los controladores de Ventas
	]
,	function()
	{
		//	Aleph.Ventas sera el Control principal de todo el modulo de Ventas
		can.Control(
			'Aleph.Ventas'
		,	{
				defaults:
				{
					menu:	undefined
				}
			}
		,	{
				//	Cuando se inicia por primera vez debera actualizar las opciones del Topbar
				init: function(element,options)
				{
					//	Envia al menu las nuevas opciones para su controlador
					this
						.element
							.trigger(
								'frame.menu.update'
							,	{
									viewData:
									{
										options:
											[
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
										,	user:	options.user
									}
								,	controlData:
									{
										default_option:	'ventas'
									}
								}
							)
				}

				//	Evento que al ser escuchado renderiza Ventas
			,	'aleph.render.ventas': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar ventas
					console.log("Ventas",arguments)
				}
			//	Evento que al ser escuchado renderiza Cambios
			,	'aleph.render.cambios': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar cambios
					console.log("Cambios",arguments)
				}
			//	Evento que al ser escuchado renderiza Clientes
			,	'aleph.render.clientes': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar clientes
					console.log("Clientes",arguments)
				}
			//	Evento que al ser escuchado renderiza Descuentos
			,	'aleph.render.descuentos': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar descuentos
					console.log("Descuentos",arguments)
				}
			//	Evento que al ser escuchado renderiza Articulos
			,	'aleph.render.articulos': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar articulos
					console.log("Articulos",arguments)
				}
			//	Evento que al ser escuchado renderiza Formas de Pago
			,	'aleph.render.formas_de_pago': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar formas_de_pago
					console.log("Formas de Pago",arguments)
				}
			}
		)
	}
)