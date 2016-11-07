import QUnit from 'steal-qunit';
import Ventas from '../ventas';

QUnit.module('models/ventas');

QUnit.test('getList', function(){
  stop();
  Ventas.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
