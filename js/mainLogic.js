let BaseURL = "https://tarmeezacademy.com/api/v1";
let AllPosts = [];
// LOGIN FUNCTION
let LoginBtn = document.getElementById("loginbtn");
let userName = document.getElementById("username");
let Password = document.getElementById("password");
let LoginModal = document.getElementById("loginModal");
let LoginBtns = document.querySelector(".buttons");
let ErrorMessage = document.getElementById("error_message");
let ToastDiv = document.getElementById("liveToast");
let LogOutBtn = document.getElementById("logOutBtn");
let loggedInUser = document.querySelector(".loggedInUser");
let AddPostBtn = document.getElementById("AddPostBtn");
// REGISTER BUTTON ...
let RegisterBtn = document.querySelector(".RegisterBtn");
let RegisterModal = document.getElementById("registerModel");
let CloseRegisterBtn = document.querySelector(".closeRegister");

// CREATING POSTS WITH API AND PUSHING THEM TO POSTS CONTAINER
let PostsContainer = document.querySelector(".posts #PostsContainer");

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
    location.href === "http://127.0.0.1:5501/index.html" && CreatingPosts();
  });
  FetchingPots.catch((err) => console.log(err));
}

//FUNCTION FOR STYLING THE LOGGED USER ...
function StylingTheLoggedUser(res) {
  loggedInUser.innerHTML = `
    <div class="btn-group">
      <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false"  style="background:linear-gradient(to right, #ff5722, black);color:white;font-weight:bold">
        <img src=${
          typeof JSON.parse(localStorage.getItem("user")).user.profile_image !=
          "object"
            ? JSON.parse(localStorage.getItem("user")).user.profile_image
            : "../imgs/man_4140037.png"
        }
        style="width:25px; height:25px"
        class='rounded-5 me-3'
        />
        <span> ${
          JSON.parse(localStorage.getItem("user")).user.name ||
          res.data.user?.name
        }</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start DropMenu">
        <li><button class="dropdown-item" type="button">Edit</button></li>
        <li><button class="dropdown-item" type="button">Delete</button></li>
      </ul>
    </div>
    `;
  // Clicking On User Profile
  document.querySelector(".dropdown-toggle").addEventListener("click", () => {
    document
      .querySelector(".dropdown-toggle")
      .setAttribute("aria-expanded", "true");
    document.querySelector(".dropdown-toggle").classList.toggle("show");
    document.querySelector(".DropMenu").classList.toggle("d-block");
  });
}

//Showing The Edit Post Button
function ShowingeditButton(post) {
  if (post.author.id === JSON.parse(localStorage.getItem("user"))?.user.id) {
    return "d-block";
  } else {
    return "d-none";
  }
}

//Check If There Is Token Before(Is The Client Signed In Before) ?
function CheckingIfUserIsFounded() {
  if (localStorage.getItem("user")) {
    LogOutBtn.style.display = "block !important";
    LoginBtns.style.display = "none";
    loggedInUser.classList.remove("d-none");
    AddPostBtn?.classList.remove("d-none");

    FetchingPosts();

    StylingTheLoggedUser();
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
    AddPostBtn?.classList.add("d-none");
    window.location.reload();
  });
}
ClickingOnSignOut();

//FNCTION CLICKING ON LOGIN
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
          localStorage.setItem("user", JSON.stringify(res.data));

          // CONTROLLING SOME ELEMENTS IN HTML
          LoginModal.style.display = "none";
          if (document.querySelector(".modal-backdrop") !== "undefined") {
            document.querySelector(".modal-backdrop").style.display = "none";
          }
          LoginModal.classList.remove("show");
          LogOutBtn.style.display = "inline-block";
          LoginBtns.style.display = "none";
          ToastDiv.classList.toggle("show");

          document.querySelector("body").style.overflow = "visible";

          AddPostBtn?.classList.remove("d-none");

          // FILLING PERSONAL DATA TO THE LOGGED IN USER
          loggedInUser.classList.remove("d-none");
          StylingTheLoggedUser(res);

          setTimeout(() => {
            ToastDiv.classList.remove("show");
          }, 2000);
        }
      })
      .catch((err) => {
        ErrorMessage.classList.remove("d-none");
        ErrorMessage.innerHTML = " ";
        ErrorMessage.innerHTML += err.response?.data?.message + "! 😢";
        document.querySelectorAll(".loginInputs input").forEach((ele) => {
          ele.style.animation = "none";
          setTimeout(() => {
            ele.style.animation = "buzzle 0.5s 1 ease-in-out alternate";
          }, 100);
        });
      });
  });
}
loginBtnClicked();

// CLICKING ON REGISTER BUTTON IN HEADER TO OPEN MODEL , ADD NEW USER ...
const newUserName = document.getElementById("NewUsername");
const newUserUName = document.getElementById("Newusername");
const newUserPassword = document.getElementById("Newpassword");
const newUserPicture = document.getElementById("NewProfilePic");
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
  let RegisterformData = new FormData();
  RegisterformData.append("username", newUserUName.value);
  RegisterformData.append("password", newUserPassword.value);
  RegisterformData.append("name", newUserName.value);
  RegisterformData.append("image", newUserPicture.files[0]);
  axios
    .post(`${BaseURL}/register`, RegisterformData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));

      //CONTROLLING SOME ITEMS IN HTML AFTER REGISTER BUTTON
      registerModal.classList.remove("d-block");
      document.getElementById("registerDialog").style.display = "none";
      LogOutBtn.style.display = "inline-block";
      LoginBtns.style.display = "none";

      ToastDivStrong.innerHTML = "Registration Status: ";
      ToastDivBody.innerHTML = "You Had Registered In Successfuly 😇";
      ToastDiv.classList.toggle("show");

      AddPostBtn?.classList.remove("d-none");

      // FILLING PERSONAL DATA TO THE LOGGED IN USER
      loggedInUser.classList.remove("d-none");
      StylingTheLoggedUser(res);

      setTimeout(() => {
        ToastDiv.classList.remove("show");
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
      document.getElementById("RegisterError").innerHTML = "";
      document.getElementById("RegisterError").innerHTML =
        err.response.data?.message + "! 😢";
      document.querySelectorAll(".regiterInputs input").forEach((ele) => {
        ele.style.animation = "none";
        setTimeout(() => {
          ele.style.animation = "buzzle 0.5s 1 ease-in-out alternate";
        }, 100);
      });
    });
});

// EDIT POST BUTTON CLICKED
function EditPostBtnClicked() {
  // location.href = "http://127.0.0.1:5501/index.html" && e.stopPagination();
  let EditPostModule = document.getElementById("createPostModel");
  EditPostModule.classList.add("show");
  EditPostModule.style.display = "block";
  document.querySelector(".closeBost").onclick = () => {
    EditPostModule.classList.remove("show");
    EditPostModule.style.display = "none";
  };
  let PostHeader = document.getElementById("titleContent");
  PostHeader.value = JSON.parse(localStorage.getItem("SinglePost")).title;
  let PostBody = document.getElementById("bodyContent");
  PostBody.value = JSON.parse(localStorage.getItem("SinglePost")).body;
  let EditPostBtnInsideModule = document.getElementById("addPostbtn");
  let PicContent = document.getElementById("NewPicContent");

  //todo : Here Is For Clicking On Edut Post Button To Submit The New Changes
  EditPostBtnInsideModule.onclick = () => {
    let formData = new FormData();
    formData.append("title", PostHeader.value);
    formData.append("body", PostBody.value);
    formData.append("image", PicContent.files[0]);
    formData.append("_method", "put");
    postId = JSON.parse(localStorage.getItem("SinglePost")).id;

    axios
      .post(`${BaseURL}/posts/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((res) => {
        EditPostModule.classList.remove("d-block");
        document.getElementById("createPostModelDialog").style.display = "none";
        ToastDivStrong.innerHTML = "EDIT POST STATUS";
        ToastDivBody.innerHTML = "You Edited Your Post Successfuly 👺 ";
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
  };
}
