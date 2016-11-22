/*var Nightmare = require('nightmare');
var nightmare = Nightmare({ show: true });

nightmare
  .goto('http://www.baidu.com')
  .type('#kw', 'github')
  .click('#su')
  .wait(5000)
  .evaluate(function () {
    return document.querySelector('#content_left div[srcid="1599"] h3 a').href
  })
  .end()
  .then(function (result) {
    console.log(result)
  })
  .catch(function (error) {
    console.error('Search failed:', error);
  });
*/
/*  nightmare.goto('http://www.baidu.com')
    .wait(5000)
    .evaluate(function(){
      return document.title;
    })
    .end()
    .then(function(title){
      console.log(title);
    })*/

   
var Nightmare = require('nightmare');
var nightmare = Nightmare({show:true})

//define a function to be used
var baiduTopResult = function(search) {
  //return a closure that takes the nightmare instance as the only argument
  return function(nightmare) {
    //using the given nightmare instance,
      nightmare
    .goto('http://www.baidu.com')
    .type('#kw', search)
    .click('#su')
    .evaluate(function () {
      var element=document.querySelector('#content_left div[id="1"] h3 a');
      return {        
          href: element.href,
          text: element.innerText
        };
    });
  };
};

nightmare
  //use the `yahooTopResult` function to add actions to search for "github nightmare"
  .use(baiduTopResult('前端开发'))
  //print the result
  .then(function(result) {
    console.log(result)
  })
  //use the `yahooTopResult` function again to search for "electron"
  .then(() => nightmare.use(baiduTopResult('前端')))//有问题，待解决
  //print the result and end
  .then(function(result){
    console.log(result);
    return nightmare.end();
  })
  .then(() => console.log('done'))
  .catch(function(error) {
    console.error('Search failed:', error);
  });
