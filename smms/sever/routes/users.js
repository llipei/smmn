var express = require('express');
var router = express.Router();

//引入数据库连接模块
const connection = require('./connect')
// 设置多个响应头
router.all('*', (req,res,next) => {
// 先设置响应头
res.setHeader('Access-Control-Allow-Origin','http://127.0.0.1:8080')
// 设置允许设置cookie
res.setHeader('Access-Control-Allow-Credentials', true);
// // 给其他路由放行
next();
});

//接收前端添加账号页面的请求:/users/tianjiazh
router.post('/tianjiazh', (req, res) => {
  //接收参数
  let { yonghuming, mima, yonghuzu } = req.body;

  //把这些数据存入数据库
  const sqlStr = `insert into users(yonghuming,mima,yonghuzu) values(?,?,?)`;

  const sqlParams = [yonghuming, mima, yonghuzu]

  //执行sql语句
  connection.query(sqlStr, sqlParams, (err, data) => {
    if (err) {
      throw err;
    } else {
      //受影响的数据大于0就是成功
      if (data.affectedRows > 0) {
        res.send({ "rstCode": 1, "msg": "添加账号成功" })
      } else {
        res.send({ "rstCode": 0, "msg": "添加账号失败" })
      }
    }
  })
})


//接收用户列表的请求
router.get('/yonghulb', (req, res) => {
  // 设置响应头
  // res.setHeader('Access-Control-Allow-Origin', '*');
  //降序查询数据
  const sqlStr = `select * from users order by id desc`;

  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data)
    }
  })
})



//接收删除用户的请求
router.get('/shanchuyh', (req, res) => {
  // 设置响应头
  // res.setHeader('Access-Control-Allow-Origin', '*');

  let { id } = req.query

  const sqlStr = `delete from users where id =${id}`

  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.affectedRows > 0) {
        res.send({ "rstCode": 1, "msg": "删除成功!!!" })
      } else {
        res.send({ "rstCode": 1, "msg": "删除失败!!!" })
      }
    }
  })
})

//接收修改用户请求
router.get('/xiugaiyh', (req, res) => {
  //设置响应头
  // res.setHeader('Access-Control-Allow-Origin', '*')
  let { id } = req.query;

  //构造sql语句
  const sqlStr = `select * from users where id=${id}`;
  //执行
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      res.send(data)
    }
  })
})

//保存修改路由
router.post('/baocunxg', (req, res) => {
  //设置响应头
  // res.setHeader('Access-Control-Allow-Origin', '*')
  let { yonghuming, mima, yonghuzu, editId } = req.body;
  //构造sql语句
  const sqlStr = `update users set yonghuming='${yonghuming}', mima='${mima}', yonghuzu='${yonghuzu}' where id=${editId}`;

  //执行语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      // 如果受影响行数 大于0 就是修改成功 返回给前端修改成功的信息
      if (data.affectedRows > 0) {
        res.send({ "rstCode": 1, "msg": "修改成功!" })
      } else {
        // 否则就是修改失败 返回给前端修改失败的信息
        res.send({ "rstCode": 0, "msg": "修改失败!" })
      }
    }
  })
})


//批量删除

router.post('/piliangsc', (req, res) => {
  let { idArr } = req.body;
  idArr = JSON.parse(idArr);
  //构造sql语句
  const sqlStr = `delete from users where id in (${idArr})`;
  //执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err;
    } else {
      // 如果受影响行数 大于 0 就是删除成功 返回删除成功的信息给前端
      if (data.affectedRows > 0) {
        res.send({ "rstCode": 1, "msg": "批量删除成功" })
      } else {
        // 否则就是失败 返回失败的信息给前端
        res.send({ "rstCode": 0, "msg": "批量删除失败" })
      }
    }
  })

})


//接收验证登录的请求
router.post('/denglu',(req,res)=>{
  let { yonghuming, mima } = req.body;
  //构造sql语句
  const sqlStr = `select * from users where yonghuming='${yonghuming}' and mima='${mima}'`;
  //执行sql语句
  connection.query(sqlStr,(err,data)=>{
    if(err){
      throw err;
    }else{
      if(data.length){
          res.cookie('yonghuid',data[0].id)
          res.cookie('yonghuming',data[0].yonghuming)
          res.send({"rstCode":1, "msg":"欢迎您! 登录成功!"})
      }else{
          res.send({"rstCode":0, "msg":"请检查用户名或密码!"})
      }
    }
  })

})
//接收判断登录状态的请求
router.get('/isdenglu',(req,res)=>{
    let yonghuid = req.cookies.yonghuid;
    let yonghuming = req.cookies.yonghuming;
//如果都存在证明用户登录过
  if(yonghuid&&yonghuming){
        res.send({'isdenglu':true})
  }else{
    res.send({'isdenglu':false})
  }
})

//接收退出请求的路由
router.get('/tuichu',(req,res)=>{
  //清除cookie
  res.clearCookie('yonghuid');
  res.clearCookie('yonghuming');
  //返回退出成功的提示信息
  res.send({"rstCode":1, "msg":"退出成功,欢迎回来"})
})

//显示当前登录账户用户名
router.get('/yonghumingdq',(req,res)=>{
  //从cookie里面取出用户名
  let yonghuming = req.cookies.yonghuming;
  //返回用户名给前端
  res.send(yonghuming)
})

//接收验证旧密码的请求
router.get('/yanzhengjmm',(req,res)=>{
    let { jiumima } = req.query;
    //获取当前用户的id
    let id = req.cookies.yonghuid;
    //构造sql语句
    const sqlStr = `select * from users where id=${id}`;
    //执行sql语句  查询出当前登录的用户数据
    connection.query(sqlStr,(err,data)=>{
      if(err){
          throw err;
      }else{
        //如果有数据
        if(data.length){
          //和当前用户的密码对比是否一致
          if( jiumima === data[0].mima){
              res.send({"rstCode":1, "msg":"旧密码正确"})
          }else{
            res.send({"rstCode":0, "msg":"旧密码不正确"})
          }
        }else{
            res.send({"rstCode":501, "msg":"请求异常"})
        }
      }
    })

})


//接收保存修改密码的请求
router.get('/xiugaimm',(req,res)=>{
  //接收新密码
  let { xinmima } = req.query;
  //获取当前登录用户的id
  let id = req.cookies.yonghuid;
  //根据id构造sql语句
  const sqlStr = `update users set mima='${xinmima}' where id=${id}`;
  //执行sql
  connection.query(sqlStr,(err,data)=>{
      if(err){
          throw err;
      }else{
        //受影响行数大于0就是成功
        if(data.affectedRows > 0){
            //成功清除cookie
            res.clearCookie('yonghuid');
            res.clearCookie('yonghuming');
            //返回修改成功的信息
            res.send({"rstCode":1, "msg":"修改密码成功！请重新登录！"})
        }else{
          //失败的信息
            res.send({"rstCode":1, "msg":"修改密码失败！"})
        }
      }
  })
})

//接收分页的请求
router.get('/fenye', (req, res) => {

  // 接收两个参数 （两个分页条件）currentPage(当前页码)  pageSize(每页多少条)
  let { currentPage, pageSize } = req.query;

  /* 设置默然参数 */
  currentPage = currentPage ? currentPage : 1;
  pageSize = pageSize ? pageSize : 3;

  let sqlStr = 'select * from users order by id desc' 
  // 执行sql语句 查询所有数据 计算出数据总条数
  connection.query(sqlStr, (err, data) => {
    if (err) {
      throw err // 如果有错 抛出错误
    } else {
      let totalCount = data.length;
      
      // 计算分页条件
      let n = (currentPage - 1) * pageSize;
      // 构造分页查询的sql语句
      sqlStr += ` limit ${n}, ${pageSize}`;
      // 执行sql语句
      connection.query(sqlStr, (err, data) => {
        if (err) {
          throw err;
        } else {
          res.send({"totalCount": totalCount, "data":data});
        }
      })
    }
  })
})


module.exports = router;
