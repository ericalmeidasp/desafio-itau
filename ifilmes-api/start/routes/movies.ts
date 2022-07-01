import Route from '@ioc:Adonis/Core/Route'

/*
 * Rota Movies
 *
 */

// Lista filmes relacionados em nossa DB, utilizando os middlewares ACL e Auth
Route.get('/movies', 'Movie/MoviesMain.index').middleware([
  'acl:leitor,basico,avancado,moderador',
  'auth',
])

// Salva e lista os filmes realicionados, utilizando os middlewares ACL e Auth
Route.post('/movies', 'Movie/MoviesMain.store').middleware([
  'acl:leitor,basico,avancado,moderador',
  'auth',
])

// exibe as informações de um filme utilizando os middlewares ACL e Auth
Route.get('/movies/:id', 'Movie/MoviesMain.show').middleware([
  'acl:leitor,basico,avancado,moderador',
  'auth',
])
