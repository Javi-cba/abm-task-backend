const userModel = require("../../models/user");
const pager = require("../../utils/pager");

async function createIfNotExists(decoded, response) {
  let user = await findOne(decoded.email)
  if (!user) {
    user = { firstname: decoded.given_name, lastname: decoded.family_name, email: decoded.email }
    await save(user)
  }
  return user
}

async function findOneById(_id) {
  return await userModel.findById(_id).exec();
}

async function findOne(email) {
  return await userModel.findOne({ email: email }).exec();
}

async function save(user) {
  let _user = new userModel(user);
  return await _user.save();
}

async function paginated(params) {
  let perPage = params.perPage ? params.perPage : 10, page = Math.max(0, params.page);
  let filter = params.filter ? params.filter : {};
  let sort = params.sort ? params.sort : {};

  let count = await userModel.countDocuments(filter);
  let data = await userModel.find(filter)
    .limit(perPage)
    .skip(perPage * page)
    .sort(sort)
    .exec();

  return pager.createPager(page, data, count, perPage);
}

async function update(id, updatedUser) {
  return await userModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
}

async function remove(id) {
  return await userModel.findOneAndDelete({ _id: id }).exec();
}

module.exports = { createIfNotExists, findOneById, findOne, save, paginated, update, remove };
