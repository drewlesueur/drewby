function run(code) {
    function get_id_maker(){
        var x = 0;
        function inc(){
            return x++;
        }
        return inc;
    }
    var get_id = get_id_maker(); 
    //these are the built-in functions
    //should I have an id for each object/value??
    //i think id..
    //also the scope should reside on the heap I think
    var heap  = {
        '0' : "test",
        '1' : 13
    }    
    var global = {
        'eval' : function(exp,scope){
            if (typeof exp == "object") {
                var func = exp[0]; //func name is first one
                var args = exp.slice(1)
                var func = this.eval(func) //|| this.empty;
                // to be continued
                //todo: lazy evaluation, acually calling of the function
            } else if (typeof exp == "string") {
                return this.lookup(exp, scope)
            }
        },
        'lookup' : function(symbols,scope) {
            if (typeof symbols == "object") {  //peeple.bob.arm
                if (symbols.length == 1){
                    return this.lookup(symbols[0], scope)
                }
                return this.lookup(tail(symbols), this.lookup(head(symbols), scope)) //que?
            } else { //just one
                if (symbols in scope){
                    return scope[symbols].value; //this will change. things are stored like {value: "yo", 'type' : "string"} ??
                } else {
                    if ('parent' in scope) {
                        return this.lookup(symbols, scope.parent)
                    } else {
                        return 0;//throw error
                    }
                }
            }
        },
        'set' : function(args, scope){
            var id = get_id();
            scope[args[0]] = id;
            heap[id] = this.eval(args[1], scope)
        }
    }
    
    for (var i = 0; i < code.length; i++) {
        var exp = code[i]
        global.eval(exp, global) //explicit scope
    }
    //(a-str call deff set if lookup a o)
}
