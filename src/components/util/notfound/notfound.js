import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './notfound.less!';
import template from './notfound.stache!';

export const ViewModel = Map.extend(
	{
		define:
		{
			message:
			{
				value: 'This is the aleph-not-found component'
			}
		}
	}
);

export default Component.extend({
  tag: 'aleph-not-found',
  viewModel: ViewModel,
  view: template
});