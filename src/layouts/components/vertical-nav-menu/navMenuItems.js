/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: https://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  // {
  //   url: null,
  //   name: "Dashboard",
  //   tagColor: "warning",
  //   icon: "HomeIcon",
  //   i18n: "Dashboard",
  //   submenu: [
  //     // {
  //     //   url: '/dashboard/analytics',
  //     //   name: "Analytics",
  //     //   slug: "dashboard-analytics",
  //     //   i18n: "Analytics",
  //     // },
  //     {
  //       url: '/admin/categories',
  //       name: "List",
  //       slug: "user-list",
  //       icon: "MonitorIcon",
  //       i18n: "categories",
  //     },
  //     {
  //       url: '/admin/services',
  //       name: "List",
  //       slug: "services-list",
  //       icon: "CalendarIcon",
  //       i18n: "services",
  //     },
  //     // {
  //     //   url: '/dashboard/ecommerce',
  //     //   name: "eCommerce",
  //     //   slug: "dashboard-ecommerce",
  //     //   i18n: "eCommerce",
  //     // },
  //   ]
  // },
  {
    url: '/admin/categories',
    name: "List",
    slug: "categories-list",
    icon: "MonitorIcon",
    i18n: "categories",
  },
  // {
  //   url: '/admin/services',
  //   name: "List",
  //   slug: "services-list",
  //   icon: "CalendarIcon",
  //   i18n: "services",
  // },
  // {
  //   header: "Manage AlKhalijya",
  //   icon: "ServerIcon",
  //   i18n: "Manage AlKhalijya",
  //   items: [
  //     {
  //       url: null,
  //       name: "Data List",
  //       tagColor: "primary",
  //       icon: "ServerIcon",
  //       i18n: "AlKhalijya",
  //       submenu: [
          
          
  //       ]
  //     },
  //   ]
  // },
 
  // {
  //   url: "/ui-elements/colors",
  //   name: "Colors",
  //   slug: "colors",
  //   icon: "DropletIcon",
  //   i18n: "Colors",
  // },
]
