// so much empty

const postList    = document.getElementById("postList");
const postForm    = document.getElementById("postForm");
const fetchButton = document.getElementById("fetchButton");
const loadingMessage = document.getElementById("loadingMessage");

if (loadingMessage) {
    loadingMessage.style.display = "none";
}

const renderPosts = (posts) => {
    postList.innerHTML = "";
    posts.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr/>
        `;
        postList.appendChild(postElement);
    });
};

postForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("titleInput").value;
    const body  = document.getElementById("bodyInput").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ title, body })
    })
    .then((response) => {
        if (!response.ok) throw new Error(`Status ${response.status}`);
        return response.json();
    })
    .then((newPost) => {
        alert("Post submitted!");
        renderPosts([newPost]);
    })
    .catch((error) => {
        console.error("Error submitting post:", error);
    });
});

fetchButton.addEventListener("click", () => {
    if (loadingMessage) loadingMessage.style.display = "block";

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then((response) => {
            if (!response.ok) throw new Error(`Status ${response.status}`);
            return response.json();
        })
        .then((data) => {
            renderPosts(data);
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        })
        .finally(() => {
            if (loadingMessage) loadingMessage.style.display = "none";
        });
});
