const bcrypt = require("bcrypt");

export const encryptPassword = async (password) => {
  if (!password) {
    return null;
  }

  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
