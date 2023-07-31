const routes = [
  {
    path: "/",
    redirect: "/about",
    // component: () => import("layouts/MainLayout.vue"),
    // #children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/mapbox",
    component: () => import("layouts/BaseLayout.vue"),
    children: [{ path: "", component: () => import("pages/MapBoxPage.vue") }],
  },

  {
    path: "/login",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },

  {
    path: "/forgot-password",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "forgot-password",
        component: () => import("pages/ForgotPasswordPage.vue"),
      },
    ],
  },

  {
    path: "/register",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
    ],
  },

  {
    path: "/about",
    component: () => import("layouts/SiteLayout.vue"),
    children: [{ path: "", component: () => import("pages/AboutPage.vue") }],
  },

  {
    path: "/contact",
    component: () => import("layouts/SiteLayout.vue"),
    children: [{ path: "", component: () => import("pages/ContactPage.vue") }],
  },

  {
    path: "/resources",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ResourcesPage.vue") },
    ],
  },

  {
    path: "/data",
    component: () => import("layouts/SiteLayout.vue"),
    children: [{ path: "", component: () => import("pages/DataPage.vue") }],
  },

  {
    path: "/data-upload-water-quality",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataUploadWaterQuality",
        component: () => import("pages/DataUploadWaterQualityPage.vue"),
      },
    ],
  },

  {
    path: "/data-upload-macroinvertebrates",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataUploadMacroinvertebrate",
        component: () => import("pages/DataUploadMacroinvertebratesPage.vue"),
      },
    ],
  },

  {
    path: "/data-upload-form",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataUploadForm",
        component: () => import("pages/DataUploadFormPage.vue"),
      },
    ],
  },

  {
    path: "/data-upload-review-water-quality",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataUploadReviewWaterQuality",
        component: () => import("pages/DataUploadReviewWaterQualityPage.vue"),
      },
    ],
  },

  {
    path: "/data-upload-review-macroinvertebrates",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataUploadReviewMacroinvertebrates",
        component: () =>
          import("pages/DataUploadReviewMacroinvertebratesPage.vue"),
      },
    ],
  },

  {
    path: "/data-explorer",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataExplorer",
        component: () => import("pages/DataExplorerPage.vue"),
      },
    ],
  },

  {
    path: "/profile",
    component: () => import("layouts/SiteLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProfilePage.vue") }],
  },

  {
    path: "/edit-profile",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "editProfile",
        component: () => import("pages/ProfilePageEditor.vue"),
      },
    ],
  },

  {
    path: "/manage",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "manage",
        component: () => import("pages/ManagePage.vue"),
      },
    ],
  },
  {
    path: "/manage-groups",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "manageGroups",
        component: () => import("pages/ManageGroupsPage.vue"),
      },
    ],
  },
  {
    path: "/manage-users",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "manageUsers",
        component: () => import("pages/ManageUsersPage.vue"),
      },
    ],
  },
  {
    path: "/manage-stations",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "manageStations",
        component: () => import("pages/ManageStationsPage.vue")
      }
    ]
  },
  {
    path: "/data-toolset",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataToolset",
        component: () => import("pages/DataToolsetPage.vue")
      }
    ]
  },
  {
    path: "/data-water-quality",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataWaterQaulity",
        component: () => import("pages/UploadWaterQualityPage.vue")
      }
    ]
  },
  {
    path: "/data-macroinvertebrates",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataMacroinvertebrates",
        component: () => import("pages/UploadMacroinvertebratesPage.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
