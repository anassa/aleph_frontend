define(
	[
	//	Cargo el Menu
		'frame/controls/menu/menu'
	//	Cargo los controladores de Ventas
	]
,	function()
	{
		can.Control(
			'Aleph.Ventas'
		,	{
				defaults:
				{
					menu:	undefined
				}
			}
		,	{
				init: function(element,options)
				{
					this
						.element
							.trigger(
								'aleph.menu.update'
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
			}
		)
	}
)