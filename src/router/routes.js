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
    path: "/data-upload",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataUpload",
        component: () => import("pages/DataUploadPage.vue"),
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
    path: "/data-upload-review",
    component: () => import("layouts/SiteLayout.vue"),
    children: [
      {
        path: "",
        name: "dataUploadReview",
        component: () => import("pages/DataUploadReviewPage.vue"),
      },
    ],
  },

  {
    path: "/profile",
    component: () => import("layouts/SiteLayout.vue"),
    children: [{ path: "", component: () => import("pages/ProfilePage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
