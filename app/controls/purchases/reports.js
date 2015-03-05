import	'can/control'
import	'can/construct/super'
import	reportsView from 'views/purchases/reports.mustache!'

can.Control(
	'Aleph.Purchases.Reports'
,	{
		defaults:
		{
			view:	reportsView
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