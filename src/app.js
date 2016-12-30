import $ from 'can-jquery'
import Map from 'can-map';
import Route from 'can-route';
import 'can-map-define';
import template from './index.stache!';

Route('{page}/{section}');
Route.ready();

$('body').append(template())