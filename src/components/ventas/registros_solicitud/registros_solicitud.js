import Component from 'can-component';
import Map from 'can-define/map/map';
import './registros_solicitud.less!';
import template from './registros_solicitud.stache!';

export const ViewModel = Map.extend(
	{
		message:
		{
			value: 'Registros Solicitud'
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-ventas-registros-solicitud'
	,	viewModel: ViewModel
	,	view: template
	}
);