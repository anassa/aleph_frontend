import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_articulo.less!';
import template from './nuevo_articulo.stache!';

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the aleph-stock-nuevo-articulo component'
		}
	}
});

export default Component.extend({
	tag: 'aleph-stock-nuevo-articulo',
	viewModel: ViewModel,
	template
});