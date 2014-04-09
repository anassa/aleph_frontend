steal(
	'jquery'
).then(
	'dev/controls/login'
,	'apps/aleph/models/usuarios.js'
,	'apps/aleph/controls/topbar'
,	'apps/aleph/aleph.css'
).then(
	function()
	{
		new	Aleph.Topbar(
			can.$('body')
		,	{
				view:	'apps/aleph/views/topbar.mustache'
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
				view:	'apps/aleph/views/login/login.mustache'
			,	view_alert: 'apps/aleph/views/login/alert.mustache'
			,	onSignin:	function(formData){return Aleph.Model.Usuarios.signIn(formData)}
			}
		)

		can.append(
			can.$('body')
		,	can.view(
				steal.idToUri('apps/aleph/views/footer.mustache').path
			)
		)
	}
)
//	DEV ONLY
.then(
	'apps/aleph/dev/holder.js'
).then(
	function()
	{
		Holder.run()
	}
)