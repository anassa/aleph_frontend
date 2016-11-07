import Component from 'can/component/';
import Map from 'can/map/';
import 'can/map/define/';
import './home.less!';
import template from './home.stache!';

export const ViewModel = Map.extend(
	{
		define:
		{
			user:
			{
				value: undefined
			,	serialize:	false
			}
		}
	}
);

export default Component.extend(
	{
		tag:		'aleph-home'
	,	viewModel:	ViewModel
	,	events:
		{
			'.btn-toggle-menu click': function(el, ev) {
				$("#wrapper").toggleClass("toggled");
				can.$(el).find('i').toggleClass('fa-bars fa-angle-double-left')
			}
		,	'.tree-toggler click': function(el, ev)
			{
				var $currentTree = can.$(el).parent().children('ul.tree');

				var $visibleTree = can.$('ul.tree:visible');

				if ($currentTree.attr('from') != $visibleTree.attr('from'))
					$visibleTree.toggle(300);

				$currentTree.toggle(300);
			}
		,	'.log-me-out click': function()
			{
				$('#modal-salir')
					.one(
						'hidden.bs.modal'
					,	function(e)
						{
							$('aleph-home').viewModel()
								.attr(
									'user'
								,	undefined
								)
							can.route.removeAttr('page');
							can.route.removeAttr('section');
						}
					)
			}
		}
	,	template
	}
);