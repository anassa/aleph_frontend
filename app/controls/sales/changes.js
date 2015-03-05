import	'can/control'
import	'can/construct/super'
import	changesView from 'views/sales/changes.mustache!'

can.Control(
	'Aleph.Sales.Changes'
,	{
		defaults:
		{
			view:	changesView
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