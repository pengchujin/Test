import { User } from "../entities/user"
import * as bcrypt from "bcrypt"
import * as Jwt from "jsonwebtoken"
import * as config from "../../config"
import * as Code from "../util/code"
import { validationError } from "../util/errors"
// import * as R from "ramda"
export async function signup(_obj, { username, password, code},{db}) {
    let Message = {
        TF: false,
        Message: "something wrong"
    }
    if(code == Code.getCode(username)) {
        const repository = db.getRepository(User);
        const hash = bcrypt.hashSync(password, config.SALT_ROUNDS);
        let b = {
            encryptedPassword: hash,
            username: username
        }
        await repository.save(b);
        const userSaved = await repository.findOne({username: username})
        let TF = bcrypt.compareSync(password,userSaved.encryptedPassword)
        Message.TF = TF
        Message.Message = "OK"
    } else {
        Message.Message = "Wrong Code"
    }
   
    return Message
}

function authenticate(user, password) {
    if(!user) {
        return false
    } else {
       return bcrypt.compareSync(password,user.encryptedPassword)
    }
}

export async function signin(_obj, { username, password},{db}) {
    let a = { jwt: String, id: Number, username: String }
    const repository = db.getRepository(User);
    const userSaved = await repository.findOne({username: username})
    let TF = authenticate(userSaved, password)
    if(TF) {
        let userToken = {
            username: username,
            id: userSaved.id
        }
        const jwt = Jwt.sign(userToken,config.JWT_SECRET,{expiresIn: '1h'})
        a.jwt =jwt
        a.username = username
        a.id = userSaved.id
    } else {
        throw validationError({
            LoginError: ["用户名,或者密码错误"]
          });
    }
    return a
}




export async function cPassword(_obj, {username, oPassword, nPassword}, {db}) {
    let Result = false;
     let  Message = '修改失败'
    const repository = db.getRepository(User);
    const userModel = await repository.findOne({username: username});
    console.log(userModel)
    console.log(oPassword,nPassword)
    const TF = bcrypt.compareSync(oPassword, userModel.encryptedPassword)
    console.log(userModel.encryptedPassword)
    console.log('===================TF: ',TF)
    if(TF) {
        Message = '修改成功'
        Result = true
        const hash = bcrypt.hashSync(nPassword, config.SALT_ROUNDS);
        await repository.update({username: username}, {encryptedPassword: hash})
    }
    const Res = {
        TF: Result,
        Message: Message
    }
    return Res;
}

export async function dUser(_obj, {username}, {db}){
    let Result = false;
    let  Message = '修改失败'
    const repository = db.getRepository(User);
    const model = await repository.findOne({username: username})

    console.log(model)
    if(model!) {
        Result = true;
        Message = '删除成功';
        await repository.remove(model)
    } 
    const Res = {
        TF: Result,
        Message: Message
    }
    return Res
}