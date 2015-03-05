import	'models/aleph'

Aleph.Model(
	'Aleph.Model.Client'
,	{
		path: 'client'
	,	findByDNIOrCUIL: function(dni_cuil)
		{
			return	this
						.request(
							'GET'
						,	this.getURL()+'/findByDNIOrCUIL/'+dni_cuil
						)
		}
	}
,	{
	}
)