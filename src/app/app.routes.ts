import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
	{
		path: 'login',
		data: {
			title: 'Welcome',
			hideChrome: true,
		},
		loadComponent: () =>
			import('./pages/login-welcome/login-welcome.page').then((m) => m.LoginWelcomePage),
	},
	{
		path: 'dashboard',
		canActivate: [authGuard],
		data: {
			title: 'The Epicurean',
		},
		loadComponent: () =>
			import('./pages/dashboard-member-detail/dashboard-member-detail.page').then(
				(m) => m.DashboardMemberDetailPage,
			),
	},
	{
		path: 'loyalty-bonuses',
		canActivate: [authGuard],
		data: {
			title: 'Loyalty & Bonuses',
		},
		loadComponent: () =>
			import('./pages/loyalty-bonuses/loyalty-bonuses.page').then((m) => m.LoyaltyBonusesPage),
	},
	{
		path: 'categories',
		canActivate: [authGuard],
		data: {
			title: 'Culinary Collections',
		},
		loadComponent: () =>
			import('./pages/f-b-categories/f-b-categories.page').then((m) => m.FBCategoriesPage),
	},
	{
		path: 'voucher-wallet',
		canActivate: [authGuard],
		data: {
			title: 'Voucher Wallet',
		},
		loadComponent: () =>
			import('./pages/voucher-wallet/voucher-wallet.page').then((m) => m.VoucherWalletPage),
	},
	{
		path: 'redeem-voucher-qr',
		canActivate: [authGuard],
		data: {
			title: 'Redeem Voucher',
			hideChrome: true,
		},
		loadComponent: () =>
			import('./pages/redeem-voucher-qr/redeem-voucher-qr.page').then((m) => m.RedeemVoucherQrPage),
	},
	{
		path: 'redemption-history',
		canActivate: [authGuard],
		data: {
			title: 'Redemption History',
		},
		loadComponent: () =>
			import('./pages/redemption-history/redemption-history.page').then((m) => m.RedemptionHistoryPage),
	},
	{
		path: 'point-history',
		canActivate: [authGuard],
		data: {
			title: 'Point History',
		},
		loadComponent: () =>
			import('./pages/point-history/point-history.page').then((m) => m.PointHistoryPage),
	},
	{
		path: 'promos',
		canActivate: [authGuard],
		data: {
			title: 'Promos',
			hideChrome: true,
		},
		loadComponent: () => import('./pages/promos/promo-list.page').then((m) => m.PromoListPage),
	},
	{
		path: 'promos/:id',
		canActivate: [authGuard],
		data: {
			title: 'Promo Detail',
			hideChrome: true,
		},
		loadComponent: () => import('./pages/promos/promo-detail.page').then((m) => m.PromoDetailPage),
	},
	{
		path: 'profile',
		canActivate: [authGuard],
		data: {
			title: 'Profile',
		},
		loadComponent: () =>
			import('./pages/profile-user/profile-user.page').then((m) => m.ProfileUserPage),
	},
	{
		path: 'notification',
		canActivate: [authGuard],
		data: {
			title: 'Notification',
			hideChrome: true,
		},
		loadComponent: () =>
			import('./pages/notification/notification.page').then((m) => m.NotificationPage),
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'dashboard',
	},
	{
		path: '**',
		redirectTo: 'dashboard',
	},
];
