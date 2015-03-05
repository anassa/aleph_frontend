import	'can/control'
import	'can/construct/super'
import	reportsView from 'views/sales/reports.mustache!'

can.Control(
	'Aleph.Sales.Reports'
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