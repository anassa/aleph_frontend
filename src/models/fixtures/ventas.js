import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /ventas': store.findAll,
  'GET /ventas/{id}': store.findOne,
  'POST /ventas': store.create,
  'PUT /ventas/{id}': store.update,
  'DELETE /ventas/{id}': store.destroy
});

export default store;
