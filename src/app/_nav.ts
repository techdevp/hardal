export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
  },
  {
    name: 'Layouts',
    url: '/layouts',
    children: [
      {
        name: 'All Layouts',
        url: '/layouts/all-layout',
      },
      {
        name: 'Layout Categories',
        url: '/layouts/layout-category',
      },
      {
        name: 'Layout Submissions',
        url: '/layouts/layout-submissions',
      },
      {
        name: 'Highlighted Layouts',
        url: '/layouts/highlighted-layout',
      },

      {
        name: 'New Layout Category',
        url: '/layouts/new-layout-category',
      },
      {
        name: 'Edit Layout Category',
        url: '/layouts/edit-layout-category/:id',
      },
      {
        name: 'New Layout',
        url: '/layouts/new-layout',
      },
      {
        name: 'Archived Layouts',
        url: '/layouts/archived-layouts',
      },
      {
        name: 'Draft Layouts',
        url: '/layouts/draft-layouts',
      },
      // {
      //   name: 'Edit Layouts',
      //   url: '/layouts/edit-layout',
      // },

    ]
  },
  {
    name: 'Posts',
    url: '/posts',
    children: [
      {
        name: 'All Posts',
        url: '/posts/all-posts',
      },
      {
        name: 'Reported Posts',
        url: '/posts/reported-posts',
      },
    ]
  },
  {
    name: 'Admin Users',
    url: '/admin-users',
  },
  {
    name: 'Hashtags',
    url: '/hashtags',
    children: [
      {
        name: 'Hashtags',
        url: '/hashtags/all-hashtags',
      },
      // {
      //   name: 'Hashtags Post',
      //   url: '/hashtags/hashtags-post',
      // },
      {
        name: 'Hashtags Report',
        url: '/hashtags/hashtags-report',
      },
      {
        name: 'Hashtags Report Detail',
        url: '/hashtags/hashtags-report-detail',
      },

      {
        name: 'New Hashtag',
        url: '/hashtags/new-hashtag',
      },
      {
        name: 'TT List',
        url: '/hashtags/tt-list',
      }
    ]
  },
  {
    name: 'Stickers',
    url: '/sticker',
    children: [
      {
        name: 'All Stickers',
        url: '/sticker/all-stickers',
      },
      {
        name: 'Sticker Pages',
        url: '/sticker/sticker-pages',
      },
      {
        name: 'Reposition Sticker Pages',
        url: '/sticker/reposition-sticker-pages',
      },
      {
        name: 'New Stickers Page',
        url: '/sticker/new-sticker-pages',
      },
      {
        name: 'Edit Sticker Page',
        url: '/sticker/edit-sticker-pages',
      },
      {
        name: 'New Stickers',
        url: '/sticker/new-stickers',
      },
    ]
  },

  {
    name: 'Users',
    url: '/users',
    children: [
      {
        name: 'All Users',
        url: '/users/all-users',
      },
      {
        name: 'New Users',
        url: '/users/new-users',
      },
      {
        name: 'Interests',
        url: '/users/interests',
      },
      {
        name: 'Featured Interests',
        url: '/users/featured-interests',
      },
      {
        name: 'Yellow Badge',
        url: '/users/yellow-badge',
      },
      {
        name: 'Grey Badge',
        url: '/users/grey-badge',
      },
      {
        name: 'Badge Submissions',
        url: '/users/badge-submissions',
      },
      {
        name: 'Reported Users',
        url: '/users/report-users',
      }
    ]
  }

];
