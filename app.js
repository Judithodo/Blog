// Import Node.js File System module
// This allows us to read and write files
const fs = require("fs");

// Get command from terminal (e.g., "add", "list", "delete")
const command = process.argv[2];

// Get input from terminal (e.g., post title or id)
const input = process.argv[3];

//helps you see what was passed in
console.log("Command:", command);
console.log("Input:", input);


// Function to load posts from the JSON file
function loadPosts() {

    // Check if the file exists. If it does, read and parse it. If not, return an empty array.
  if (fs.existsSync("posts.json")) {
    return JSON.parse(fs.readFileSync("posts.json", "utf-8"));
  }
  return [];
}

// Function to save posts back to the JSON file
function savePosts(posts) {
  // Convert JavaScript array into JSON string and save it
  // null, 2 makes the JSON file formatted (readable)
  fs.writeFileSync("posts.json", JSON.stringify(posts, null, 2));
}

if (command === "add") {
  if (!input) {
    console.log("Please provide a post.");
    return;
  }

  const posts = loadPosts();

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title: input,
    createdAt: new Date().toISOString()
  };

  posts.push(newPost);
  savePosts(posts);

  console.log("Post added!");
  
} 

else if (command === "list") {
  const posts = loadPosts();

  if (posts.length === 0) {
    console.log("No posts yet.");
    return;
  }

  console.log("Your Blog Posts:");
  
   posts.forEach((post) => {
    console.log(`${post.id}. ${post.title} (${post.createdAt})`);
  });
} 

else if (command === "delete") {
  const posts = loadPosts();
  const id = parseInt(input);

  const postIndex = posts.findIndex(post => post.id === id);

  if (postIndex === -1) {
    console.log("Post not found.");
    return;
  }

  const removed = posts.splice(postIndex, 1);
  savePosts(posts);

  console.log(`Deleted: ${removed[0].title}`);
}
else {
  console.log("Unknown command.");
}