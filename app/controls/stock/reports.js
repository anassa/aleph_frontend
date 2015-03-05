import	'can/control'
import	'can/construct/super'
import	reportsView from 'views/stock/reports.mustache!'

can.Control(
	'Aleph.Stock.Reports'
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