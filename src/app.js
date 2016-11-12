import Map from "can/map/";
import route from "can/route/";
import 'can/map/define/';
import 'can/route/pushstate/';

const AppViewModel = Map.extend({
	define: {
		title:
		{
			value:		'Aleph'
		,	serialize:	false
		}
	}
});

route(':page', { page: undefined });

export default AppViewModel;
