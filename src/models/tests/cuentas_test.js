import QUnit from 'steal-qunit';
import Cuentas from '../cuentas';

QUnit.module('models/cuentas');

QUnit.test('getList', function(){
  stop();
  Cuentas.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
