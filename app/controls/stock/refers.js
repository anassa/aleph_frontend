import	'can/control'
import	'can/construct/super'
import	refersView from 'views/stock/refers.mustache!'

can.Control(
	'Aleph.Stock.Refers'
,	{
		defaults:
		{
			view:	refersView
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