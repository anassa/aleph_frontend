import QUnit from 'steal-qunit';
import Alarmas from '../alarmas';

QUnit.module('models/alarmas');

QUnit.test('getList', function(){
  stop();
  Alarmas.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
