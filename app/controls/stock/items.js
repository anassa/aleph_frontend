import	'can/control'
import	'can/construct/super'
import	itemsView from 'views/stock/items.mustache!'

can.Control(
	'Aleph.Stock.Items'
,	{
		defaults:
		{
			view:	itemsView
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