

function createPager(page, data, total, perPage) {
    return { page: page, data: data, total: total, perPage: perPage, totalPage: Math.ceil(total / perPage) };
}
module.exports = { createPager };