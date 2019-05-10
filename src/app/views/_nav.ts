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
        name: 'Add Layouts',
        url: '/layouts/add-layout',
      },
      {
        name: 'Edit Layouts',
        url: '/layouts/edit-layout',
      },
      {
        name: 'Highlighted Layouts',
        url: '/layouts/highlighted-layout',
      },
      {
        name: 'Upload Stickers',
        url: '/layouts/upload-image',
      }
    ]
  },
  {
    name: 'Hashtags',
    url: '/hashtags',
  },
  {
    name: 'Stickers',
    url: '/sticker',
    children: [
      {
        name: 'New Stickers',
        url: '/sticker/new-stickers',
      },
      {
        name: 'New Stickers Page',
        url: '/sticker/new-sticker-pages',
      },
      {
        name: 'All Stickers',
        url: '/sticker/all-stickers',
      },
      {
        name: 'Edit Sticker Page',
        url: '/sticker/edit-sticker-pages',
      },
      {
        name: 'Sticker Pages',
        url: '/sticker/sticker-pages',
      }
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
        name: 'Report Users',
        url: '/users/report-users',
      }
    ]
  }

];
