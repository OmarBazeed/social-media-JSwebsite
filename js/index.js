let BaseURL = "https://tarmeezacademy.com/api/v1";

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

// CREATING POSTS WITH API AND PUSHING THEM TO POSTS CONTAINER
let PostsContainer = document.querySelector(".posts .container");
let AllPosts = [];

// FETCHING POSTS...
//async
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

    Request.open("get", `${BaseURL}/posts`);
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
    AllPosts = res.data;
    CreatingPosts();
  });
  FetchingPots.catch((err) => console.log(err));
}
FetchingPosts();

// PUSHING POSTS TO HTML FILE
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
            class="w-100 img-responsive img-thumbnail"
            alt="img"
          />
          <p class="text-secondary"> ${post.created_at} </p>
          <p class="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <div class="d-flex align-items-center justify-content-start">
          <p class="text-decoration-underline mb-0">
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
              : ` <span class="btn btn-danger opacity-75 text-white rounded-5">
              No Tags 😢
              </span>`
          }
          </div>
          </div>
        </div>
      </div>
        `;
  });
}

// LOGIN FUNCTION
let LoginBtn = document.getElementById("login-btn");
let userName = document.getElementById("username");
let Password = document.getElementById("password");
let LoginModal = document.getElementById("loginModal");
let LoginBtns = document.querySelector(".buttons");
let ErrorMessage = document.getElementById("error_message");
let ToastDiv = document.getElementById("liveToast");
let LogOutBtn = document.getElementById("logOutBtn");
let loggedInUser = document.querySelector(".loggedInUser");

// REGISTER BUTTON ...
let RegisterBtn = document.querySelector(".RegisterBtn");
let RegisterModal = document.getElementById("registerModel");
let CloseRegisterBtn = document.querySelector(".closeRegister");
//Check If There Is Token Before(Is The Client Signed In Before) ?
function CheckingIfUserIsFounded() {
  if (localStorage.getItem("user")) {
    LogOutBtn.style.display = "block !important";
    LoginBtns.style.display = "none";
    loggedInUser.classList.remove("d-none");

    loggedInUser.innerHTML = `
    <div class="btn-group">
      <button class="btn btn-secondary dropdown-toggle">
        <img src=${
          typeof JSON.parse(localStorage.getItem("user")).profile_image !=
          "object"
            ? JSON.parse(localStorage.getItem("user")).profile_image
            : "../imgs/man_4140037.png"
        }
        style="width:25px; height:25px"
        />
        <span> ${JSON.parse(localStorage.getItem("user")).name}</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
        <li><button class="dropdown-item" type="button">Edit</button></li>
        <li><button class="dropdown-item" type="button">Delete</button></li>
      </ul>
    </div>
    `;
  } else {
    LogOutBtn.style.display = "none";
    LoginBtns.style.display = "block";
  }
}
CheckingIfUserIsFounded();

//CLICKING ON SIGNOUT BYTTON
function ClickingOnSignOut() {
  LogOutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.reload();
  });
}
ClickingOnSignOut();

function loginBtnClicked() {
  LoginBtn.addEventListener("click", () => {
    axios
      .post(`${BaseURL}/login`, {
        username: userName.value,
        password: Password.value,
      })
      .then((res) => {
        if (res.data.token) {
          //KEEPING TOKEN , USER IN LOCAL STORAGE
          localStorage.setItem("user-token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          // CONTROLLING SOME ELEMENTS IN HTML
          LoginModal.style.display = "none";
          document.querySelector(".modal-backdrop").style.display = "none";
          LogOutBtn.style.display = "inline-block";
          LoginBtns.style.display = "none";
          ToastDiv.classList.toggle("show");

          // FILLING PERSONAL DATA TO THE LOGGED IN USER
          loggedInUser.classList.remove("d-none");
          loggedInUser.innerHTML = `
          <img src=${
            typeof res.data.user.profile_image != "object"
              ? res.data.user?.profile_image
              : "../imgs/man_4140037.png"
          }
          style="width:25px; height:25px"
          />
          <span> ${res.data.user?.name}</span>
          `;
          setTimeout(() => {
            ToastDiv.classList.remove("show");
          }, 2000);
        }
      })
      .catch((err) => {
        ErrorMessage.classList.remove("d-none");
        ErrorMessage.innerHTML += err.message + " !";
      });
  });
}
loginBtnClicked();

// CLICKING ON REGISTER BUTTON TO SUBMIT ...
const newUserName = document.getElementById("NewUsername");
const newUserUName = document.getElementById("Newusername");
const newUserPassword = document.getElementById("Newpassword");
const RegisterBtnForSubmit = document.getElementById("register-btn");
let registerModal = document.getElementById("registerModel");
let ToastDivStrong = document.querySelector("#liveToast strong");
let ToastDivBody = document.querySelector("#liveToast .toast-body");

//HANDLING CLICKING ON REGISTER MODAL
RegisterBtn.addEventListener("click", () => {
  RegisterModal.classList.add("show");
  RegisterModal.classList.add("d-block");
});
CloseRegisterBtn.addEventListener("click", () => {
  RegisterModal.classList.remove("show");
  RegisterModal.classList.remove("d-block");
});

// CLICKING ON REGISTER BUTTON TO SUBMIT
RegisterBtnForSubmit.addEventListener("click", () => {
  axios
    .post(`${BaseURL}/register`, {
      username: newUserUName.value,
      password: newUserPassword.value,
      name: newUserName.value,
    })
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));

      //CONTROLLING SOME ITEMS IN HTML AFTER REGISTER BUTTON
      registerModal.classList.remove("d-block");
      document.getElementById("registerDialog").style.display = "none";
      LogOutBtn.style.display = "inline-block";
      LoginBtns.style.display = "none";

      ToastDivStrong.innerHTML = "Registration Status: ";
      ToastDivBody.innerHTML = "You Had Registered In Successfuly 😇";
      ToastDiv.classList.toggle("show");

      // FILLING PERSONAL DATA TO THE LOGGED IN USER
      loggedInUser.classList.remove("d-none");
      loggedInUser.innerHTML = `
                <img src=${
                  typeof res.data.user.profile_image != "object"
                    ? res.data.user?.profile_image
                    : "../imgs/man_4140037.png"
                }
                style="width:25px; height:25px"
                />
                <span> ${res.data.user?.name}</span>
                `;
      setTimeout(() => {
        ToastDiv.classList.remove("show");
      }, 2000);
    });
});
