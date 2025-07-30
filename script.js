const imgContent = document.querySelectorAll('.img-content-hover');

function showImgContent(e) {
  for(var i = 0; i < imgContent.length; i++) {
    x = e.pageX;
    y = e.pageY;
    imgContent[i].style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
};

document.addEventListener('mousemove', showImgContent);

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('popup-modal');
  const modalContent = document.querySelector('.modal-content');
  const modalClose = document.querySelector('.modal-close');
  const siteContent = document.getElementById('site-content');
  const leftArrow = document.querySelector('.modal-arrow-left');
  const rightArrow = document.querySelector('.modal-arrow-right');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex = -1;

  function showModalAtIndex(index) {
    if (index < 0 || index >= galleryItems.length) return;
    const item = galleryItems[index];
    let media = item.querySelector('img, video');
    let clone = media.cloneNode(true);
    clone.style.width = '100%';
    clone.style.maxWidth = '600px';
    clone.style.borderRadius = '12px';
    let overlay = item.querySelector('.gallery-overlay');
    let info = overlay ? overlay.innerHTML : '';
    let description = item.getAttribute('data-description');
    modalContent.innerHTML = '';
    modalContent.appendChild(clone);
    if (info) {
      let infoDiv = document.createElement('div');
      infoDiv.innerHTML = info;
      infoDiv.style.marginTop = '16px';
      modalContent.appendChild(infoDiv);
    }
    if (description) {
      let descDiv = document.createElement('div');
      descDiv.className = 'gallery-description';
      descDiv.style.marginTop = '16px';
      descDiv.style.color = '#555';
      descDiv.style.fontSize = '1rem';
      descDiv.style.fontStyle = 'italic';
      descDiv.textContent = description;
      modalContent.appendChild(descDiv);
    }
    modal.style.display = 'flex';
    siteContent.classList.add('blurred');
    currentIndex = index;
  }

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', function(e) {
      if (e.target.tagName === 'VIDEO' || e.target.classList.contains('modal-close')) return;
      showModalAtIndex(idx);
    });
  });

  leftArrow.addEventListener('click', function(e) {
    e.stopPropagation();
    if (currentIndex > 0) {
      showModalAtIndex(currentIndex - 1);
    }
  });
  rightArrow.addEventListener('click', function(e) {
    e.stopPropagation();
    if (currentIndex < galleryItems.length - 1) {
      showModalAtIndex(currentIndex + 1);
    }
  });

  document.addEventListener('keydown', function(e) {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) showModalAtIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < galleryItems.length - 1) showModalAtIndex(currentIndex + 1);
      } else if (e.key === 'Escape') {
        modal.style.display = 'none';
        siteContent.classList.remove('blurred');
      }
    }
  });

  modalClose.onclick = () => {
    modal.style.display = 'none';
    siteContent.classList.remove('blurred');
  };
  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      siteContent.classList.remove('blurred');
    }
  };
});