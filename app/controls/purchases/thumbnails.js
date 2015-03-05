import	'can/control'
import	'can/construct/super'
import	thumbnailsView from 'views/purchases/thumbnails.mustache!'

can.Control(
	'Aleph.Purchases.Thumnails'
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