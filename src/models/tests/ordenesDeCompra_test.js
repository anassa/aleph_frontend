import QUnit from 'steal-qunit';
import OrdenesDeCompra from '../ordenesDeCompra';

QUnit.module('models/ordenesDeCompra');

QUnit.test('getList', function(){
  stop();
  OrdenesDeCompra.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
