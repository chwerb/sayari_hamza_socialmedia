function showposts() {
    document.getElementById("posts-container").style.display = "block";
    document.getElementById("about").style.display = "none";
    document.getElementById("friends").style.display = "none";
}

function showabout() {
    document.getElementById("posts-container").style.display = "none";
    document.getElementById("about").style.display = "block";
    document.getElementById("friends").style.display = "none";
}

function showfriends() {
    document.getElementById("posts-container").style.display = "none";
    document.getElementById("about").style.display = "none";
    document.getElementById("friends").style.display = "block";
}

function showoverview() {
    document.querySelector(".overview-content").innerHTML = "<h2>Overview</h2><p>Easy-going, curious, and open to good conversations. Here to share moments and connect with people who bring positive vibes.</p>";
}

function showwork() {
    document.querySelector(".overview-content").innerHTML = `<h2>Work and Education</h2>
    <p>Strong foundation in mathematics, physics, and computer science<br>
    Actively studying programming languages (C, C++, Web)<br>
    Working on projects to build real experience</p>`;
}

function placelived() {
    document.querySelector(".overview-content").innerHTML = `<h2>Places Lived</h2>
    <p><strong>Current City:</strong> Tunis, Tunisia<br>
    <strong>Hometown:</strong> Ariana, Tunisia</p>`;
}

// ================ NOTIFICATIONS ================
let notifications = [];

function renderNotifCount() {
    const count = notifications.filter(n => !n.read).length;
    document.getElementById('notif-count').innerText = count || '';
}

function renderNotifPanel() {
    const list = document.getElementById('notif-list');
    list.innerHTML = '';
    notifications.forEach(n => {
        const li = document.createElement('li');
        li.innerText = n.message;
        li.style.fontWeight = n.read ? 'normal' : 'bold';
        li.onclick = () => {
            n.read = true;
            renderNotifCount();
            renderNotifPanel();
        };
        list.appendChild(li);
    });
}

// Bell icon 
document.getElementById('bell-icon').onclick = () => {
    document.getElementById('notif-panel').classList.toggle('hidden');
};

// ================ FETCH POSTS & FRIENDS  ================
fetch('data.JSON')  
    .then(response => response.json())
    .then(data => {
        const postsContainer = document.getElementById('posts-container');

        // POSTS
        data.posts.forEach(post => {
            const user = data.users.find(u => u.id === post.user_id);
            if (!user) return;

            const postElement = document.createElement('div');
            postElement.className = 'post';

            const photoHtml = post.photo ? `<img src="${post.photo}" alt="Post Image" class="post-image">` : '';
            const profilePhotoHtml = `<img src="${user.profile_photo}" alt="${user.name}" class="profile-pic">`;

            postElement.innerHTML = `
                <div class="profile-post">
                    ${profilePhotoHtml}
                    <h3>${user.name}</h3>
                </div>
                <p class="post-content">${post.content}</p>
                ${photoHtml}
                <div class="post-interactions">
                    <button class="button-likes">Likes: ${post.likes}</button>
                    <button class="button-comment">Comments</button>
                </div>
                <div class="comments" style="display:none;"></div>
            `;

            // Comments
            const commentsContainer = postElement.querySelector('.comments');
            post.comments.forEach(comment => {
                const commentUser = data.users.find(u => u.id === comment.user_id);
                if (!commentUser) return;
                const commentPhoto = `<img src="${commentUser.profile_photo}" alt="${commentUser.name}" class="profile-pic comment-pic">`;
                const commentEl = document.createElement('div');
                commentEl.className = 'comment';
                commentEl.innerHTML = `${commentPhoto}<strong>${commentUser.name}:</strong> ${comment.text}`;
                commentsContainer.appendChild(commentEl);
            });

            postsContainer.appendChild(postElement);

            // Likes button
            const likesButton = postElement.querySelector('.button-likes');
        if (likesButton) {
          let x=0 ;
           likesButton.addEventListener('click', () => {
            if (x%2==0){
            post.likes = (post.likes || 0) + 1;
            likesButton.textContent = `you+${post.likes}liked`;
            likesButton.style.background="blue";
            x=x+1;
            }else{
            post.likes=(post.likes || 0 )- 1;
            likesButton.textContent = `likes:${post.likes}`;
            
            likesButton.style.background="#e7f3ff";
            x=x+1;
            }
           });
        }   

            // comments
            const commentButton = postElement.querySelector('.button-comment');
            commentButton.addEventListener('click', () => {
                const display = commentsContainer.style.display === 'none' || commentsContainer.style.display === '' ? 'block' : 'none';
                commentsContainer.style.display = display;
            });
        });

        // FRIENDS (only once!)
        const friendsContainer = document.getElementById('friends');
        friendsContainer.innerHTML = ''; // clear duplicate
        data.users.forEach(friend => {
            const friendPhoto = `<img src="${friend.profile_photo}" alt="${friend.name}" class="profile-pic">`;
            const friendEl = document.createElement('div');
            friendEl.className = 'friend';
            friendEl.innerHTML = `${friendPhoto}<h3>${friend.name}</h3>`;
            friendsContainer.appendChild(friendEl);
        });
    })
    .catch(error => console.error('Error loading data:', error));

// Load notifications
fetch('data.JSON')
    .then(response => response.json())
    .then(data => {
        notifications = data.notifications || [];
        renderNotifCount();
        renderNotifPanel();
    })
    .catch(err => console.error("Error loading notifications:", err));