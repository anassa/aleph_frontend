import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /formasDePago': store.findAll,
  'GET /formasDePago/{id}': store.findOne,
  'POST /formasDePago': store.create,
  'PUT /formasDePago/{id}': store.update,
  'DELETE /formasDePago/{id}': store.destroy
});

export default store;
