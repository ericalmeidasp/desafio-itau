import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { StoreValidator } from 'App/Validators/Auth'
import Cache from '@ioc:Adonis/Addons/Cache'

export default class AuthController {
  public async store({ request, response, auth }: HttpContextContract) {
    // valida os campos enviados na request
    const { email, password } = await request.validate(StoreValidator)

    //seleciona a chave (email) no cache e verica se já houve 3 tentativa ou mais de login, caso sim retorna o erro.
    const loginErrorAttempts = await Cache.get<number>(email)
    if (loginErrorAttempts && loginErrorAttempts >= 3) {
      return response.badRequest({
        responseText: 'limite de tentativas excedido',
      })
    }

    //tenta realizar o login utilizando email e password, e caso de erro adiciona uma nova tentativa no cache e retorna o erro.
    const token = await auth
      .attempt(email, password, {
        expiresIn: '30 days',
      })
      .catch(async (error) => {
        await Cache.put(email, (loginErrorAttempts || 0) + 1, 30)
        response.badRequest(error)
      })

    // caso de tudo certo, retorna o token
    return token
  }

  public async show({ auth }: HttpContextContract) {
    return auth.user
  }

  public async destroy({ auth }: HttpContextContract) {
    await auth.logout()
  }
}
