// import {useEffect, useState, useRef} from 'react';
// import axios from "axios";
//
// const Charts = () => {
//     const [comps, setComp] = useState([])
//
//
//     const failRate = () => {
//         console.log(comps)
//         axios.get('http://127.0.0.1:5000/components')
//             .then(res => {
//                 const respComponents = res.data.resp.response
//                 const statusFlag = res.data.resp.msg
//                 if (statusFlag === "done") {
//                     const data = respComponents.map((currentData, index) => {
//                         return {
//                             componentId: currentData[0],
//                             componentName: currentData[1],
//                             componentContact: currentData[2],
//                             componentManufacturer: currentData[3],
//                             componentFailureRate: currentData[4],
//                             componentPrice: currentData[5],
//                             componentQuantity: currentData[6]
//                         }
//                     })
//                     console.log(data)
//                     setComp(data)
//                 } else {
//                     alert("failed")
//                 }
//
//             })
//
//     }, [])
//
//
//     const worstComponents = (e) =>{
//
//     }
//
//     return (
//         <h2>Charts</h2>
//     )
//
// }
//
// function swap(items, leftIndex, rightIndex){
//     var temp = items[leftIndex];
//     items[leftIndex] = items[rightIndex];
//     items[rightIndex] = temp;
// }
// function partition(items, left, right) {
//     var pivot   = items[Math.floor((right + left) / 2)], //middle element
//         i       = left, //left pointer
//         j       = right; //right pointer
//
//     while (i <= j) {
//         while (items[i] < pivot) {
//             i++;
//         }
//         while (items[j] > pivot) {
//             j--;
//         }
//         if (i <= j) {
//             swap(items, i, j); //sawpping two elements
//             i++;
//             j--;
//         }
//     }
//     return i;
// }
//
// function quickSort(items, left, right) {
//     var index;
//     if (items.length > 1) {
//         index = partition(items, left, right); //index returned from partition
//         if (left < index - 1) { //more elements on the left side of the pivot
//             quickSort(items, left, index - 1);
//         }
//         if (index < right) { //more elements on the right side of the pivot
//             quickSort(items, index, right);
//         }
//     }
//     return items;
// }
//
//
// export default Charts