steal(
	'can/model'
).then(
	function()
	{
		can.Model(
			'Aleph.Model'
		,	{
				protocol: 'http'
			,	host: 'localhost'
			,	port: 1337
			,	path: 'insertModelHere'
			,	findAll: function(sucess,error)
				{
					var	Model
					=	this

					return	this
								.request('GET',this.getURL(),undefined,sucess,error)
								.pipe(
									function(raw)
									{
										return	Model.models(raw)
									}
								)
				}
			,	findOne: function(data,sucess,error)
				{
					var	Model
					=	this
					
					return	this
								.request('GET',this.getURL(data.id),undefined,sucess,error)
								.pipe(
									function(raw)
									{
										return	Model.model(raw)
									}
								)
				}
			,	create: function(params,sucess,error)
				{
					var	Model
					=	this

					return	this
								.request('POST',this.getURL(),params,sucess,error)
								.pipe(
									function(raw)
									{
										return	Model.model(raw)
									}
								)
				}
			,	update: function(id,data,sucess,error)
				{
					var	Model
					=	this

					return	this
								.request('PUT',this.getURL(data.id),data,sucess,error)
								.pipe(
									function(raw)
									{
										return	Model.model(raw)
									}
								)
				}
			,	destroy: function(params,sucess,error)
				{
					return	this.request('DELETE',this.getURL(params),params,sucess,error)
				}
			,	request: function(method,url,data,sucess,error)
				{
					return	can.ajax(
								{
									url:	url
								,	data:	this.beforeSend(data)
								,	type:	method
								,	dataType: 'json'
								}
							).then(
								sucess && can.proxy(sucess,this)
							,	error && can.proxy(error,this)
							)
				}
			,	beforeSend: function(data)
				{
					return	data
				}
			,	getURL: function(id)
				{
					return	can.sub('{protocol}://{host}:{port}/{path}',{protocol: this.protocol, host: this.host, port: this.port, path: this.path})
				}
			}
		,	{

			}
		)
	}
)