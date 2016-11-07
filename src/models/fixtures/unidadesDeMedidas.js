import fixture from 'can-fixture';

const store = fixture.store([{
  id: 0,
  description: 'First item'
}, {
  id: 1,
  description: 'Second item'
}]);

fixture({
  'GET /unidadesDeMedida': store.findAll,
  'GET /unidadesDeMedida/{id}': store.findOne,
  'POST /unidadesDeMedida': store.create,
  'PUT /unidadesDeMedida/{id}': store.update,
  'DELETE /unidadesDeMedida/{id}': store.destroy
});

export default store;
