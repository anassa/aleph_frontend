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
				//	Funcion que convierte data cruda en una instancia
			,	model: function(raw)
				{
					//	Agrega los perfiles del usuario como instancias del modelo Profile
					return	this._super(
								_.extend(
									raw
								,	{
										profile:	!_.isEmpty(raw.profile) 	?	new Aleph.Model.Profile(raw.profile)	:	raw.profile
									}
								)
							)
				}
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
					var	idProfile
					=	data.profile.id
					
					delete	data.profile

					data.profile = idProfile

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
			}
		)
	}
)