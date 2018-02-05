class Base {

	constructor(){
		this.events = {}
	}

	on(type, callback){
		(this.events[type] = this.events[type]||[])
		.push(callback);
	}

	trigger(type, ...args){
		(this.events[type]||[]).forEach(fn=>{
			fn.apply(this, args)  	//call需要...apply不用
		})
	}

}

module.exports = Base