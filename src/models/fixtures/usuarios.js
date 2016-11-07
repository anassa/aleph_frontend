import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /usuarios': store.findAll,
  'GET /usuarios/{id}': store.findOne,
  'POST /usuarios': store.create,
  'PUT /usuarios/{id}': store.update,
  'DELETE /usuarios/{id}': store.destroy
});

export default store;
