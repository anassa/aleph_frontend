import	'can/control'
import	'can/construct/super'
import	thumbnailsView from 'views/sales/thumbnails.mustache!'

can.Control(
	'Aleph.Sales.Thumnails'
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