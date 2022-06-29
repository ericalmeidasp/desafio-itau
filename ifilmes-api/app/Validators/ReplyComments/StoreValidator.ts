import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    commentId: schema.number([rules.exists({table: 'comments', column: 'id'})]),
    content: schema.string({ trim: true }),
  })
  
  public messages: CustomMessages = {}
}
