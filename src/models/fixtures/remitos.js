import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /remitos': store.findAll,
  'GET /remitos/{id}': store.findOne,
  'POST /remitos': store.create,
  'PUT /remitos/{id}': store.update,
  'DELETE /remitos/{id}': store.destroy
});

export default store;
