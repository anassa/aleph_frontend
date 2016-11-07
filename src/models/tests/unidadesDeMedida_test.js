import QUnit from 'steal-qunit';
import UnidadesDeMedida from '../unidadesDeMedida';

QUnit.module('models/unidadesDeMedida');

QUnit.test('getList', function(){
  stop();
  UnidadesDeMedida.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
