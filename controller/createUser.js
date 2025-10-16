const User = require("../model/userSchema");

async function createuser(req, res) {
  let { name, email, pass } = req.body;

  try {
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please enter name",
      });
    }
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please enter email",
      });
    }
    if (!pass) {
      return res.status(400).json({
        success: false,
        message: "Please enter password",
      });
    }

    const checkForExistingUSer = await User.findOne({ email });

    if (checkForExistingUSer) {
      return res.status(400).json({
        success: false,
        message: "Email already registerd",
      });
    }

    const newUser = await User.create({ name, email, password: pass });
    return res.status(200).json({
      success: true,
      message: "User created",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Try again",
      err: error.message,
    });
  }
}

// -----------------------getuser----------------

async function checkUser(req, res) {
  try {
    let getUser = await User.find({});
    return res.status(200).json({
      success: true,
      message: "User fetched successfuly",
      getUser,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error while fetching users",
      err: error.message,
    });
  }
}

// ------------------getUserById-----------------------------------

async function checkUserById(req, res) {
  const { id } = req.params;

  try {
    let getUserById = await User.findById(id);

    if (!getUserById) {
      return res.status(404).json({
        success: false,
        messege: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      messege: "user fetched by id",
      getUserById,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messege: "Failed to fetch by id",
      err: error.message,
    });
  }
}

//--------------------------updateuser------------------------------------

async function userUpdation(req, res) {
  try {
    let { id } = req.params;
    const { name } = req.body;

    let updatedUser = await User.findByIdAndUpdate(id, { name }, { new: true });
    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      messege: "updates Success",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messege: "updation failed, try again",
    });
  }
}

//-----------------------------------------Delete user--------------------

async function userDeletion(req, res) {
  try {
    let { id } = req.params;

    let userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      messege: "user deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Not deleted, try again",
    });
  }
}

module.exports = {
  createuser,
  checkUser,
  checkUserById,
  userUpdation,
  userDeletion,
};
