import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /tarjetas': store.findAll,
  'GET /tarjetas/{id}': store.findOne,
  'POST /tarjetas': store.create,
  'PUT /tarjetas/{id}': store.update,
  'DELETE /tarjetas/{id}': store.destroy
});

export default store;
