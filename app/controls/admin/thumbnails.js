import	'can/control'
import	'can/construct/super'
import	thumbnailsView from 'views/admin/thumbnails.mustache!'

can.Control(
	'Aleph.Admin.Thumnails'
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