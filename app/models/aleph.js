define(
	[
		'can/model'
	]
,	function()
	{
		//	Modelo generico de la aplicacion aleph
		can.Model(
			'Aleph.Model'
		,	{
				//	Configuracion de conexion con el backend
				protocol: 'http'
			,	host: 'localhost'
			,	port: 1337
			,	path: 'insertModelHere'
				//	La funcion model convierte data cruda en una instancia del modelo actual
			,	model: function(raw)
				{
					return	_.extend(
								raw
							,	{
									createdAt:	new Date(raw.createdAt)
								,	updatedAt:	new Date(raw.updatedAt)
								}
							)
				}
				//	Obtiene una collecion de instancias del modelo
			,	findAll: function(query)
				{
					var	Model
					=	this

					return	this
								.request('GET',this.getURL(),query)
									.pipe(
										can.proxy(this.models,this)
									)
				}
				//	Obtiene una instancia del modelo
			,	findOne: function(data)
				{
					var	Model
					=	this
					
					return	this
								.request('GET',this.getURL((_.isObject(data) ? data.id : data)),undefined)
									.pipe(
										can.proxy(this.model,this)
									)
				}
				//	Crea una instancia del modelo
			,	create: function(data)
				{
					var	Model
					=	this

					return	this
								.request('POST',this.getURL(),this.beforeCreate(data))
									.pipe(
										can.proxy(this.model,this)
									)
				}
				//	Actualiza una instancia del modelo
			,	update: function(id,data)
				{
					var	Model
					=	this

					return	this
								.request('PUT',this.getURL(id),this.beforeUpdate(data))
									.pipe(
										can.proxy(this.model,this)
									)
				}
				//	Elimina una instancia del modelo
			,	destroy: function(id)
				{
					return	this
								.request('DELETE',this.getURL(id),params)
									.pipe(
										can.proxy(this.model,this)
									)
				}
				//	Realiza una peticion al backend
			,	request: function(method,url,data)
				{
					return	can.ajax(
								{
									url:		url
								,	data:		this.beforeSend(data)
								,	type:		method
								,	dataType:	'json'
								}
							)
				}
				//	Funcion que se llama antes de crear una instancia
			,	beforeCreate: function(data)
				{
					return	data
				}
				//	Funcion que se llama antes de actualizar una instancia
			,	beforeUpdate: function(data)
				{
					return data
				}
				//	Funcion que se llama antes de enviar una peticion al backend
			,	beforeSend: function(data)
				{
					return	_.omit(
								data
							,	['createdAt','updatedAt']
							)
				}
				//	Obtiene la URL del modelo
			,	getURL: function(id)
				{
					var modelURL
					=	(can.fixture && can.fixture.on)
						?	can.sub('/{path}',{path: this.path})
						:	can.sub('{protocol}://{host}:{port}/{path}',{protocol: this.protocol, host: this.host, port: this.port, path: this.path})

					return	modelURL+(!	_.isUndefined(id) ? can.sub('/{id}', {id: id}) : '')
				}
			}
		,	{

			}
		)
	}
)