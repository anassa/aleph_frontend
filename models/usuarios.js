steal(
	'apps/aleph/models/aleph.js'
).then(
	function()
	{
		Aleph.Model(
			'Aleph.Model.Usuarios'
		,	{
				path: 'users'
			,	signIn: function(usarData)
				{
					return	this.request('POST',this.getURL()+'/login',usarData)
				}
			,	signup: function(newUser)
				{

				}
			,	signout: function()
				{
					
				}
			}
		,	{

			}
		)
	}
)