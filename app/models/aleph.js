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
			//	Obtiene una collecion de instancias del modelo
			,	findAll: function(query)
				{
					var	Model
					=	this

					return	this
								.request('GET',this.getURL(),query)
				}
				//	Obtiene una instancia del modelo
			,	findOne: function(data)
				{
					var	Model
					=	this
					
					return	this
								.request('GET',this.getURL((_.isObject(data) ? data.id : data)),undefined)
				}
				//	Crea una instancia del modelo
			,	create: function(data)
				{
					var	Model
					=	this

					return	this
								.request('POST',this.getURL(),this.beforeCreate(data))
				}
				//	Actualiza una instancia del modelo
			,	update: function(id,data)
				{
					var	Model
					=	this

					return	this
								.request('PUT',this.getURL(id),this.beforeUpdate(data))
				}
				//	Elimina una instancia del modelo
			,	destroy: function(id)
				{
					return	this
								.request('DELETE',this.getURL(id),params)
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