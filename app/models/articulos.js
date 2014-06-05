define(
	['models/aleph']
,	function()
	{
		Aleph.Model(
			'Aleph.Model.Articulos'
		,	{
				path: 'articles'

			,	search: function(params)
				{
					var	Model
					=	this

					return	this
								.request('POST',this.getURL()+'/search',params)
								.pipe(
									function(raw)
									{
										return	Model.models(raw)
									}
								)
				}
			}
		,	{

			}
		)
	}
)