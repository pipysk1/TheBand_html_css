const arrStart = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
let touchOne = document.getElementById('input_touch_one')
let touchTwo = document.getElementById('input_touch_two')
let touchThree = document.getElementById('input_touch_three')

let arrTouch = []

const handleSameNumber = (arrStagingOne = [], arrStagingTwo = [], arrStagingThree = []) => {
    let result = [];
    debugger
    console.log(arrStagingOne);
    for (let i = 0; i < arrStagingOne?.length; i++) {
        let currentNumber = arrStagingOne[i]
        let seatNumber2 = arrStagingTwo.includes(currentNumber)
        let seatNumber3 = arrStagingThree.includes(currentNumber)
        if ((seatNumber2 && seatNumber3) || (seatNumber2 && !seatNumber3) || (!seatNumber2 && seatNumber3)) {
            result.push(currentNumber)
        }
    }
    return result;
}

const getAllTouch = (value = '', result) => {
    arrTouch = []
    const numberTouch = value?.value
    const hasComma = numberTouch.indexOf(',') !== -1;
    let arrSave = []
    if (hasComma) {
        const touch = value?.value?.split(',');

        for (let i = 0; i < arrStart.length; i++) {
            for (let j = 0; j < touch.length; j++) {
                arrTouch.push(arrStart[i] + touch[j]);
                arrTouch.push(touch[j] + arrStart[i]);
            }
        }
    } else {
        const numberTouch = value?.value.trim().split(' ')
        console.log(numberTouch);
        for (let i = 0; i < numberTouch.length; i++) {
            arrSave.push(numberTouch[i].toString())
        }
        for (let h = 0; h < arrSave.length; h++) {
            for (let j = 0; j < arrStart.length; j++) {
                arrTouch.push(arrStart[j] + arrSave[h])
                arrTouch.push(arrSave[h] + arrStart[j])
            }

        }
    }

    arrTouch = [...new Set(arrTouch)];
    return result = arrTouch

}

const getTouchOne = () => {
    let result = getAllTouch(touchOne)
    const view1 = document.getElementById('view_touch_one')
    const view2 = document.getElementById('dan1')
    view2.value = result
    return view1.value = result
}

const getTouchTwo = () => {
    let result = getAllTouch(touchTwo)
    const view1 = document.getElementById('view_touch_two')
    const view2 = document.getElementById('dan2')
    view2.value = result
    return view1.value = result
}
const getTouchThree = () => {
    let result = getAllTouch(touchThree)
    const view1 = document.getElementById('view_touch_three')
    const view2 = document.getElementById('dan3')
    view2.value = result
    return view1.value = result
}

const getDan = () => {
    console.log('1', getTouchOne(), '2:', getTouchTwo(), '3:', getTouchThree());
    const result = handleSameNumber(getTouchOne(), getTouchTwo(), getTouchThree())
    const viewResult = document.getElementById('result')
    const tongSo = document.getElementById('sumNumber')
    tongSo.value = result.length
    return viewResult.value = result
}