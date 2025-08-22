import bcrypt from 'bcryptjs'

const comparePassword = (password,hash)=>{
    const res =  bcrypt.compareSync(password,hash)
    console.log(res);
    return res
}

export default comparePassword ;