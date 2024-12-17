const DEFAULT_PROFILE_URL = 'http://localhost:3001/api/defaultProfilePicture';

export const getProfileImage = (avatarData) => {
  if (avatarData) {
    return `data:image/jpeg;base64,${avatarData}`;
  }
  return DEFAULT_PROFILE_URL;
};
