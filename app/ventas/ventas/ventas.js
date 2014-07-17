can.Control(
	'Ventas'
,	{
		defaults:
		{
			view:			'app/ventas/ventas/ventas.mustache'
		,	view_facturar:	'app/ventas/ventas/facturar.mustache'
		}
	}	
,	{
		init: function(element,options)
		{
			can.append(
				element
			,	can.view(
					options.view
				)
			)

			this.$wizard
			=	can.$('<div>')

			can.append(
				this
					.$wizard
			,	can.view(
					this.options.view_facturar
				)
			)

			this
				.$wizard
					.addClass('wizard')
					.attr('data-title','Registrar Factura')

			this.wizard
			=	this
					.$wizard
						.wizard(
							{
								keyboard : false
							,	contentHeight : 500
							,	contentWidth : 900
							,	backdrop: 'static'
							,	buttons:
								{
									nextText: 'Siguiente'
								,	backText: 'Anterior'
								,	submitText: 'Facturar'
								,	submittingText: 'Facturando'
								}
							}
						)

			this.wizard.on('submit',function(w){console.log(w.close())})
		}

	,	'.glyphicon-minus click': function(el,ev)
		{
			can.$(el)
				.removeClass('glyphicon-minus')
				.addClass('glyphicon-plus')
				.parents('.panel-primary')
					.find('.panel-body, table')
						.hide()
		}

	,	'.glyphicon-plus click': function(el,ev)
		{
			can.$(el)
				.removeClass('glyphicon-plus')
				.addClass('glyphicon-minus')
				.parents('.panel-primary')
					.find('.panel-body, table')
						.show()
		}

	,	'.facturar click': function()
		{
			this.wizard.show()
		}
	}
)