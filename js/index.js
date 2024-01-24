// HANDLIG ACTIVE PAGE
let ActiveLinkes = document.querySelectorAll(".nav-link");
ActiveLinkes.forEach((ele) => {
  ele.addEventListener("click", () => {
    ActiveLinkes.forEach((el) => {
      el.classList.remove("active");
    });
    ele.classList.add("active");
  });
});

// HANDLING COLLAPSE BUTTON
document.querySelector(".navbar-toggler").addEventListener("click", () => {
  document.querySelector(".navbar-collapse").classList.toggle("collapse");
});

// CREATING POSTS WITH API
let PostsContainer = document.querySelector(".posts .container");
let AllPosts = [];

async function FetchingPosts() {
  let res = await fetch("https://tarmeezacademy.com/api/v1/posts").then((res) =>
    res.json()
  );
  AllPosts = res.data;
  CreatingPosts();
}
FetchingPosts();

function CreatingPosts() {
  AllPosts.forEach((post) => {
    PostsContainer.innerHTML += `
        <div class="card bg-dark text-white mt-5" key=${post.id}>
        <h6 class="card-header">
          <img
            src=${
              typeof post.author.profile_image !== "object"
                ? post.author.profile_image
                : "../imgs/man_4140037.png"
            }
            style="width: 40px; height: 40px"
            alt="person"
            class="rounded-5"
          />
          <p class="d-inline ms-1">${post.author.username}</p>
        </h6>
        <div class="card-body">
          <h5 class="card-title">Special title treatment</h5>
          <img
            src=${
              post.image.length !== undefined
                ? post.image
                : "../imgs/2032772-Eric-Thomas-Quote-Champions-keep-going-when-they-don-t-have.jpg"
            }
            class="w-100 vh-50% img-responsive img-thumbnail"
            alt="img"
          />
          <p class="text-secondary"> ${post.created_at} </p>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <p class="text-decoration-underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen"
              viewBox="0 0 16 16"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
              />
            </svg>
            (${post.comments_count}) comments
          </p>
        </div>
      </div>
        `;
  });
}
