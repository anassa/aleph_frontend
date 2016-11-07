import QUnit from 'steal-qunit';
import Usuarios from '../usuarios';

QUnit.module('models/usuarios');

QUnit.test('getList', function(){
  stop();
  Usuarios.getList().then(function(items) {
    QUnit.equal(items.length, 2);
    QUnit.equal(items.attr('0.description'), 'First item');
    start();
  });
});
