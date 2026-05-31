const navLinks = [...document.querySelectorAll(".nav-link")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function navText(link) {
  return link.classList.contains("is-active") ? link.dataset.route : link.dataset.short;
}

function typeInto(link, text, delay = 0) {
  link.setAttribute("aria-label", link.dataset.route.replace("/", "") || "home");
  link.classList.add("is-typing");
  link.textContent = "";

  if (reduceMotion) {
    link.textContent = text;
    link.classList.remove("is-typing");
    return;
  }

  [...text].forEach((char, index) => {
    window.setTimeout(() => {
      link.textContent += char;
      if (index === text.length - 1) {
        link.classList.remove("is-typing");
      }
    }, delay + index * 34);
  });
}

navLinks.forEach((link, index) => {
  typeInto(link, navText(link), index * 55);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = new URL(link.href, window.location.href);

    if (
      reduceMotion ||
      target.origin !== window.location.origin ||
      target.pathname === window.location.pathname
    ) {
      return;
    }

    event.preventDefault();
    navLinks.forEach((item) => {
      item.classList.toggle("is-active", item === link);
      if (item === link) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
      typeInto(item, navText(item));
    });

    document.body.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = target.href;
    }, 260);
  });
});
