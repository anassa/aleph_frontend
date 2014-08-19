define(
	[
		'sails.io.js'
	,	'app/aleph'
	]
,	function()
	{
		new	Aleph.Home(
			can.$('body')
		)
	}
)