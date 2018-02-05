// function Base() {
// 	this.events = {};
// }
// Base.extend = function (A, B) {
// 	var Super = this;  //this指向Base
// 	var Sub = function(){
// 		Super.apply(this);
// 	}; 
// 	Sub.prototype = asign(new Super, A, {constructor: Sub});
// 	return asign(Sub, Super, B);
// }

// function asign(){
// 	var arr = Array.prototype.slice.call(arguments,0),
// 		target = arr.shift();
// 	arr.forEach(item => {
// 		for(var key in item){
// 			target[key]=item[key];
// 		}
// 	})
	
// 	return target;
// }

// Base.prototype.on = function(type,fn){
// 	this.events[type] = fn.bind(this);
// }

// Base.prototype.trigger = function(type,val){
// 	this.events[type](val);
// }
// module.exports = Base
var slice = [].slice

function merge(target) {
    // 非常常见的技巧
    var srcs = slice.call(arguments, 1)
    srcs.forEach(function (src) {
        for (var key in src) {
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
            if (src.hasOwnProperty(key)) {
                target[key] = src[key]
            }
        }
    })
    // 现在有可能这么遍历Object的key
    // Object.keys(object).forEach((key) => {
    //     // TODO
    // })
}

function Base() {
    this.events = {}
}
Base.extend = function (proto, static) {
    var Super = this
    function Cur() {
        Super.call(this)        //继承超类的属性方法
    }

    var Pile = function () {}
    Pile.prototype = this.prototype
    Cur.prototype = new Pile()  //继承超类的原型方法

    merge(Cur.prototype, proto) //将原型方法加入Cur的原型
    merge(Cur, Super, static) //将静态方法加入Cur；同时将this对象加入Cur,可以实现多次继承
    return Cur
}
merge(Base.prototype, {
    on: function (event, fn) {
        (this.events[event] = this.events[event] || [])
            .push(fn)
    },
    trigger: function (event) {
        var args = slice.call(arguments, 1)
        ;(this.events[event] || [])
            .forEach((fn) => {
                fn.apply(this, args)
            })
    }
})

module.exports = Base