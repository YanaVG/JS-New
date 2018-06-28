  function SocialBook(users = [], posts = {}) {
    this.users = users;
    this.posts = posts;
  
    this.getId = () =>
      '-' +
      Math.random()
        .toString(36)
        .substr(2, 9);
  
    this.getAllUsers = () => this.users;
  
    this.getUserByLogin = login => this.users.find(user => user.login === login);
  
    this.getUserStatus = userId => {
      const getUserStatus = this.users.find(user => user.id === userId);
      return getUserStatus.isActive ? 'active' : 'inactive';
    };
  
    this.addUser = user => {
      const newUser = {
        ...user,
        id: this.getId(),
        isActive: false,
      };
      this.users.push(newUser);
      return this.users;
    };
  
    this.removeUserById = userId => {
      const removeUser = this.users.filter(user => user.id !== userId);
      return (this.users = removeUser);
    };
  
    this.getUsersCount = () => this.getAllUsers().reduce(acc => acc + 1, 0);
    //================================
    // Additional task
    //================================
    // this.getUserPosts = userId => this.posts[userId];
  
    // this.addPost = (userId, post) => {
    //   this.posts[userId].push(post);
    //   return this.posts[userId];
    // };
  
    // this.removePost = (userId, postId) =>
    //   (this.posts[userId] = this.posts[userId].filter(
    //     posts => posts.id !== postId,
    //   ));
  
    // this.getAllLikes = userId =>
    //   this.posts[userId].reduce((acc, post) => acc + post.likes, 0);
  
    // this.addPostLike = (userId, postId) => {
    //   const post = this.posts[userId].find(post => post.id === postId);
    //   return post.likes + 1;
    // };
  
    // this.getPostsCount = userId =>
    //   this.posts[userId].reduce((acc, post) => acc + post.likes, 0);
  }
  
  const socialBook1 = new SocialBook(initialUsers, initialPosts);
  console.log('getAllUsers(): ', socialBook1.getAllUsers());
  console.log(
    'getUserByLogin(): ',
    socialBook1.getUserByLogin('mangozedog@mail.com'),
  );
  console.log('getUserStatus(): ', socialBook1.getUserStatus('-qkpzenjxe'));
  console.log('getUserStatus(): ', socialBook1.getUserStatus('-e51cpd4di'));
  
  const user1 = {
    email: 'xxx@yyy.zzz',
    password: 'qwerty',
  };
  const user2 = {
    email: 'qqq@www.eee',
    password: 'asdzxc',
  };
  
  console.log('addUser(): ', socialBook1.addUser(user1));
  console.log('addUser(): ', socialBook1.addUser(user1));
  console.log('addUser(): ', socialBook1.addUser(user1));
  console.log('addUser(): ', socialBook1.addUser(user1));
  console.log('addUser(): ', socialBook1.addUser(user1));
  console.log('addUser(): ', socialBook1.addUser(user1));
  console.log('addUser(): ', socialBook1.addUser(user1));
  console.log('addUser(): ', socialBook1.addUser(user2));
  console.log('addUser(): ', socialBook1.addUser(user2));
  console.log('getAllUsers(): ', socialBook1.getAllUsers());
  console.log('removeUserById(): ', socialBook1.removeUserById('-qkpzenjxe'));
  console.log('removeUserById(): ', socialBook1.removeUserById('-e51cpd4di'));
  console.log('getUsersCount(): ', socialBook1.getUsersCount());
  
//   ================================
//   Additional task
//   ================================
  
  console.log('getUserPosts(): ', socialBook1.getUserPosts('-s19a6hqce'));
  console.log('getUserPosts(): ', socialBook1.getUserPosts('-qkpzenjxe'));
  
  const getId = () =>
    '-' +
    Math.random()
      .toString(36)
      .substr(2, 9);
  
  const newPost1 = {
    id: getId(),
    text: 'post #3',
    likes: 9999,
  };
  
  console.log('addPost(): ', socialBook1.addPost('-e51cpd4di', newPost1));
  console.log(
    'removePost(): ',
    socialBook1.removePost('-e51cpd4di', '-i03pbhy3s'),
  );
  console.log(
    'removePost(): ',
    socialBook1.removePost('-s19a6hqce', '-199hb6igr'),
  );
  console.log('getAllLikes(): ', socialBook1.getAllLikes('-s19a6hqce'));
  console.log(
    'addPostLike(): ',
    socialBook1.addPostLike('-s19a6hqce', '-5sgljaskg'),
  );
  console.log('getPostsCount(): ', socialBook1.getPostsCount('-e51cpd4di'));
  
  console.log(`${2 + 2}`);
  console.log(`${2 + 2}`);