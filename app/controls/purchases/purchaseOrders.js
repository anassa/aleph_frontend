import	'can/control'
import	'can/construct/super'
import	purchaseOrdersView from 'views/purchases/purchaseOrders.mustache!'

can.Control(
	'Aleph.Purchases.PurchaseOrders'
,	{
		defaults:
		{
			view:	purchaseOrdersView
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