export const navbarData = [
    {
    routeLink: 'welcome',
    icon: 'fal fa-home',
    label: 'Home',
    requiresUserId: false
    }, 
    {
    routeLink: 'series',
    icon: 'fal fa-tv-retro',
    label: 'Series',
    requiresUserId: false,
    },
    {
    routeLink: 'products',
    icon: 'fal fa-tshirt',
    label: 'Merch',
    requiresUserId: false,
    },
    {
    routeLink: 'cart',
    icon: 'fal fa-cash-register',
    label: 'Cart',
    requiresUserId: false,
    },
    {
    routeLink: 'cart/:userId',
    icon: 'fal fa-cash-register',
    label: 'Cart',
    requiresUserId: true,
    },
    {
    routeLink: 'user',
    icon: 'fal fa-user',
    label: 'Account',
    requiresUserId: false,
    },   
];