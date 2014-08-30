define(
	[
	//	Cargo el Menu
		'controls/menu/menu'
	//	Cargo los controladores de Ventas
	,	'venta/sales/sales'
	]
,	function()
	{
		//	Aleph.Ventas sera el Control principal de todo el modulo de Ventas
		can.Control(
			'Aleph.Ventas'
		,	{
				defaults:
				{
					user:	undefined
				}
			}
		,	{
				'aleph.render.ventas': function(el,ev)
				{
					//	Ev.target es el contenido donde se lanzo el evento, en ese elemento se va a instanciar ventas
					new Aleph.Ventas_Sales(
						can.$(ev.target)
					,	{
							user:	this.options.user
						}
					)
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
					new Aleph.Ventas_FormaDePago(
						can.$(ev.target)
					,	{
							user:	this.options.user
						}
					)
				}
			}
		)
	}
)