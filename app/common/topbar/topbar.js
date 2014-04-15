define(
	['common/menu/menu']
,	function()
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
							options.view
						,	options.data
						)
					)
				}
			}
		)
	}
)