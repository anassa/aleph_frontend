import Component from 'can-component';
import Map from 'can-define/map/map';
import './nueva_forma_de_pago.less!';
import template from './nueva_forma_de_pago.stache!';

export const ViewModel = Map.extend(
	{
		message:
		{
			value: 'This is the aleph-ventas-nueva-forma-de-pagos component'
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-ventas-nueva-forma-de-pago'
	,	viewModel: ViewModel
	,	view: template
	}
);