import Constants from 'expo-constants';

const ENV = {
	dev: {
		apiUrl: 'https://ubademy-14.herokuapp.com/',
		amplitudeApiKey: null,
	},
	staging: {
		apiUrl: 'https://ubademy-14.herokuapp.com/',
		//amplitudeApiKey: "[Enter your key here]",
		// Add other keys you want here
	},
	prod: {
		apiUrl: 'https://ubademy-14-prod.herokuapp.com/',
		//amplitudeApiKey: "[Enter your key here]",
		// Add other keys you want here
	}
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
	// What is __DEV__ ?
	// This variable is set to true when react-native is running in Dev mode.
	// __DEV__ is true when run locally, but false when published.
	// eslint-disable-next-line no-undef
	if (__DEV__) {
		return ENV.dev;
	} else if (env === 'staging') {
		return ENV.staging;
	} else if (env === 'prod') {
		return ENV.prod;
	}
};

export default getEnvVars;

