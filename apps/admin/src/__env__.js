(function (window) {
  window.__env__ = window.__env__ || {};
  window.__env__.apiUrl = window.process?.env.apiUrl || 'https://avc-api.azurewebsites.net';
  window.__env__.production = window.process?.env.production || false;
})(this);
