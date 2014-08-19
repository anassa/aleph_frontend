define(
	[
		'lib/util'
	]
,	function()
	{
		//	Aleph.Ventas.Venta sera el Control de Venta
		can.Control(
			'Aleph.Ventas_Venta'
		,	{
				defaults:
				{
					user:	undefined
				}
			}
		,	{
				//	Cuando se inicia por primera vez debera actualizar las opciones del Topbar
				init: function(element,options)
				{
					console.log("Ventas.Venta")
				}
			}
		)
	}
)