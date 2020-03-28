module.exports = {
  async up(db) {
    const group = await db.collection('groups').findOne({title: 'Admin'});
    await db.collection('users').insertOne({
      isConfirmed: true,
      status: true,
      roles: [],
      groups: [
        group._id
      ],
      firstName: "Admin",
	    lastName: "User",
	    email: "admin@example.dev",
      password: "$2b$12$K1REaurJQXjPdoae43hbL.zSRiS3HDTuvxEMnve7tQ.6jtVvu7NWO", // testme
      confirmKey: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    }).then(async (result) => {
      await db.collection('groups').updateOne({title: 'Admin'}, {
        $set: {
          users: [result.insertedId]
        }
      })
    });
  },

  async down(db) {
    await db.collection('users').deleteOne({
      email: "admin@example.dev"
    });
  }
};
