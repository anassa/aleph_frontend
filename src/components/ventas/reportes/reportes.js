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
			value: 'This is the aleph-ventas-reportes component'
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
	tag: 'aleph-ventas-reportes',
	viewModel: ViewModel,
	events:
	{
		'inserted': function(el, ev)
		{
			$('.date input').datepicker({language: 'es'});

			toggle_report();

			new Chart(
				$("#bar-chart")
			,	{
					type: 'bar'
				,	data:
					{
						labels: 	["3 hilo sisal", "tela roja", "entre tela", "hilo verde", "botones", "tela raso", "hilo cadena grande"],
						datasets:
						[
							{
								label: "Articulos mas vendidos"
							,	backgroundColor:
								[
									'rgba(255, 99, 132, 0.2)'
								,	'rgba(54, 162, 235, 0.2)'
								,	'rgba(255, 206, 86, 0.2)'
								,	'rgba(75, 192, 192, 0.2)'
								,	'rgba(153, 102, 255, 0.2)'
								,	'rgba(255, 159, 64, 0.2)'
								]
							,	borderColor:
								[
									'rgba(255,99,132,1)'
								,	'rgba(54, 162, 235, 1)'
								,	'rgba(255, 206, 86, 1)'
								,	'rgba(75, 192, 192, 1)'
								,	'rgba(153, 102, 255, 1)'
								,	'rgba(255, 159, 64, 1)'
								]
							,	borderWidth: 1
							,	data: [549, 254, 223, 100, 99, 89, 23]
							}
						]
					}
				}
			);
		}
	,	'select[name=type] change': function()
		{
			toggle_report();
		}
	},
	view: template
});