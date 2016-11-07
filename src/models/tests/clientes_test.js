import QUnit from 'steal-qunit';
import Clientes from '../clientes';

QUnit.module('models/clientes');

QUnit.test('getList', function(){
  stop();
  Clientes.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
