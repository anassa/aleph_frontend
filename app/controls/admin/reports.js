import	'can/control'
import	'can/construct/super'
import	reportsView from 'views/admin/reports.mustache!'

can.Control(
	'Aleph.Admin.Reports'
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