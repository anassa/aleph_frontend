import Component from 'can-component';
import Map from 'can-define/map/map';
import Route from 'can-route';
import 'can-map-define';
import 'can-stache/helpers/route';
import template from './main.stache!';

export const ViewModel = Map.extend(
	{
		section:
		{
			get: function()
			{
				return Route.data.section
			}
		}
	}
);
export default Component.extend({
	tag: 'aleph-admin-main',
	viewModel: ViewModel,
	view: template
});