import * as ImagePicker from 'expo-image-picker';

export const loadImageFromGallery = async(array) => {
	const response = { status: false, image: null };
	const result = await ImagePicker.launchImageLibraryAsync({
		allowsEditing: true,
		aspect: array
	});
	if (result.cancelled) {
		return response;
	}
	response.status = true;
	response.image = result.uri;
	return response;
};
