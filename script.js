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

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function(e) {
      if (e.target.tagName === 'VIDEO' || e.target.classList.contains('modal-close')) return;

      let media = item.querySelector('img, video');
      let clone = media.cloneNode(true);
      clone.style.width = '100%';
      clone.style.maxWidth = '600px';
      clone.style.borderRadius = '12px';

      let overlay = item.querySelector('.gallery-overlay');
      let info = overlay ? overlay.innerHTML : '';

      let description = item.getAttribute('data-description');
      let descriptionHTML = description ? `<div class="gallery-description" style="margin-top:16px;color:#555;font-size:1rem;font-style:italic;">${description}</div>` : '';

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
    });
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