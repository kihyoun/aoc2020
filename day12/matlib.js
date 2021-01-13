
exports.matrix = (v1, v2) => {
    return [v1, v2];
}

exports.vertAdd = (v1, v2) => {
    return [
        v1[0] + v2[0],
        v1[1] + v2[1]
    ]
}

exports.vertSub = (v1, v2) => {
    return [
        v1[0] - v2[0],
        v1[1] - v2[1]
    ]
}

exports.matrixMulVert = (m, v) => {
    const mv1 = m[0];
    const mv2 = m[1];
    return [
        mv1[0] * v[0] + mv2[0] * v[1],
        mv1[1] * v[0] + mv2[1] * v[1]
    ]
}

exports.rotate = (v, alpha) => {

}