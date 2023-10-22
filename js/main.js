let sidebarOpen = false;
const toggleSidebar = () =>  {
    sidebarOpen = !sidebarOpen;
    document.querySelector(".sidebar").style.width = sidebarOpen ? "250px" : "0";
}
