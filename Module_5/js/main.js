const initialUsers = [
    { id: "-s19a6hqce", login: "mangozedog@mail.com", password: "qwe123zv", isActive: true },
    { id: "-qkpzenjxe", login: "polysweet@skynet.ze", password: "123zxc78", isActive: true },
    { id: "-e51cpd4di", login: "ajax2k@change.ua", password: "ert234qw", isActive: false }
  ];
  
const initialPosts = {
    "-s19a6hqce": [
      { id: "-5sgljaskg", text: "post #1", likes: 3 },
      { id: "-199hb6igr", text: "post #2", likes: 5 },
      { id: "-hy0eyw5qo", text: "post #3", likes: 13 }
    ],
    "-qkpzenjxe": [
      { id: "-5tu69g5rf", text: "post #1", likes: 8 },
      { id: "-bje766393", text: "post #2", likes: 15 }
    ],
    "-e51cpd4di": [
      { id: "-9y6nkmlj4", text: "post #1", likes: 18 },
      { id: "-i03pbhy3s", text: "post #2", likes: 45 }
    ],
  };

function SocialBook (users = [], posts = {}) { 
    this.users = users;
    this.posts = posts;
    this.getId = () => "-" + Math.random().toString(36).substr(2, 9);
    this.getAllUsers = () => this.users;
      
    this.getUserByLogin = (login) => this.users.find(user => user.login === login);
    
    this.getUserStatus = userId => {
        const getUserStatus = this.users.find(user => user.id === userId);
        return getUserStatus.isActive ? "active" : "disactive";
    };
      
    this.addUser = user => {
        const newUser = {
            id: this.getId(),
            ...user,
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

    // ================
    // Additional Task
    // ================

    this.getUserPosts = userId => this.posts[userId];

    this.addPost = (userId, post) => {
        this.posts[userId].push(post);
        return this.posts[userId];
    };

    this.removePost = (userId, postId) =>
        (this.posts[userId] = this.posts[userId].filter(post => post.id !== postId));

    this.getAllLikes = userId => this.posts[userId].reduce((acc, post) => acc + post.likes, 0);
  
    this.addPostLike = (userId, postId) => {
        const post = this.posts[userId].find(post => post.id == postId);
        return post.likes + 1;
    };

    this.getPostsCount = userId => this.getUserPosts(userId).length;
};    

  

const SocialBook_1 = new SocialBook (initialUsers, initialPosts);

console.log('getAllUsers', SocialBook_1.getAllUsers());
console.log('getUserByLogin', SocialBook_1.getUserByLogin("mangozedog@mail.com"));
console.log('getUserStatus', SocialBook_1.getUserStatus("-s19a6hqce"));
console.log('getUserStatus', SocialBook_1.getUserStatus("-e51cpd4di")); 

const getId = () => "-" + Math.random().toString(36).substr(2, 9);

const user1 = {
    login: "mango123@gmail.com",
    password: "qwerty123"

};
const user2 = {
    login: "poly456@gmail.com4567",
    password: "poiuyt"

};

console.log('addUser', SocialBook_1.addUser(user1));
console.log('addUser', SocialBook_1.addUser(user2));
console.log('addUser', SocialBook_1.addUser(user1));
console.log('addUser', SocialBook_1.addUser(user2));
console.log('addUser', SocialBook_1.addUser(user1));
console.log('addUser', SocialBook_1.addUser(user2));
console.log('getAllUsers', SocialBook_1.getAllUsers());
console.log('getUserByLogin', SocialBook_1.getUserByLogin("mango123@gmail.com"));
console.log('removeUserById', SocialBook_1.removeUserById( "-s19a6hqce"));
console.log('getUsersCount', SocialBook_1.getUsersCount());
console.log('removeUserById', SocialBook_1.removeUserById("-apfnp558r"));
console.log('getUsersCount', SocialBook_1.getUsersCount());

// ================
// Additional Task
// ================
console.log('getUserPosts', SocialBook_1.getUserPosts("-e51cpd4di"));

const newPost1 = {
    id: getId(),
    text: "post #3",
    like: 111
};
console.log('addPost', SocialBook_1.addPost("-e51cpd4di", newPost1));
console.log('removePost', SocialBook_1.removePost("-e51cpd4di", "-i03pbhy3s"));
console.log('getAllLikes', SocialBook_1.getAllLikes("-s19a6hqce"));
console.log('addPostLike', SocialBook_1.addPostLike("-qkpzenjxe", "-5tu69g5rf"));
console.log('getPostsCount', SocialBook_1.getPostsCount("-e51cpd4di"));

