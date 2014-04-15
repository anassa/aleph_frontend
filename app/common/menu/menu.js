define(
	['common/base']
,	function()
	{
		can.Control(
			'Frame.Menu'
		,	{
				defaults:
				{
				/*
				//	OPCIONES DEL MENU
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
				//	Selector para buscar el contenido
				,	contentSelector: // SELECTOR
				*/
				//	Se habilita o no el cambio de HASH
					enableHash: true
				//	Template de la ruta del HASH
				,	routeTemplate: ':option'
				,	routeAttr: 'option'
				}
			}
		,	{
				init: function(element,options)
				{
					can.append(
						element
					,	can.view(
							options.view
						,	options.options
						)
					)
				}

			,	'li > .option click': function(el,ev)
				{
					var	optionName
					=	can.$(el).attr('name')

					if	(can.isFunction(this['_render_'+optionName]))
						this.updateStatus(optionName)
					else
						console.log('Error: Funcion '+'_render_'+optionName+' no definida.')
				}

			,	updateStatus: function(optionName)
				{
					if	(this.options.enableHash)
						this.updateHash(optionName)
					else
						this.updateContent(optionName)
				}

			,	updateHash: function(optionName)
				{
					can.route.attr(option,optionName)
				}

			,	updateContent: function(optionName)
				{
					var	$content
					=	this.element.find(this.options.contentSelector)
					
					this['_render_'+optionName]($content)
				}

			,	'{routeTemplate} route': function(data)
				{
					this['_render_'+optionName]($content)
				}
			}
		)
	}
)