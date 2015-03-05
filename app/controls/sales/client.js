import	'can/control'
import	'can/construct/super'
import	clientView from 'views/sales/clients.mustache!'

can.Control(
	'Aleph.Sales.Clients'
,	{
		defaults:
		{
			view:	clientView
		}
	}
,	{
		init: function(element, options)
		{
			can.append(
				element
			,	can.view(
					options.view
				)
			)
		}
	}
)