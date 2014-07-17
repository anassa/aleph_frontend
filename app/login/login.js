can.Control(
	'Login'
,	{
		defaults:
		{
			view:	'app/login/login.mustache'
		}
	}	
,	{
		init: function(element,options)
		{
			can.append(
				element
			,	can.view(
					options.view
				)
			)
		}

	,	'.signin click': function()
		{
			this.element.hide()

			new	HomeVentas(
				can.$('#ventas-content')
			,	{

				}
			)
		}
	}
)