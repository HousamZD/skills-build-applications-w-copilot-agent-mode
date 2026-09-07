export function getApiBaseUrl() {
  const codeSpaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codeSpaceName && codeSpaceName.trim() !== '') {
    return `https://${codeSpaceName.trim()}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

export function getCollectionUrl(collectionName) {
  if (!collectionName || typeof collectionName !== 'string') {
    return getApiBaseUrl();
  }

  return `${getApiBaseUrl()}/${collectionName.replace(/^\/+|\/+$/g, '')}/`;
}
