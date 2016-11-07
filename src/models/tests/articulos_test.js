import QUnit from 'steal-qunit';
import Articulos from '../articulos';

QUnit.module('models/articulos');

QUnit.test('getList', function(){
  stop();
  Articulos.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
