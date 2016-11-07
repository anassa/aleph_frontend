import QUnit from 'steal-qunit';
import Remitos from '../remitos';

QUnit.module('models/remitos');

QUnit.test('getList', function(){
  stop();
  Remitos.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
