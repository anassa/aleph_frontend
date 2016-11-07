import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /ordenesDeCompra': store.findAll,
  'GET /ordenesDeCompra/{id}': store.findOne,
  'POST /ordenesDeCompra': store.create,
  'PUT /ordenesDeCompra/{id}': store.update,
  'DELETE /ordenesDeCompra/{id}': store.destroy
});

export default store;
