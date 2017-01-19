import Component from 'can-component';
import Map from 'can-define/map/map';
import './registros_forma_de_pago.less!';
import template from './registros_forma_de_pago.stache!';

export const ViewModel = Map.extend(
	{
		message:
		{
	    	value: 'This is the aleph-ventas-registros-forma-de-pagos component'
	    }
	}
);

export default Component.extend(
	{
		tag: 'aleph-ventas-registros-forma-de-pago'
	,	viewModel: ViewModel
	,	view: template
	}
);