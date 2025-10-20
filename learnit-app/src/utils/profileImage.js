// Use a simple placeholder image or base64 default image
const DEFAULT_PROFILE_IMAGE =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzUzNTM1Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzNSIgZmlsbD0iIzZCNzI4MCIvPgo8cGF0aCBkPSJNNTUgMTQ1QzU1IDEzMC41IDY3LjUgMTE4IDgyIDExOEgxMThDMTMyLjUgMTE4IDE0NSAxMzAuNSAxNDUgMTQ1VjE3MEg1NVYxNDVaIiBmaWxsPSIjNkI3MjgwIi8+Cjwvc3ZnPgo=';

export const getProfileImage = avatar => {
  if (avatar) {
    return avatar;
  }
  return DEFAULT_PROFILE_IMAGE;
};
