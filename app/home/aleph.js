require(
	['jquery']
)

require(
	[
	//	Scripts
		'common/topbar/topbar'
	,	'common/login/login'
	,	'models/usuarios'
	//	Styles
	//	De Frameworks
	,	'css!bootstrap/css/bootstrap.min'
	,	'css!fontawesome/css/font-awesome.min'
	,	'bootstrap/js/bootstrap.min'
	//	De la App
	,	'css!styles/aleph'
	,	'css!styles/login'
	]
,	function()
	{
		new	Aleph.Topbar(
			can.$('body')
		,	{
				view:	'views/topbar.mustache'
			,	data:
				{
					brand:	'Aleph'
				,	options:[]
				}
			}
		)

		new Frame.Login(
			can.$('body')
		,	{
				view:	'views/login/login.mustache'
			,	view_alert: 'views/login/alert.mustache'
			,	onSignin:	function(formData){return Aleph.Model.Usuarios.signIn(formData)}
			}
		)
		can.append(
			can.$('body')
		,	can.view(
				'views/footer.mustache'
			)
		)
	}
)