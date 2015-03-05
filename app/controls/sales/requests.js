import	'can/control'
import	'can/construct/super'
import	requestsView from 'views/sales/requests.mustache!'

can.Control(
	'Aleph.Sales.Requests'
,	{
		defaults:
		{
			view:	requestsView
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