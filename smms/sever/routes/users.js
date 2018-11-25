var express = require('express');
var router = express.Router();

//引入数据库连接模块
const connection =require('./connect')

//接收前端添加账号页面的请求:/users/tianjiazh
router.post('/tianjiazh',(req,res)=>{
  //设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*')

//接收参数
  let {yonghuming,mima,yonghuzu} = req.body;

  //把这些数据存入数据库
  const sqlStr = `insert into users(yonghuming,mima,yonghuzu) values(?,?,?)`;

  const sqlParams = [yonghuming,mima,yonghuzu]

  //执行sql语句
connection.query(sqlStr,sqlParams,(err,data)=>{
    if(err){
      throw err;
    }else{
      //受影响的数据大于0就是成功
      if( data.affectedRows > 0 ){
          res.send({"rstCode": 1, "msg":"添加账号成功"})
      }else{
          res.send({"rstCode": 0, "msg":"添加账号失败"})
      }
    }
})
})


//接收用户列表的请求
router.get('/yonghulb',(req,res)=>{
  // 设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');
  //降序查询数据
  const sqlStr = `select * from users order by id desc`;

  connection.query(sqlStr,(err,data)=>{
      if(err){
        throw err;
      }else{
        res.send(data)
      }
  })
})



//接收删除用户的请求
router.get('/shanchuyh',(req,res)=>{
    // 设置响应头
  res.setHeader('Access-Control-Allow-Origin', '*');

  let{ id } = req.query

  const sqlStr = `delete from users where id =${id}` 

  connection.query(sqlStr,(err,data)=>{
    if(err){
      throw err;
    }else{
      if(data.affectedRows>0){
        res.send({ "rstCode": 1, "msg":"删除成功!!!" })
      }else{
        res.send({ "rstCode": 1, "msg":"删除失败!!!" })
      }
    }
  })
})
module.exports = router;
