define(
	[
		'models/aleph'
	]
,	function()
	{
		Aleph.Model(
			'Aleph.Model.Item'
		,	{
				path: 'item'
			}
		,	{
				getStatus: function()
				{
					return	this.attr('stock') <= 2
							?	'danger'
							:	this.attr('stock') <= 5
								?	'warning'
								:	''
				}
			}
		)
	}
)