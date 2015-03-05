import	'can/control'
import	'can/construct/super'
import	suppliersView from 'views/purchases/suppliers.mustache!'

can.Control(
	'Aleph.Purchases.Suppliers'
,	{
		defaults:
		{
			view:	suppliersView
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