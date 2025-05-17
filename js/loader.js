//Loading Page JS
//Displaying loading division when document is buffering
window.addEventListener('load', function () {
    
    //Obtaining loading div
    const loader = document.getElementById('page-loader');

    //Checking if it exists, and removing if it does
    if (loader) {

      //Removing with fade out effect after 0.5s
      loader.style.transition = 'opacity 0.2s ease';
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 500);
    }

}); 
