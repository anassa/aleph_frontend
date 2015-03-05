import	'can/control'
import	'can/construct/super'
import	tagsView from 'views/purchases/tags.mustache!'

can.Control(
	'Aleph.Purchases.Tags'
,	{
		defaults:
		{
			view:	tagsView
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