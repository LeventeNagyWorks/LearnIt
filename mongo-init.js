db = db.getSiblingDB('learnit');

db.createUser({
  user: 'learnit_user',
  pwd: 'learnit_password',
  roles: [
    {
      role: 'readWrite',
      db: 'learnit',
    },
  ],
});

db.createCollection('users');
