console.log('single js')

const jumpTo = pageId => window.location.href = `/?page=${pageId}`;

document.querySelectorAll('.header-nav, .sidebar-nav')
  .forEach((nav, index) => {
    const sectionId = index >= 6 ? ++index % 6 : index;
    nav.addEventListener('click', () => jumpTo(sectionId));
  })

