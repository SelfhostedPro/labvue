<template>
    <LayoutsDefault :links="links">
        <NuxtPage></NuxtPage>
    </LayoutsDefault>
</template>
<script setup lang="ts">
const links = [
    {
        to: "/",
        icon: "mdi-view-dashboard",
        text: "Dashboard",
        divider: true
    },
    {
        text: "Containers",
        to: "/containers",
        icon: "mdi-application"
    },
    {
        text: "Tools",
        icon: "mdi-tools",
        subLinks: [
            {
                text: "Healthcheck",
                to: "/tools/healthcheck",
                icon: "mdi-bottle-tonic-plus"
            }
        ]
    }
]
// {
//     text: "Containers",
//     to: "/containers",
//     icon: "mdi-application"
// },
// {
//     text: "Templates",
//     to: "/templates",
//     icon: "mdi-folder"
// },
// // {
// //   text: "Projects",
// //   to: "/projects",
// //   icon: "mdi-book-open"
// // },
// {
//     icon: "mdi-cube-outline",
//     text: "Resources",
//     subLinks: [
//         {
//             text: "Images",
//             to: "/resources/images",
//             icon: "mdi-disc"
//         },
//         {
//             text: "Volumes",
//             to: "/resources/volumes",
//             icon: "mdi-database"
//         },
//         {
//             text: "Networks",
//             to: "/resources/networks",
//             icon: "mdi-network"
//         }
//     ]
// },
// {
//   to: "/settings",
//   icon: "mdi-cog",
//   text: "Settings"
// }
</script>