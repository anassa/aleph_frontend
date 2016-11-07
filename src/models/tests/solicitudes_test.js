import QUnit from 'steal-qunit';
import Solicitudes from '../solicitudes';

QUnit.module('models/solicitudes');

QUnit.test('getList', function(){
  stop();
  Solicitudes.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
