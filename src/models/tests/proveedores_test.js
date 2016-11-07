import QUnit from 'steal-qunit';
import Proveedores from '../proveedores';

QUnit.module('models/proveedores');

QUnit.test('getList', function(){
  stop();
  Proveedores.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
