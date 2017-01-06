/* DEBUG Issue */
import debug from 'debug';

import $ from 'can-jquery'
import Map from 'can-define/map/map';
import Route from 'can-route';
import template from './index.stache!';

Route('{page}/{section}');
Route.ready();

window.Route = Route

$('body').append(template())