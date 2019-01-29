// 函数柯里化简单实现，参数只能从右到左传递
function createCurry(func, args) {

  var arity = func.length;
  var args = args || [];

  return function() {
      var _args = [].slice.call(arguments);
      [].push.apply(_args, args);

      // 如果参数个数小于最初的func.length，则递归调用，继续收集参数
      if (_args.length < arity) {
          return createCurry.call(this, func, _args);
      }

      // 参数收集完毕，则执行func
      return func.apply(this, _args);
  }
}

// 柯里化通用式
var currying = function(fn) {
  var args = [].slice.call(arguments, 1);

  return function() {
      // 主要还是收集所有需要的参数到一个数组中，便于统一计算
      var _args = args.concat([].slice.call(arguments));
      return fn.apply(null, _args);
  }
}


/* 实现一个add方法，使计算结果能够满足如下预期：
  add(1)(2)(3) = 6
  add(1, 2, 3)(4) = 10
  add(1)(2)(3)(4)(5) = 15
  */
 function add() {
   var _args = [].slice.call(arguments);

   var adder = function () {
     var _adder = function () {
       [].push.apply(_args, [].slice.call(arguments));
       return _adder;
     }

     _adder.toString = function () {
       return _args.reduce(function (a, b) {
         return a + b;
       })
     }

     return _adder
   }
   return adder.apply(null, _args)
 }

 add(1, 2, 3, 4, 5);
 add(1, 2)(3, 4)(5);

 // 使用场景1：减少重复传递不变的部分参数

 // 这个函数是将三个参数生成一个完整的url
 function simpleURL(protocol, domain, path) {
  return protocol + "://" + domain + "/" + path;
}

/**
 * 利用柯里化进行封装处理
 * @params fn {function}
 */

  var _curryURL = currying(simpleURL, 'https', 'ben');

  console.log(_curryURL('res1'));
