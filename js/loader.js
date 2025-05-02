//Loading Page JS

window.addEventListener('load', function () {
    const loader = document.getElementById('page-loader');
    if (loader) {
      loader.style.transition = 'opacity 0.2s ease';
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }
}); 
