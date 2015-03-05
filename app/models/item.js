import	'models/aleph'
import	accounting from 'accounting'

Aleph.Model(
	'Aleph.Model.Item'
,	{
		path: 'item'
	}
,	{
		getMarketPrice: function()
		{
			return	accounting.formatMoney(this.attr('marketPrice'), '$', 2, '.', ',')
		}
	,	getStatus: function()
		{
			return	this.attr('stock') <= 2
					?	'danger'
					:	this.attr('stock') <= 5
						?	'warning'
						:	''
		}
	}
)