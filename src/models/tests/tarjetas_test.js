import QUnit from 'steal-qunit';
import Tarjetas from '../tarjetas';

QUnit.module('models/tarjetas');

QUnit.test('getList', function(){
  stop();
  Tarjetas.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
