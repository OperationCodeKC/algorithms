// Start at with the first element in the array.
// Compare that element to the element next to it and
// swap if neccessary. This "bubbles" the largest element
// to the end of the array.
// Repeat until all elements are sorted.
const bubbleSort = a => {
  const n = a.length
  for (let i = 0; i < n - 2; i++) {
    for (j = 0; j < n - 2; j++) {
      if (a[j] > a[j + 1]) {
        let temp = a[j]
        a[j] = a[j + 1]
        a[j + 1] = temp
      }
    }
  }
  return a
}

// Iterate over all elements in the array. For each element
// find the location to insert it in the already sorted part
// of the array.
const insertionSort = a => {
  const n = a.length
  // Iteration of array till last element
  for (i = 0; i < n; i++) {
    let j = i
    // Iterate over the sorted part of array and insert the element
    while (j >= 0 && a[j] < a[j - 1]) {
      let temp = a[j]
      a[j] = a[j - 1]
      a[j - 1] = temp
      j--
    }
  }
  return a
}

// merge helper function
const merge = (left, right) => {
  let arr = []

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift())
    } else {
      arr.push(right.shift())
    }
  }
  return arr.concat(left.slice().concat(right.slice()))
}

// Divide the array into two parts, then each of
// those into two parts, then each of those into
// two parts, etc, etc. until the array is divided
// into n single part arrays. Merge the arrays from
// the bottom up in order until all sub arrays are
// merged.
const mergeSort = arr => {
  if (arr.length < 2) {
    return arr
  }

  const middle = Math.floor(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)

  return merge(mergeSort(left), mergeSort(right))
}

// choose a "pivot" - this can be any element (we choose randomly)
// partition the array into values that are greater than the pivot,
// less than the pivot and equal to the pivot. Recursively quicksort
// the greater than and less than arrays.
const quickSort = arr => {
  if (arr.length < 2) return arr

  const pivot = arr[Math.floor(Math.random() * arr.length)]

  let left = []
  let equal = []
  let right = []

  for (let element of arr) {
    if (element > pivot) right.push(element)
    else if (element < pivot) left.push(element)
    else equal.push(element)
  }

  return quickSort(left)
    .concat(equal)
    .concat(quickSort(right))
}

// helper function to get the last nth digit of a number
const getDigit = (num, nth) => {
  // get last nth digit of a number
  var ret = 0
  while (nth--) {
    ret = num % 10
    num = Math.floor((num - ret) / 10)
  }
  return ret
}

// Distribute elements into 10 buckets based on their least
// significant digit (102 - the least significant digit is 2).
// Re-insert elements in to the original list moving from bucket
// 0 to bucket 9 preserving the order in which they were
// inserted into the buckets.
// Move to the second least significant digit and repeat.
// (102 - second least significant digit is 0).
// Continue for all digits until the entire list is sorted.
const radixSort1 = list => {
  const largest = list.reduce((previous, current) => {
    if (previous) {
      if (previous > current) {
        return previous
      } else {
        return current
      }
    } else {
      return current
    }
  })
  const maxDigits =
    (Math.log10((largest ^ (largest >> 31)) - (largest >> 31)) | 0) + 1
  let digitBuckets = []
  let idx = 0

  for (let i = 0; i < maxDigits + 1; i++) {
    // rebuild the digit buckets according to this digit
    digitBuckets = []
    for (let j = 0; j < list.length; j++) {
      const digit = getDigit(list[j], i + 1)
      digitBuckets[digit] = digitBuckets[digit] || []
      digitBuckets[digit].push(list[j])
    }

    // rebuild the list according to this digit
    idx = 0
    for (let t = 0; t < digitBuckets.length; t++) {
      if (digitBuckets[t] && digitBuckets[t].length > 0) {
        for (j = 0; j < digitBuckets[t].length; j++) {
          list[idx++] = digitBuckets[t][j]
        }
      }
    }
  }
  return list
}

// helper function for Radix sort
const getNum = (num, index) => {
  const strNum = String(num)
  let end = strNum.length - 1
  const foundNum = strNum[end - index]

  if (foundNum === undefined) return 0
  else return foundNum
}

// helper function for Radix sort
const largestNum = arr => {
  let largest = '0'

  arr.forEach(num => {
    const strNum = String(num)

    if (strNum.length > largest.length) largest = strNum
  })

  return largest.length
}

const radixSort2 = arr => {
  let maxLength = largestNum(arr)

  for (let i = 0; i < maxLength; i++) {
    let buckets = Array.from({ length: 10 }, () => [])

    for (let j = 0; j < arr.length; j++) {
      let num = getNum(arr[j], i)

      if (num !== undefined) buckets[num].push(arr[j])
    }
    arr = buckets.flat()
  }
  return arr
}

// all: 100, 1000, 10000, 50000
// remove bubble/insertion: 100000, 200000
// remove merge: 5000000
const bubbleInput = []
const size = 100
for (i = 0; i < size; i++) {
  const item = Math.floor(Math.random() * size)
  bubbleInput.push(item)
}
const insertionInput = [...bubbleInput]
const mergeInput = [...bubbleInput]
const quickInput = [...bubbleInput]
const radixInput1 = [...bubbleInput]
const radixInput2 = [...bubbleInput]

const beforeBubble = new Date().getTime()
bubbleSort(bubbleInput)
const afterBubble = new Date().getTime()
console.log(`Bubble Sort: ${afterBubble - beforeBubble} milliseconds`)

const beforeInsertion = new Date().getTime()
insertionSort(insertionInput)
const afterInsertion = new Date().getTime()
console.log(`Insertion Sort: ${afterInsertion - beforeInsertion} milliseconds`)

const beforeMerge = new Date().getTime()
mergeSort(mergeInput)
const afterMerge = new Date().getTime()
console.log(`Merge Sort: ${afterMerge - beforeMerge} milliseconds`)

const beforeQuick = new Date().getTime()
quickSort(quickInput)
const afterQuick = new Date().getTime()
console.log(`Quick Sort: ${afterQuick - beforeQuick} milliseconds`)

const beforeRadix1 = new Date().getTime()
radixSort1(radixInput1)
const afterRadix1 = new Date().getTime()
console.log(`Radix Sort 1: ${afterRadix1 - beforeRadix1} milliseconds`)

const beforeRadix2 = new Date().getTime()
radixSort2(radixInput2)
const afterRadix2 = new Date().getTime()
console.log(`Radix Sort 2: ${afterRadix2 - beforeRadix2} milliseconds`)
