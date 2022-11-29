// require router for modularity
const router = require('express').Router();

// object that contains controllers from user-controller
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// /api/users (GET all users, POST new user)
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// /api/users/:id (GET user by id, PUT updated user details, DELETE user)
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// api/users/:id/friends/:friendsId (GET friend by id, POST new friend, DELETE one friend)
router
    .route('/:id/friends/:friendsId')
    .post(addFriend)
    .delete(removeFriend);

// export router for use elsewhere
module.exports = router;
