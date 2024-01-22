let ActiveLinkes = document.querySelectorAll(".nav-link");

ActiveLinkes.forEach((ele) => {
  ele.addEventListener("click", () => {
    ActiveLinkes.forEach((el) => {
      el.classList.remove("active");
    });
    ele.classList.add("active");
  });
});
