module.exports=app=>{

    const landing=require('../controller/landing.controller')
  
    // API FOR signUp
    app.post("/signUp",landing.signUp)

    // API FOR LOGIN
    app.post("/login",landing.login)
    

}