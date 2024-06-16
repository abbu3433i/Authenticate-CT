let express = require('express')

let mongoose = require('mongoose');

let userModel = require("./model/model")

let jwt = require('jsonwebtoken')

let cors = require('cors')


mongoose.connect('mongodb://127.0.0.1:27017/authenticate').then(()=>{
  console.log("chal gya");
}).catch(()=>{
  console.log('kuch to shi nhi he');
})

let app = express();

app.use(cors())//--------frontend and backend dono ek sath chlta he to restriction lagta he ise rokne ke liye cors ka use karte hen

app.use(express.json()) //----it helps to provide data in original format

let bcrypt = require('bcrypt')  //----------password ko strong karne ka kaam aata he

app.get('/',(req,res)=>{
  res.send("start")
})


app.post('/signup',async(req,res)=>{
    console.log(req.body);
    let userData = req.body

    //New data ki email database me already exit kar rhi ya nhi usa check karega
    let {email} = req.body 
    let user = await userModel.findOne({email})

    if (user) { //-----------------------------agar exits kar rhi he to ye msg send kar do
      res.send('user already exits')
    }
    else{
      //++++++agar exits nhi kar rhi he to pass bcrypt karke newdata ko database me store kar do

      //it will bcrypt the password so that other can not identify it 
      userData.password = await bcrypt.hash(userData.password,10)
      console.log(userData.password);

      let dbUser = new userModel({
        firstName : userData.firstName,
        lastName : userData.lastName,       //---jo bhi data "/signup" se aa rha he bo user schema ki madad se database me store kara do
        email : userData.email,
        password : userData.password
      })

      await dbUser.save()  //----------it is must to save
      res.send('data save in database')
    }
})

app.post('/login', async(req,res)=>{
  console.log(req.body);
  let userInfo = req.body
  //agar usermodel me mtlb database me find kro ki login me jo email daal rhe hen bo email he ya nhi
  let loginData = await userModel.findOne({email:userInfo.email})

  //agar email find nhi hoti he to msg send kro
  if (!loginData) {
    res.send('user nhi mila')
  }
  else{
    //agr email find hoti he to new password ko compare kro us findemail bale user ke password se jo ki loginData me store hoga
  // res.send('koi mil gya')
  let validPass = await bcrypt.compare(userInfo.password,loginData.password)

  //Then password agar password valid nhi he to msg send kro agar he to else part chalao
  if (!validPass) {
    res.send('invalid pass')
  }
  else{ 
    let data = JSON.stringify(loginData)  //---Converting JavaScript objects into strings
    let token = jwt.sign(data,'HKHDSKHFJKHK')
    console.log(data,'tokennjnnm');
    res.send({token,loginData})
  }

  }
})




app.listen(3000,()=>{
  console.log('chal fya');
})