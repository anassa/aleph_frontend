steal(
	'dev/controls/menu'
).then(
	function()
	{
		Frame.Menu(
			'Aleph.Topbar'
		,	{}
		,	{
				init: function(element,options)
				{
					can.append(
						element
					,	can.view(
							steal.idToUri(options.view).path
						,	options.data
						)
					)
				}
			}
		)
	}
)