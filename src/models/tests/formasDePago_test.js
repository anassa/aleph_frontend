import QUnit from 'steal-qunit';
import FormasDePago from '../formasDePago';

QUnit.module('models/formasDePago');

QUnit.test('getList', function(){
  stop();
  FormasDePago.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
