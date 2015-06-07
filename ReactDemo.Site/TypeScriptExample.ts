////// Example 1
function add(left, right) {
    return left + right;
}

var result = add(1, '123');


////// Example 2
interface IAddFunc {
    (l: number, r: number): number;
}

var addFunc: IAddFunc = add;


////// Example 3
$.ajax({
});



////// Example 4
[1, 2, 3].map(x => x * x);