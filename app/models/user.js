define(
	[
		'models/aleph'
	,	'models/profile'
	]
,	function()
	{
		//	Modelo de User de Aleph
		Aleph.Model(
			'Aleph.Model.User'
		,	{
				//	Path en el backend de la collecion user
				path: 'user'
				//	Loguea el usuario al sistema
			,	signIn: function(userData)
				{
					return	this
								.request(
									'POST'
								,	this.getURL()+'/login'
								,	userData
								).pipe(
									function(raw)
									{
										return	new Aleph.Model.User(raw)
									}
								)
				}
				//	Obtiene la URL de validacion de password
			,	getValidatePasswordURL: function()
				{
					return	this.getURL()+'/validatePassword'
				}
				//	Antes de actualizar cambia el objeto profile por el ID del mismo
			,	beforeUpdate: function(data)
				{
					if	(!_.isUndefined(data.profile)) {
						var	idProfile
						=	data.profile.id
						
						delete	data.profile

						data.profile = idProfile
					}

					return	this._super(data)
				}
			}
		,	{
				//	Obtiene el perfil del usuario
				getProfile: function()
				{
					return	this.profile.attr('name')
				}
				//	Desloguea el usuario
			,	signOut: function()
				{
					return	this
								.constructor
									.request(
										'POST'
									,	this.constructor.getURL()+'/logout'
									)
				}
				//	Actualiza la password del usuario
			,	updatePassword: function(newPassword)
				{
					//	Agrega el atributo password y llama a la funcion save (http://canjs.com/docs/can.Model.prototype.save.html)
					return	this
								.attr('password',newPassword)
									.save()
									.pipe(
										function(raw)
										{
											//	Elimina el atributo password del usuario
											delete raw.password
											//	Devuelve el usuario sin la password
											return 	raw
										}
									)
										
				}
			}
		)
	}
)