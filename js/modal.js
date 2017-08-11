var modalOpen = document.querySelector(".button--modal");
var modalClose = document.querySelector(".modal-feedback__close");
var modalFeedback = document.querySelector(".modal-feedback");

modalOpen.addEventListener("click", function(event){
  event.preventDefault();
  modalFeedback.classList.add("modal-feedback--show");
});

modalClose.addEventListener("click", function(event){
  event.preventDefault();
  modalFeedback.classList.remove("modal-feedback--show");
});
