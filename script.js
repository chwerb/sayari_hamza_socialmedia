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
    document.querySelector(".overview-content").innerHTML="<h2>Overview</h2><p>This is the overview section.</p>";
}
function showwork(){
    document.querySelector(".overview-content").innerHTML="<h2>Work and Education</h2><p>This is the work and education section.</p>";
}
function placelived(){
    document.querySelector(".overview-content").innerHTML="<h2>Place Lived</h2><p>This is the place lived section.</p>";
}



fetch('data.JSON')
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.getElementById('posts-container');

    data.posts.forEach(post => {
      const user = data.users.find(u => u.id === post.user_id);
      if (!user) return; 

      const postElement = document.createElement('div');
      postElement.className = 'post';

      const photoHtml = `<img src="${post.photo}" alt="Post Image">` ;
      const profilePhotoHtml =  `<img src="${user.profile_photo}" alt="${user.name} s Profile Photo" class="profile-pic">` ;
      postElement.innerHTML = `
        <div class=profile-post>${profilePhotoHtml}
        <h3>${user.name}</h3>
        </div>
        <p>${post.content}</p>
        </div>
        ${photoHtml}
        <p>Likes: ${post.likes}</p>
        <div class="comments"></div>
      `;

      const commentsContainer = postElement.querySelector('.comments');
      post.comments.forEach(comment => {
        const commentUser = data.users.find(u => u.id === comment.user_id);
        if (!commentUser) return;
        const profilePhotoHtmlcomment = `<img src="${commentUser.profile_photo}" alt="${commentUser.name}'s Profile Photo" class="profile-pic">` ;

        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML =`${profilePhotoHtmlcomment}<strong>${commentUser.name}:</strong> ${comment.text}`;
        commentsContainer.appendChild(commentElement);
      });
      postsContainer.appendChild(postElement);
    });
    const friendscontainer=document.getElementById('friends');
    data.users.forEach(friend => {
      const friendprofilephoto=`<img src="${friend.profile_photo}" alt="${friend.name}photo" class="profile-pic">`;
      const friendelement = document.createElement('div');
      friendelement.className = 'friend';
      friendelement.innerHTML =`${friendprofilephoto}<h3>${friend.name}</h3>`;
      friendscontainer.appendChild(friendelement);
    });
  })
  .catch(error => console.error('Error loading data:', error));

