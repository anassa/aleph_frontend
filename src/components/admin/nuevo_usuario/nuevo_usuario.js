import Component from 'can-component';
import Map from 'can-define/map/map';
import './nuevo_usuario.less!';
import template from './nuevo_usuario.stache!';

export const ViewModel = Map.extend(
	{
		message:
		{
			value: 'This is the aleph-admin-nuevo-usuario component'
		}
	}
);

export default Component.extend(
	{
		tag: 'aleph-admin-nuevo-usuario'
	,	viewModel: ViewModel
	,	view: template
	}
);