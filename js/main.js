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

// CHANGING NABAR-TOGGLER WHEN SCREEN WIDTH < 992PX USING document.body.scrollWidth...
let navbarToggler = document.querySelector(".navbar-toggler");

navbarToggler.addEventListener("click", () => {
  navbarToggler.children[0].classList.toggle("disappear");
  navbarToggler.children[1].classList.toggle("appear");
});

// HANDLING ALL ABOUT WINDOW SCROLL
let ScrollTop = document.getElementById("ScrollTop");
window.onscroll = () => {
  if (window.scrollY > 0) {
    ScrollTop.classList.remove("d-none");
    ScrollTop.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
    document.querySelector(".navbar").style.boxShadow =
      "inset tomato -1px -1px 3px 0px";
  } else {
    ScrollTop.classList.add("d-none");
    document.querySelector(".navbar").style.boxShadow = "none";
  }
};

// CREATING POSTS WITH API AND PUSHING THEM TO POSTS CONTAINER
let PostsContainer = document.querySelector(".posts .container");
let AllPosts = [];

// FETCHING POSTS...
//async
let currentPage = 1;
lastPage = 1;
function FetchingPosts() {
  //todo: FETCHING POSTS WITH ==> fetch() FUNCTION ... ASYNC & AWAIT
  // let res = await fetch("https://tarmeezacademy.com/api/v1/posts").then((res) =>
  //   res.json()
  // );
  // AllPosts = res.data;
  // CreatingPosts();

  //todo: FETCHING POSTS ==> WITH new Promise() , new XMLHttpRequest()(open() ;send()) FUNCTIONS ...
  let FetchingPots = new Promise((resolve, reject) => {
    let Request = new XMLHttpRequest();

    Request.open("get", `${BaseURL}/posts?limit=15&page=${currentPage}`);
    Request.responseType = "json";

    Request.onload = () => {
      if (Request.status >= 200 && Request.status < 300) {
        resolve(Request.response);
      } else {
        reject("There Some error In Your Request");
      }
    };
    Request.send();
  });
  FetchingPots.then((res) => {
    lastPage = res.meta.last_page;

    AllPosts = res.data;
    CreatingPosts();
  });
  FetchingPots.catch((err) => console.log(err));
}
FetchingPosts();

/*----------------------------------------------------------------------------------------------------------------------------------
|--// ONE OF THE MOST IMPORTANT FUNCTIONS IN JAVASCRIPT IS HANDLING WITH PAGINATION
|--//todo: Concept Of Pagination ( Infinite Scrolling ) Is ==> When You Reach The End Of Page It Requests The Upcomming Posts Not TO Overload On Server And Brwoser So When Call Function Which FetchProducts() With New Ones When Window Reach The End Of Scroll
------------------------------------------------------------------------------------------------------------------------------------*/
window.addEventListener("scroll", () => {
  // This Variable For Cakculating The End Of Page Scroll
  let endOfPage =
    window.scrollY + window.innerHeight + 1 >=
    document.documentElement.scrollHeight;
  // When We Reach It We Have To Change The Page Where We FetchProducts To The Next One Then Fetch The New Products
  if (endOfPage && currentPage < lastPage) {
    currentPage += 1;
    FetchingPosts();
  }
});

// PUSHING POSTS TO HTML FILE
function CreatingPosts() {
  AllPosts.forEach((post) => {
    PostsContainer.innerHTML += `
  <div class="card bg-dark text-white mt-5" key=${
    post.id
  } style="cursor:pointer" >
    <a class="text-decoration-none SinglePost" onclick="ClickingOnSinglePost(${
      post.id
    })">
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
          <h5 class="card-title">${
            post.title != null ? post.title : "Please Add A Title For Your Post"
          } </h5>
          <img
            src= ${
              typeof post.image !== "object"
                ? post.image
                : "../imgs/2032772-Eric-Thomas-Quote-Champions-keep-going-when-they-don-t-have.jpg"
            }
            class="w-100 img-responsive img-thumbnail"
            alt="img"
          />
          <p class="text-secondary"> ${post.created_at} </p>
          <p class="card-text"> ${
            post.body != "" ? post.body : "Please Add A Body For Your Post"
          } </p>
          <div class="d-flex align-items-center justify-content-start">
          <p class="mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-pen fw-bold fs-3"
              viewBox="0 0 16 16"
              style="margin-top: -4px"
            >
              <path
                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
              />
            </svg>
            (${post.comments_count}) comments
          </p>
          <div class="tags ms-3">
          ${
            post.tags.length > 0
              ? post.tagsforEach((el) => {
                  `<span>${el.name}</span>`;
                })
              : `<span class="bg-secondary p-2 opacity-75 text-black rounded-5 px-4">
              No Tags
              </span>`
          }
          </div>
          </div>
        </div>
    </a>
  </div>
        `;
  });
}

// FUNCTION FOR CLICKING ON EVERY SINGLE POST
function ClickingOnSinglePost(postId) {
  window.location = `http://127.0.0.1:5501/singlepage.html?postid=${postId}`;
}

// Variables For Add New Post
let AddPostModal = document.getElementById("createPostModel");
let closeBost = document.querySelector(".closeBost");
let CreateNewPost = document.getElementById("addPostbtn");
let TitleContent = document.getElementById("titleContent");
let BodyContent = document.getElementById("bodyContent");
let PicContent = document.getElementById("NewPicContent");

AddPostBtn.onclick = () => {
  AddPostModal.classList.add("show");
  AddPostModal.classList.add("d-block");
};
closeBost.onclick = () => {
  AddPostModal.classList.remove("show");
  AddPostModal.classList.remove("d-block");
};

//CLICKING ON PLUS BUTTON FOR CREATING NEW POST
CreateNewPost.addEventListener("click", () => {
  let formData = new FormData();
  formData.append("title", TitleContent.value);
  formData.append("body", BodyContent.value);
  formData.append("image", PicContent.files[0]);

  axios
    .post(`${BaseURL}/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
    .then((res) => {
      console.log(PicContent);
      AddPostModal.classList.remove("d-block");
      document.getElementById("createPostModelDialog").style.display = "none";

      ToastDivStrong.innerHTML = "NEW POST Status";
      ToastDivBody.innerHTML = "You Created A New Post Successfuly 😇";
      ToastDiv.classList.toggle("show");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    })
    .catch((err) => {
      document.querySelector(".createPostModel-message").innerHTML = "";
      document.querySelector(".createPostModel-message").innerHTML =
        err.response.data.message + "😢";
      document.querySelectorAll(".addPostInputs input").forEach((ele) => {
        ele.style.animation = "none";
        setTimeout(() => {
          ele.style.animation = "buzzle 0.5s 1 ease-in-out alternate";
        }, 100);
      });
    });
});
