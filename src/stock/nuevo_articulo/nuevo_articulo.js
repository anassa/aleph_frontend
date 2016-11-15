import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './nuevo_articulo.less!';
import template from './nuevo_articulo.stache!';

import UnidadesDeMedida from 'aleph-frontend/models/unidadesDeMedida';
import Articulos from 'aleph-frontend/models/articulos';

export const ViewModel = Map.extend({
	define:
	{
		unidadesDeMedida:
		{
			value: function()
			{
				return UnidadesDeMedida.getList()
			}
		}
	,	articulo:
		{
			value:	Articulos
		,	type:	Articulos
		}
	}
,	saveArticulo: function()
	{
		console.log(this.attr('articulo'))
	}
});

export default Component.extend({
	tag: 'aleph-stock-nuevo-articulo',
	viewModel: ViewModel,
	template
});