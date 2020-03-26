module.exports = {
  up(db, client) {
    return db.collection('groups').insertMany([
      {
        title: 'Admin',
        description: 'The administrating group',
        weight: 9999,
        isDefault: false,
        roles: [],
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
      },
      {
        title: 'User',
        description: 'The default user group',
        weight: 1,
        isDefault: true,
        roles: [],
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
      }
    ]);
  },

  down(db, client) {
    return db.collection('groups').deleteMany(
      {
        title: {
          $in: [
            'Admin',
            'User'
          ]
        }
      }
    );
  }
};
