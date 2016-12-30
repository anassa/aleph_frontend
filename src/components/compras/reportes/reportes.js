import Component from 'can-component';
import Map from 'can-map';
import 'can-map-define';
import './reportes.less!';
import template from './reportes.stache!';
import 'bootstrap-datepicker/js/bootstrap-datepicker.js'
import 'bootstrap-datepicker/js/locales/bootstrap-datepicker.es.js'
import 'bootstrap-datepicker/build/build3.less!';
import 'chart.js/dist/Chart.js'

export const ViewModel = Map.extend({
	define: {
		message: {
			value: 'This is the aleph-compras-reportes component'
		}
	}
});

function toggle_report()
{
	var opt = $('select[name=type] :selected').val();

	$('.report:visible').hide();

	$('#option-'+opt).show();
}

export default Component.extend({
	tag: 'aleph-compras-reportes',
	viewModel: ViewModel,
	events:
	{
		'inserted': function(el, ev)
		{
			$('.date input').datepicker({language: 'es'});

			toggle_report();
		}
	,	'select[name=type] change': function()
		{
			toggle_report();
		}
	},
	view: template
});