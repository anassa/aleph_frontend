import	'models/aleph'
import	'models/profile'

//	Modelo de User de Aleph
Aleph.Model(
	'Aleph.Model.User'
,	{
		//	Path en el backend de la collecion user
		path: 'user'
		//	Loguea el usuario al sistema
	,	login: function(userData)
		{
			return	this
						.request(
							'POST'
						,	this.getURL()+'/login'
						,	userData
						).pipe(
							can.proxy(this.model,this)
						)
		}
		//	Obtiene el usuario actual segun la sessión registrada por sails
	,	getCurrentUser: function()
		{
			return	this.request('GET',this.getURL()+'/current')
						.pipe(
							can.proxy(this.model,this)
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
	,	logout: function()
		{
			return	this
						.constructor
							.request(
								'POST'
							,	this.constructor.getURL()+'/logout'
							)
		}
		//	Actualiza la password del usuario
	,	updatePassword: function(formData)
		{
			//	Agrega el atributo password y llama a la funcion save (http://canjs.com/docs/can.Model.prototype.save.html)
			return	this
						.constructor
							.request(
								'POST'
							,	this.constructor.getURL()+'/updatePassword'
							,	{
									id:				this.attr('id')
								,	currentPassword:formData.currentPassword
								,	newPassword:	formData.newPassword
								}
							).pipe(
								can.proxy(this.constructor.model,this.constructor)
							)
								
		}
	}
)