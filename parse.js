function parse(str){
    var arr = str.split('')
    var i = 0
    var original_string = str
    return parse2({state: "symbol", exp: [], val: [], chr: arr[i], level: 0})
    //here we have a function inside a function.
    //this is so the inner function gets i as part of the scope
    //do implement this in other languages
    //you could pass i as a pointer, (or wrap it in an array like in python or javascript)
    //or you could use a class      
    function parse2(scope) {
        print_out(scope.state, scope.exp, scope.val, scope.chr, scope.level)
        if (scope.state == "symbol") {
            if (is_symbol(scope.chr)) {
                scope.val.push(scope.chr)
            } else if (is_space(scope.chr)) {  //shaping youth
                if (scope.val.length > 0) {
                    scope.exp.push(scope.val.join(''))
                    scope.val = []
                }
            } else if (scope.chr == "(") {
                if (scope.val.length > 0) {
                    var beg = scope.val.join('')
                    scope.val = []
                    i++
                    scope.exp.push(parse2({state:"symbol", exp:[beg], val:[], chr:arr[i], level: scope.level + 1}))
                } else {
                    i++
                    scope.exp.push(parse2({state:"symbol", exp:[], val:[], chr:arr[i], level: scope.level + 1}))
                }
            } else if (scope.chr == ")") {
                if (scope.val.length > 0) {
                    scope.val = scope.val.join('')
                    scope.exp.push(scope.val)
                    scope.val = [];
                }
                print_out(scope.state, scope.exp, scope.val, scope.chr, scope.level)
                //return scope.exp
                scope.state = "possible close"
            } else if (scope.chr == '"') {//|| scope.chr == "'") {
                if (scope.val.length == 0) {
                    scope.state = "quote"
                    scope.quote_type = scope.chr
                } else { //we have a special quotation thing going on 
                    var search = scope.val.join('');
                    scope.val = [];
                    
                    var end = str.indexOf('"' + search, i+1);
                    if (end == -1) {
                        return "error! you didn't properly close your special quote";
                    }
                    var the_string = str.substring(i + 1,end)
                    i = end + (('"' + search).length  - 1)
                    scope.exp.push(['str', the_string])
                } 
            } else if (scope.chr == "'") {
                scope.single_quoted = true;
            }
        } else if (scope.state == "possible close") {
            //return scope.exp
            //closes if the this char is not a (
            if (scope.chr == "(") {
                i++
                scope.exp = (parse2({state:"symbol", exp:[scope.exp], val:[], chr:arr[i], level: scope.level + 1}))   
                scope.state = "symbol"            
            } else if (is_symbol(scope.chr)) {                
                scope.val.push(scope.chr);
                scope.exp = [scope.exp]
                scope.state = 'symbol' //hope this works
            } else if (scope.chr == '"') {
                scope.state = "quote"
                scope.quote_type = scope.chr
            } else {
                if (scope.single_quoted && scope.single_quoted == true) {
                    scope.single_quoted = false;
                    return ['quote', scope.exp]                
                }
                console.log('not single quoted')
                return scope.exp  //change this for text right after
            }
        } else if (scope.state == "quote") {
            if (scope.chr == scope.quote_type) {
                scope.exp.push(["str",scope.val.join('')])
                scope.val = []
                scope.state = "symbol"
            } else if (scope.chr == "\\"){
                scope.state = "quote-escape"
            } else {
                scope.val.push(scope.chr)
            }
        } else if (scope.state == "quote-escape") {
            if (scope.chr == scope.quote_type) {
                scope.val.push(scope.chr);
            } else if (scope.chr == '\\') {
                scope.val.push("\\")
            } else {
                scope.val.push("\\")
                scope.val.push(scope.chr)
            }
            scope.state = "quote"
        }
        i++
        if (i >= arr.length) {
             if (scope.val.length > 0) {
                scope.val = scope.val.join('')
                scope.exp.push(scope.val)
                scope.val = [];
            }
            print_out(scope.state, scope.exp, scope.val, scope.chr, scope.level)
            line(scope.level, 'green')
            return scope.exp
        }
        scope.chr = arr[i]
        return parse2(scope) //this could be implemented iteratively easily.
    }
}
