import F from 'funcunit';
import QUnit from 'steal-qunit';

F.attach(QUnit);

QUnit.module('aleph-frontend functional smoke test', {
  beforeEach() {
    F.open('../development.html');
  }
});

QUnit.test('aleph-frontend main page shows up', function() {
  F('title').text('aleph-frontend', 'Title is set');
});
