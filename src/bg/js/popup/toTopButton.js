export default function toTopButton() {
  $(document).scroll(function () {
    let top = $(".mdui-fab").offset().top;
    if (top < 2000) {
      $(".mdui-fab").css({ opacity: "0" });
    } else {
      $(".mdui-fab").css({ opacity: "1" });
    }
  });
}

$(".toTop").click(()=> {
    $("html,body").animate({ scrollTop: "0px" }, 600);
  });