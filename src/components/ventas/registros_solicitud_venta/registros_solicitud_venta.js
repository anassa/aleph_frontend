import Component from 'can-component';
import Map from 'can-define/map/map';
import './registros_solicitud_venta.less!';
import template from './registros_solicitud_venta.stache!';

export const ViewModel = Map.extend(
	{
		message:
		{
			value: 'Registro solicitud venta (registro venta en curso)'
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-ventas-registros-solicitud-venta'
	,	viewModel: ViewModel
	,	view: template
	}
);