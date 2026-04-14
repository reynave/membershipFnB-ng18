import { Routes } from '@angular/router';

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
		data: {
			title: 'Loyalty & Bonuses',
		},
		loadComponent: () =>
			import('./pages/loyalty-bonuses/loyalty-bonuses.page').then((m) => m.LoyaltyBonusesPage),
	},
	{
		path: 'categories',
		data: {
			title: 'Culinary Collections',
		},
		loadComponent: () =>
			import('./pages/f-b-categories/f-b-categories.page').then((m) => m.FBCategoriesPage),
	},
	{
		path: 'voucher-wallet',
		data: {
			title: 'Voucher Wallet',
		},
		loadComponent: () =>
			import('./pages/voucher-wallet/voucher-wallet.page').then((m) => m.VoucherWalletPage),
	},
	{
		path: 'redeem-voucher-qr',
		data: {
			title: 'Redeem Voucher',
			hideChrome: true,
		},
		loadComponent: () =>
			import('./pages/redeem-voucher-qr/redeem-voucher-qr.page').then((m) => m.RedeemVoucherQrPage),
	},
	{
		path: 'redemption-history',
		data: {
			title: 'Redemption History',
		},
		loadComponent: () =>
			import('./pages/redemption-history/redemption-history.page').then((m) => m.RedemptionHistoryPage),
	},
	{
		path: 'point-history',
		data: {
			title: 'Point History',
		},
		loadComponent: () =>
			import('./pages/point-history/point-history.page').then((m) => m.PointHistoryPage),
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
