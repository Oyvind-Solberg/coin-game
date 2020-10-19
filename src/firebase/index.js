import firebase from 'firebase/app';

export const firebaseApp = !firebase.apps.length
	? firebase.initializeApp({
			apiKey: 'AIzaSyBIYgqhFLIbM3OoyjYguDJxzmYzmCfRhWY',
			authDomain: 'coin-game-6f70a.firebaseapp.com',
			databaseURL: 'https://coin-game-6f70a.firebaseio.com',
			projectId: 'coin-game-6f70a',
			storageBucket: 'coin-game-6f70a.appspot.com',
			messagingSenderId: '1087685958660',
			appId: '1:1087685958660:web:01dded756b4d12c2806951',
	  })
	: firebase.app();
