define(
	[
		'can/util/fixture'
	]
,	function()
	{
		var	articleStore
		=	can.fixture.store(
				50
			,	function(id,i)
				{
					return	{
								codigo:	(id % 2) ? 'AAA' : 'BBB'
							,	nombre: (id % 2) ? 'ASA' : 'BAB'
							,	descripcion: 'ASDADAD'
							,	stock: 12
							,	alarma_minima: 45
							,	alarma_maxima: 100
							,	precio_venta: 1231
							,	id: id
							}
				}
			)
		,	searchArticles
		=	function(params)
			{
				var	query
				=	params.data
				,	filtered
				=	_.filter(
						articleStore.findAll().data
					,	function(article,index)
						{
							return	_.isEqual(article.codigo.toLowerCase(),query.$or[0].codigo.toLowerCase())
								||	_.isEqual(article.nombre.toLowerCase(),query.$or[0].nombre.toLowerCase())
						}
					)

				return	{
							data:	filtered
						,	count:	filtered.length
						}
			}

		can.fixture(
			{
				'GET /articles':			articleStore.findAll
			,	'GET /articles/{id}':		articleStore.findOne
			,	'POST /articles':			articleStore.create
			,	'PUT /articles/{id}':		articleStore.update
			,	'DELETE /articles/{id}':	articleStore.destroy
			,	'POST /articles/search':	searchArticles
			}
		)
	}
)