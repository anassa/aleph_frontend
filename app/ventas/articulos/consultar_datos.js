define(
	[
		'lib/util'
	,	'models/articulos'
	]
,	function()
	{
		can.Control(
			'Aleph.Articulos.Consultar'
		,	{
				defaults:
				{
					view_search:	'app/ventas/views/articulos/search.mustache'
				,	view_table:		'app/ventas/views/articulos/table.mustache'
				}
			}
		,	{
				init: function(element,options)
				{
					this.Data = new can.Map()

					this._render_search()

					this._render_table()
				}

			,	_render_search: function()
				{
					can.append(
						this.element
					,	can.view(
							this.options.view_search
						)
					)
				}

			,	'input[name=articulo] keyup': function(el,ev)
				{
					if	(ev.keyCode == 13) {
						var	$input
						=	this.element.find('input[name=articulo]')
						,	$button
						=	this.element.find('button.search-articulos')
						
						this.searchArticulos($input,$button)
					}
				}

			,	'button.search-articulos click': function(el,ev)
				{
					var	$input
					=	this.element.find('input[name=articulo]')
					,	$button
					=	this.element.find('button.search-articulos')
					
					this.searchArticulos($input,$button)
				}

			,	searchArticulos: function($input,$button)
				{
					var self
					=	this

					$button.button('loading')

					Aleph
						.Model
							.Articulos
								.search(
									{
										$or:
										[
											{
												codigo:	$input.val()
											,	nombre:	$input.val()
											}
										]
									}
								).then(
									function(data)
									{
										self.Data.attr('items',data)
									}
								).always(
									function()
									{
										$button.button('reset')
									}
								)
				}

			,	_render_table: function(data)
				{
					can.append(
						this.element
					,	can.view(
							this.options.view_table
						,	this.Data
						)
					)
				}
			}
		)
	}
)