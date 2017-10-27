//---->ATTEMPT 1
//function binarySearch (L, q){
// for (var i= Math.floor((L.length)/2); i !== q; i/2){
//   if (L[i] === q){
//     return i;
//   } if (L[i] > q) {
//     var x = Math.floor(L[i]/2);
//     i = L[i - x];
//   //need to return to the top and start again
//   } if (L[i] < q) {
//     var x = Math.floor(L[i]/2);
//     i = L[i + x];
//   //need to return to the top and start again
//   } else {
//     return -1;
//   }
// }
// }

// -----> ATTEMPT 2
//function binarySearch (L, q){
//   var i= Math.floor((L.length)/2);
//   while (L[i] !== q){
//     if (L[i] > q) {
//       var x = Math.floor(L[i]/2);
//       i = L[i - x];
//   //need to return to the top and start again
//     } if (L[i] < q) {
//       var x = Math.floor(L[i]/2);
//       i = L[i + x];
//   //need to return to the top and start again
//     }
//     if (L[i] === q){
//       return i;
//     } else {
//       return -1;
//     }
// }
// }

function binarySearch (L, q) {
  var min = 0;
  var max = L.length - 1;
  var i;

  while(min <= max) {
    i = Math.floor((max + min) / 2);

    if (L[i] === q) {
      return i;
    } else if (L[i] < q) {
      min = i + 1;
    } else {
      max = i - 1;
    }
  }

  return -1;
}

console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 1));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 2));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 3));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 4));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 5));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 6));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 7));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 8));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 9));
console.log(binarySearch([1,2,3,4,5,6,7,8,9,10], 10));
