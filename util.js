function is_symbol(str) {
    return "( )'\"\u000a\r\n".indexOf(str) == -1;
}
function is_space(chr) {
    return "\n\r\t\u000a ".indexOf(chr) != -1
}
function o(level, label, obj){
    return;
    $('body').append($("<div style = 'margin-left: "
        + (10 * level)+ "px; border: 1px solid navy;'>"
        +label+": " + $.toJSON(obj) + "</div>"))
}
function line(level, color) {
    return;
    $('body').append("<div style = 'border-bottom: 4px solid "+color+"; margin-top: 5px; margin-bottom: 8px; margin-left: "+(10 * level)+";'>")
}

function print_out(state, exp, val, chr, level) {
    o(level, "symbol", state); o(level, "exp", exp)
    o(level, "var", val); o(level, "chr", chr)
    line(level,'red')
}

function print(x) {
    if (typeof x == "object") { x = $.toJSON(x)} 
    $('body').append($("<div style = 'border: 1px solid navy;'>" + x + "</div>"))
}
function printc(x,c,w) {
    w = w || 1;
    if (typeof x == "object") { x = $.toJSON(x)} 
    $('body').append($("<div style = 'border: "+w+"px solid "+c+";'>" + x + "</div>"))
}

function head(arr){ //car
    return arr[0];
}

function tail(arr) { //cdr
    return arr.slice(1)
}
