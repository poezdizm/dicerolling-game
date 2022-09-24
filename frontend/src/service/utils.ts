function isOverflownY(element : any) {
    return element.scrollHeight > element.clientHeight;
}

const Utils = {
    isOverflownY
};

export default Utils;