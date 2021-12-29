import 'dotenv/config';

export default {
	'expo': {
		'name': 'Ubademy',
		'slug': 'ubademyTest',
		'version': '2.6.1',
		'icon': './images/icono.png',
		'assetBundlePatterns': [
			'**/*'
		],
		'plugins': [
			[
				'expo-notifications',
				{
					'icon': './assets/images/logo-push.png',
					'color': '#ffffff'
				}
			]
		],
		'extra': {
			'firebase': {
				apiKey: process.env.API_KEY_FIREBASE,
				authDomain: process.env.AUTH_DOMAIN,
				projectId: process.env.PROJECT_ID,
				storageBucket: process.env.STORAGE_BUCKET,
				messagingSenderId: process.env.MESSAGING_SENDER_ID,
				appId: process.env.APP_ID
			},
			'facebook': {
				'appId': '4654657221261085',
				'appName': 'ubademy'
			},
			'googlePlaces': {
				googlePlacesApiKey: process.env.GOOGLE_PLACES_API_KEY
			}
		},
		'android': {
			'package': 'com.grupo14.ubademy',
			'versionCode': 2
		}
	},
	'android': {
		'googleServicesFile': './google-services.json'
	},
	'name': 'ubademyTest',
	'notification': {
		'icon': './assets/images/logo-push.png'
	},
	'icon': './assets/images/logo-push.png'
};
