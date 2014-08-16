define(
	[
		'models/aleph'
	,	'models/profile'
	]
,	function()
	{
		Aleph.Model(
			'Aleph.Model.User'
		,	{
				path: 'user'
			,	model: function(raw)
				{
					return	_.extend(
								raw
							,	{
									profile:	!_.isEmpty(raw.profile) 	?	new Aleph.Model.Profile(raw.profile)	:	raw.profile
								,	createdAt:	new Date(raw.createdAt)
								,	updatedAt:	new Date(raw.updatedAt)
								}
							)
				}
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
			,	signup: function(newUser)
				{

				}
			,	signout: function()
				{
					
				}
			}
		,	{
				getProfile: function()
				{
					return	this.profile.attr('name')
				}
			}
		)
	}
)