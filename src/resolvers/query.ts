import { User } from "entities/user"
import * as R from "ramda"
import * as Code from "util/code"
import { ensureUser } from "util/authentication"

export async function users(root, params, ctx) {
    console.log(typeof(ctx),"==================")
    const repository = ctx.db.getRepository(User)
    const users = await repository.find()
    console.log(users,"?????????")
    return users
    // return R.compose(R.pick(["id","username"]))(users)
}
export async function jwt(_obj, {},{ db , jwt}) {
    const user = await ensureUser(db, jwt)
    console.log(user)
    return R.compose(R.merge({ jwt: jwt }), R.pick(["id","username"]))(user)

}
export async function code(_obj, {id}, {db}) {
    let a = {
        code: Number,
        id: String
    }
    Code.storeCode(id)
    a.code = Code.getCode(id)
    a.id = id
    return a
}