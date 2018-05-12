import { Component, ViewChild } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';

import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { ComponentsListPage } from '../pages/components/list/components.list.page';
import { GoogleMapsPage } from '../pages/google-maps/google-maps.page';
import { HomePage } from '../pages/home/home.page';
import { ProfileAppPage } from '../pages/profile-app/profile-app';
import { WordpressListPage } from '../pages/wordpress/list/wordpress.list.page';
import { TopTagsPage } from '../pages/toptags/toptags.page';

import { LoginPage } from '../pages/login/login';
import { AuthService } from '../services/auth.service';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	pages;
	rootPage;

	private app;
	private platform;
	private menu: MenuController;

	@ViewChild(Nav) nav: Nav;

	constructor(app: App, platform: Platform,
		menu: MenuController,
		private statusBar: StatusBar,
		private auth: AuthService) {
		this.menu = menu;
		this.app = app;
		this.platform = platform;
		this.initializeApp();

		// set our app's pages
		this.pages = [
			{ title: 'Home', component: HomePage, icon: 'home' },
			{ title: 'Top Queries', component: WordpressListPage, icon: 'logo-wordpress' },
			{ title: 'Top Tags', component: TopTagsPage, icon: 'pricetags' },
			{ title: 'Recent Questions', component: WordpressListPage, icon: 'map' },
			{ title: 'Your Questions', component: TopTagsPage, icon: 'help-buoy' },
			{ title: 'Profile', component: ProfileAppPage, icon: 'person' }
		];
	}

	initializeApp() {
			this.platform.ready().then(() => {
				this.statusBar.styleDefault();
			});

			this.auth.afAuth.authState
				.subscribe(
					user => {
						if (user) {
							this.rootPage = HomePage;
						} else {
							this.rootPage = LoginPage;
						}
					},
					() => {
						this.rootPage = LoginPage;
					}
				);
	}

	login() {
		this.menu.close();
		this.auth.signOut();
		this.nav.setRoot(LoginPage);
	}

	logout() {
		this.menu.close();
		this.auth.signOut();
		this.nav.setRoot(HomePage);
	}

	openPage(page) {
	this.menu.close();
	this.nav.setRoot(page.component);
	}
}
