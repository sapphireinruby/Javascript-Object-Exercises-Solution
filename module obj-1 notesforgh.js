//module obj-1 Notes

1. get Elem Less 100 At Property
//object key as array, return in array data type

var obj = {
  key: [1000, 20, 50, 500]
};
var output = getElemLess100AtProperty(obj, 'key');
console.log(output); // --> [20, 50]


function getElemLess100AtProperty(obj, key) {
  //the value is array data type, so take out the value first 
  var arr = obj[key]; //access object.key-->obj[key]
  //then we can use array methods

  var result = [];
  for (var i = 0; i < arr.length; i++ ) {
    if (arr[i]> 100) {
      result.push(arr[i]);
    }
  }
  return result;
}
 
//or in higher order function

function getElemLess100AtProperty(obj, key) {
  var arr = obj[key]; 
  return arr.filter(function(value) {
    return value > 100;
  });
}


2. get All But Last Element Of Property
//object key as array, return in array data type

var obj = {
  key: [1, 2, 3]
};

function getAllButLastElementOfProperty(obj, key) {
  if (Array.isArray(obj.key)) {
    var arr = obj[key]; 
    if (arr.length !== 0) {
      return arr.filter(function(value, idx) {
        return idx !== arr.length-1
      })
    } else {
      return [];
    }
  } else {
    return [];
  }
}

var output = getAllButLastElementOfProperty(obj, 'key');
console.log(output); // --> [1,2]



2.5. get Nth Element Of Property

function getNthElementOfProperty(obj, key, n) {
  if(Array.isArray(obj[key])){ 
    var arr = obj[key]; 
    if(n > arr.length-1){
      return undefined;
    } else {
      return arr.reduce(function(result, currentItem, idx) {
        if (idx === n) {
          result = currentItem;
        }
        return result;
      }, 0)
    }
  } else {
    return undefined;
  }
}

var obj = {
  key: [1, 2, 6]
};
var output = getNthElementOfProperty(obj, 'key', 1);
console.log(output); // --> 2


//1107

3. remove Numbers Less Than
// 回傳obj項目裡 刪除 指定條件的value後 回傳處理好的obj
// obj 回傳 obj

function removeNumbersLessThan(num, obj) {
    for(var key in obj ) {  //單處理obj 使用for in loop
    if ( typeof(obj[key]) === "number" && obj[key] < num) { //辨別指定條件
    delete obj[key]; //刪除
    } 
  }
  return obj;
}

var obj = {
  a: 8,
  b: 2,
  c: 'montana'
};
removeNumbersLessThan(5, obj); //刪除是數字並且小於5
console.log(obj);// --> { a: 8, c: 'montana' }

4. 已完成 
//回傳obj項目裡 array value裡的最小的值
// obj 包 arr, 因只要1數字 回傳1數值

function getSmallestElementAtProperty(obj, key) {
  if (Array.isArray(obj[key])) { //這裡一定要用obj[key] 因為是變數形式
    var arr = obj[key];
    if(arr.length !== 0) {
      return arr.reduce(function(smallVal, currentVal) {
        if (currentVal < smallVal) {
          smallVal = currentVal;
        }
        return smallVal;
      })
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
}

var obj = {
  key: [2, 1, 5]
};
var output = getSmallestElementAtProperty(obj, 'key');
console.log(output); // --> 1
Notes:
* If the array is empty, it should return undefined.
* If the property at the given key is not an array, it should return undefined. 
* If there is no property at the key, it should return undefined.


8. 已完成
//刪除obj裡 值是array的pair
// obj 包 arr, 回傳處理後的obj

function removeArrayValues(obj) {
  for(var key in obj ) {
    if (Array.isArray(obj[key])) { // key === 'name', key === 'age'
    delete obj[key];
    } 
  }
  return obj;
}

var obj = {
  a: [1, 3, 4],
  b: 2,
  c: ['hi', 'there']
}
removeArrayValues(obj);
console.log(obj); // --> { b: 2 }



********
////////////   above: object value as array   ///////////////
********

13.**//新增 Property to object
function addProperty(obj, key) {
  this.key = key;   //意思類似obj的key = 現在傳入的key
  obj[key] = true;
}

var myObj = {};
addProperty(myObj, 'myProperty');
console.log(myObj.myProperty); // --> true


14** //新增 array Property to object
function addArrayProperty(obj, key, arr) {
  this.key = key;
  obj[key] = arr
}

var myObj = {};
var myArray = [1, 3];
addArrayProperty(myObj, 'myProperty', myArray);
console.log(myObj.myProperty); // --> [1, 3]

15.**
//在object內新增一property, 值為 另一個object內容
function addObjectProperty(obj1, key, obj2) {
  this.key = key
  obj1[key] = obj2
}

var person1 = {
  name: 'Joe Blow',
  role: 'schlub'
};
var person2 = {
  name: 'Mr. Burns',
  role: 'supervisor'
};

//sets a new property on the 1st object at the given key. 
//The value of that new property is the entire 2nd object.

addObjectProperty(person1, 'manager', person2);
console.log(person1.manager); // --> 
//{ name: 'Mr. Burns', role: 'supervisor' }
// person1 ==>
// { name: 'Joe Blow',
//   role: 'schlub',
//   manager: { name: 'Mr. Burns', role: 'supervisor' } }


18.**
// obj內key的數量
function countNumberOfKeys(obj) {
 return Object.keys(obj).length; 
}

var obj = {
  a: 1,
  b: 2,
  c: 3
};

var output = countNumberOfKeys(obj);
console.log(output); // --> 3


5.已完成 11/09 **
//加任意項無重複的項目 from obj2 到obj1

function extend(obj1, obj2) {
    // assume obj1 & obj2 are not null or undefined
  for (var key in obj2) {
    if (!obj1.hasOwnProperty(key)) {  //or if (!(key in obj1))。抓出一項 obj2內有 但是obj1內 沒有的 key
      obj1[key] = obj2[key];  //同時定義key and value， 定義上面抓出來的key 對應的value ， 並新增到obj1
    }
  }
  return obj1;
}
var obj1 = {
  a: 1,
  b: 2
};
var obj2 = {
  b: 4,
  c: 3
};

extend(obj1, obj2);

console.log(obj1); // --> {a: 1, b: 2, c: 3}
console.log(obj2); // --> {b: 4, c: 3}

Notes:
* Add any keys that are not in the 1st object.
* If the 1st object already has a given key, ignore it (do not overwrite the property value).
* Do not modify the 2nd object at all.


6.已完成******
// 回傳obj 內 和 與arr有相同key 的項目 並回傳obj

function select(arr, obj) {
  var resultObj = {};     // 最終答案的obj
  
  
  arr.forEach(function(arrKey) {          // loop arr, forEach不return，所以return 要寫最外面
                                          
                                          // arrKey => arr 裡面的項目，會作為resultObj的key  
    if (arrKey in obj) {                  // 如果obj裡面的property有arrKey這個項目的話
                                          
                                          // assign obj: result.x 的值 = obj.x的值
      result[arrKey] = obj[arrKey];   
                                          // 左邊 將上一行 if 裡抓到的arrKey  新增為 result 裡的key 
                                          // 右邊 賦值：抓原obj 相同key的值 assign 給result的相同key 底下
                                          // note that arrKey is variable which stores actual key
       
    }
  });
  return result;
}

var arr = ['a', 'c', 'e'];
var obj = {a: 1, b: 2, c: 3, d: 4};
var out = select(arr, obj);
console.log(out); // ---> {a: 1, c: 3}

Notes:
* If keys are present in the given array, but are not in the given object, it should ignore them. 
* It does not modify the passed in object.



7. 已完成
//刪除 value 是 string的項目

function removeStringValues(obj) {
  for(var key in obj ) {
    if (typeof(obj[key]) === "string") { // key === 'name', key === 'age'
    delete obj[key]
    } 
  }
  
  return obj
}

var obj = {
  name: 'Sam',
  age: 20
}
console.log(removeStringValues(obj))
removeStringValues(obj);
console.log(obj); // { age: 20 }

9. 已完成
//刪除obj 內是string 必且超過指定字數的值 
//只是typo of string.....
function removeStringValuesLongerThan(num, obj) {
    for(var key in obj ) {
    if (typeof(obj[key]) === "string" && obj[key].length > num) { 
    delete obj[key];
    } 
  }
  return obj;
}

var obj = {
  name: 'Montana',
  age: 20,
  location: 'Texas'
};
console.log(removeStringValuesLongerThan(6, obj));


10. **
// 新增property and value with same value
var person = {
  firstName: 'Jade',
  lastName: 'Smith'
};

function addFullNameProperty(obj) {
  obj.fullName = obj.firstName + " " + obj.lastName;
}
addFullNameProperty(person);
console.log(person.fullName); // --> 'Jade Smith'


11. 已完成****
//用obj回傳字串內出現單字次數 
function countWords(str) {
  if (str.length === 0) {
    return {};                  // 依題目要求 若為空字串 回傳空{}
  } else {
  var arr = str.split(" ");     // 將字串以空格為分隔單位 轉成arr。接下來都可以用arr方法處理
  
  var wordList = {};            // 最後要回傳{} 因此開一個 裝處理的物件
  arr.forEach(function(word) {  // 使用 forEach loop through arr每一個word, forEach不return, 要在最外面回傳
    if (!wordList[word]) {      // 如果剛剛新開的 空{} 裡沒有此word 的key
      wordList[word] = 1;       // 將 此word 作為key 放進去 {} 並把值賦為 1
    } else {                    // 如果 {} 內已經有 word as key, 把值再加1
      wordList[word] += 1;
    }
    });
    return wordList;
  }
}

var output = countWords('ask a bunch get a bunch'); 
console.log(output); // --> {ask: 1, a: 2, bunch: 2, get: 1}

** 找字串內重複的字母

function findD(str) {  
  var result = [];
  var wordList = {};       
  var strArr = str.split("");

  for (var i = 0; i < strArr.length; i++){  
    if (!wordList[strArr[i]]) {     
      wordList[strArr[i]] = 1;       
    } else {                    
      wordList[strArr[i]] += 1;
    }
    };

    return wordList;  
} 

console.log(findD("mississippi"))
//{ m: 1, i: 4, s: 4, p: 2 }

function findD2(str) {
  var letterArr = str.split("");
  var letterList = {};
  var result = [];

  for (var i = 0; i < letterArr.length; i++) {
    if (!letterList[letterArr[i]]) {
      letterList[letterArr[i]] = 1;
    } else {
      letterList[letterArr[i]] += 1;
    }
  };

  for (var key in letterList) {
    var val = letterList[key]
    result.push([key, val]);
  }
  return result
}

console.log(findD2("mississippi"))
//[ [ 'm', 1 ], [ 'i', 4 ], [ 's', 4 ], [ 'p', 2 ] ]




