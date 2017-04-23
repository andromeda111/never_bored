
exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return knex('categories').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    }).then(function () {
        return knex.raw(
          "SELECT setval('categories_id_seq', (SELECT MAX (id) FROM categories))"
      )
  }).catch(function (error) {
      console.error("Oops! ", error)
  })
}
