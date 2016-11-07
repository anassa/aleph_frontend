import QUnit from 'steal-qunit';
import Permisos from '../permisos';

QUnit.module('models/permisos');

QUnit.test('getList', function(){
  stop();
  Permisos.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
