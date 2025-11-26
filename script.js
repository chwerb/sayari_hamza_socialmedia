function showposts(){
    document.getElementById("posts-container").style.display="block";
    document.getElementById("about").style.display="none";
    document.getElementById("friends").style.display="none";
}
function showabout(){
    document.getElementById("posts-container").style.display="none";
    document.getElementById("about").style.display="block";
    document.getElementById("friends").style.display="none";
}
function showfriends(){
    document.getElementById("posts-container").style.display="none";
    document.getElementById("about").style.display="none";
    document.getElementById("friends").style.display="block";
}
function showoverview(){
    document.querySelector(".overview-content").innerHTML="<h2>Overview</h2><p>Easy-going, curious, and open to good conversations. Here to share moments and connect with people who bring positive vibes.</p>";
}
function showwork(){
    document.querySelector(".overview-content").innerHTML=`<h2>Work and Education</h2>
    <p>Strong foundation in mathematics, physics, and computer science
    Actively studying programming languages (C, C++, Web)
    Working on projects to build real experience  </p>`;
}
function placelived(){
    document.querySelector(".overview-content").innerHTML=`<h2>Place Lived</h2><p>Current City
                                              Tunis, Tunisia (or the city where you currently study/live)
                                               Hometown
                                              Ariana, Tunisia (if that’s where you grew up)</p>`;
}

function runNotifPanel() {
  const list = document.getElementById('notif-list');
  if(!list) return;
  list.innerHTML = '';
  notifications.forEach(n => {
    const li = document.createElement('li');
    li.innerText = n.message;
    li.style.fontWeight = n.read ? 'normal' : 'bold';
    li.onclick = () => {
      n.read = true;
      // use render* helpers (defined later)
      if (typeof renderNotifCount === 'function') renderNotifCount();
      if (typeof renderNotifPanel === 'function') renderNotifPanel();
    };
    list.appendChild(li);
  });
}

// ensure notif panel hidden initially (avoid overriding later click handler)
const __notifPanelInit = document.getElementById('notif-panel');
if(__notifPanelInit) __notifPanelInit.style.display = 'none';



fetch('data.JSON')
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.getElementById('posts-container');

    if (Array.isArray(data.posts) && postsContainer) {
      data.posts.forEach(post => {
        const user = (data.users || []).find(u => u.id === post.user_id) || null;

        const postElement = document.createElement('div');
        postElement.className = 'post';

        const photoHtml = post.photo ? `<img src="${post.photo}" alt="Post Image">` : '';
        const profilePhotoHtml = user ? `<img src="${user.profile_photo}" alt="${user.name} s Profile Photo" class="profile-pic">` : '';

        postElement.innerHTML = `
        <div class="profile-post">${profilePhotoHtml}
        <h3>${user ? user.name : 'Unknown'}</h3>
        </div>
        <p>${post.content || ''}</p>
        <div class="post-image">
        ${photoHtml}
        </div>
        <div class="post-interactions">
          <button id="button-likes">Likes: ${post.likes || 0}</button>
          <button id="button-comment">comments</button>
        </div>
        <div class="comments" style="display:none;"></div>
      `;

        const commentsContainer = postElement.querySelector('.comments');
        if (Array.isArray(post.comments) && commentsContainer) {
          post.comments.forEach(comment => {
            const commentUser = (data.users || []).find(u => u.id === comment.user_id);
            if (!commentUser) return;
            const profilePhotoHtmlcomment = `<img src="${commentUser.profile_photo}" alt="${commentUser.name}'s Profile Photo" class="profile-pic">`;

            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `${profilePhotoHtmlcomment}<strong>${commentUser.name}:</strong> ${comment.text}`;
            commentsContainer.appendChild(commentElement);
          });
        }

        postsContainer.appendChild(postElement);

        const likesButton = postElement.querySelector('#button-likes');
        
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
        const commentButton = postElement.querySelector('#button-comment');
        if (commentButton && commentsContainer) {
          commentButton.addEventListener('click', () => {
            commentsContainer.style.display = (commentsContainer.style.display === 'none') ? 'block' : 'none';
          });
        }
      });
    }

    const friendscontainer = document.getElementById('friends');
    if (Array.isArray(data.users) && friendscontainer) {
      data.users.forEach(friend => {
        const friendprofilephoto = `<img src="${friend.profile_photo}" alt="${friend.name}photo" class="profile-pic">`;
        const friendelement = document.createElement('div');
        friendelement.className = 'friend';
        friendelement.innerHTML = `${friendprofilephoto}<h3>${friend.name}</h3>`;
        friendscontainer.appendChild(friendelement);
      });
    }
  })
  .catch(error => console.error('Error loading data:', error));

 let notifications = []; 


fetch('data.JSON')
  .then(response => response.json())
  .then(data => {
    notifications = data.notifications;
    renderNotifCount();
    renderNotifPanel();
  })
  .catch(error => console.error("Error loading notifications:", error));

function renderNotifCount() {
  const count = notifications.filter(n => !n.read).length;
  const el = document.getElementById('notif-count');
  if(el) el.innerText = count;
}

function renderNotifPanel() {
  const list = document.getElementById('notif-list');
  if(!list) return;
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

document.getElementById('bell-icon').onclick = () => {
  const panel = document.getElementById('notif-panel');
  if(panel) panel.classList.toggle('hidden');
};