import	'can/control'
import	'can/construct/super'
import	thumbnailsView from 'views/stock/thumbnails.mustache!'

can.Control(
	'Aleph.Stock.Thumnails'
,	{
		defaults:
		{
			view:	thumbnailsView
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