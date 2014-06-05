define(
	['can/model']
,	function()
	{
		can.Model(
			'Aleph.Model'
		,	{
				protocol: 'http'
			,	host: 'localhost'
			,	port: 1337
			,	path: 'insertModelHere'
			,	findAll: function(params)
				{
					var	Model
					=	this

					return	this
								.request('GET',this.getURL(),params)
				}
			,	findOne: function(data)
				{
					var	Model
					=	this
					
					return	this
								.request('GET',this.getURL(data.id),undefined)
				}
			,	create: function(params)
				{
					var	Model
					=	this

					return	this
								.request('POST',this.getURL(),params)
				}
			,	update: function(id,data)
				{
					var	Model
					=	this

					return	this
								.request('PUT',this.getURL(data.id),data)
				}
			,	destroy: function(params)
				{
					return	this.request('DELETE',this.getURL(params),params)
				}
			,	request: function(method,url,data)
				{
					return	can.ajax(
								{
									url:	url
								,	data:	this.beforeSend(data)
								,	type:	method
								,	dataType: 'json'
								}
							)
				}
			,	beforeSend: function(data)
				{
					return	data
				}
			,	getURL: function(id)
				{
					return	(can.fixture && can.fixture.on)
							?	can.sub('/{path}',{path: this.path})
							:	can.sub('{protocol}://{host}:{port}/{path}',{protocol: this.protocol, host: this.host, port: this.port, path: this.path})
				}
			}
		,	{

			}
		)
	}
)