const bcrypt = require("bcrypt");

const hashPassword = async (pw) => {
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(pw, salt);
  console.log(salt);
  console.log(hash);
};

const hashPassword2 = async (pw) => {
  const hash = await bcrypt.hash(pw, 12);
  console.log(hash);
};

const login = async (pw, hash) => {
  const res = await bcrypt.compare(pw, hash);
  if (res) {
    console.log("Logged in successfully!");
  } else {
    console.log("Wrong password.");
  }
};

// hashPassword("monkey");
// hashPassword2("monkey");
login("monkey", "$2b$12$ZG0EiABc.uV8XdCy5AT9heMu.MIFGallb3XVgUDAIYHJf/Y.vBvcq");
