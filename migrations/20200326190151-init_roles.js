module.exports = {
  async up(db) {
    const group = await db.collection('groups').findOne({title: 'Admin'});
    await db.collection('roles').insertMany([
      {
        title: 'View Role(s)',
        description: 'Allows a user to gather role details',
        roleKey: 'ROLE_SHOW',
        groups: [
          group._id
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
      },
      {
        title: 'View Group(s)',
        description: 'Allows a user to gather group details',
        roleKey: 'GROUP_SHOW',
        groups: [
          group._id
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
      },
      {
        title: 'Create Groups',
        description: 'Allows a user to create new groups',
        roleKey: 'GROUP_CREATE',
        groups: [
          group._id
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
      },
      {
        title: 'Update Groups',
        description: 'Allows a user to update existing groups',
        roleKey: 'GROUP_UPDATE',
        groups: [
          group._id
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
      },
      {
        title: 'Delete Groups',
        description: 'Allows a user to delete existing groups',
        roleKey: 'GROUP_DELETE',
        groups: [
          group._id
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0
      },
    ]).then(async (result) => {
      await db.collection('groups').updateOne({title: 'Admin'}, {
        $set: {
          roles: Object.values(result.insertedIds)
        }
      })
    });
  },

  down(db) {
    return db.collection('roles').deleteMany(
      {
        roleKey: {
          $in: [
            'ROLE_SHOW',
            'GROUP_SHOW',
            'GROUP_CREATE',
            'GROUP_UPDATE',
            'GROUP_DELETE'
          ]
        }
      }
    );
  }
};
