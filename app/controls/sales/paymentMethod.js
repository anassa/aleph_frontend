import	'can/control'
import	'can/construct/super'
import	paymentMethodView from 'views/sales/paymentMethods.mustache!'

can.Control(
	'Aleph.Sales.PaymentMethods'
,	{
		defaults:
		{
			view:	paymentMethodView
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