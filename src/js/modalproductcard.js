import axios from 'axios';
import cartIcon from '../img/sptite.svg';
// import { handleModal } from "./modal";
const ul = document.querySelector('.wrapperPopularProduct');
// console.log(ul);
const body = document.querySelector('body');
ul.addEventListener('click', handleCardClick);

const list = document.querySelector('.products-list');
// console.log(list);
list.addEventListener('click', handleCardProductClick);

async function handleCardProductClick(event) {
  list.removeEventListener('click', handleCardProductClick);

  const product = event.target.closest('.productlist-card');

  if (product === null || event.target.closest('.productlist-card-btn')) {
    list.addEventListener('click', handleCardProductClick);
    return;
  }
  // console.log(product);
  // delete later for button

  const id = product.dataset.id;

  const info = await serviceProductInfo(id);
  // console.log(info);

  body.insertAdjacentHTML('beforeend', createMarkup(info));

  handleProductModal();
}

async function handleCardClick(event) {
  ul.removeEventListener('click', handleCardClick);
  const product = event.target.closest('li');
  if (product === null || event.target.closest('.popular__products-button')) {
    ul.addEventListener('click', handleCardClick);
    return;
  }
  // delete later for button
  // delete if click is not li
  const id = product.dataset.id;

  const info = await serviceProductInfo(id);
  // console.log(info);

  body.insertAdjacentHTML('beforeend', createMarkup(info));

  handleProductModal();
}

export async function serviceProductInfo(id) {
  const BASE_URL = 'https://food-boutique.b.goit.study/api/products/';

  return axios
    .get(`${BASE_URL}${id}`)
    .then(resp => {
      return resp.data;
    })
    .catch(error => {
      throw new Error(error);
    });
}

function createMarkup(info) {
  const { name, category, size, popularity, desc, price, img } = info;
  return `
    <div class="backdrop" data-modal>
  <div class="modal-container modal-product" data-modal">
    <svg
      class="modal-product-close-icon"
      width="22"
      height="22"
      data-modal-close
    >
      <use href="${cartIcon}#icon-close"></use>
    </svg>
    <div class="modal-product-img-text">
      <div class="modal-product-container-img">
        <img
          class="modal-product-img"
          src="${img}"
          alt="${name}"
          width="160"
          height="160"
        />
      </div>
      <div class="modal-product-text">
        <p class="modal-product modal-product-name">${name}</p>
        <div class="modal-container-descs">
          <p class="modal-product modal-product-desc">
            Category:
            <span class="modal-product-desc modal-product-desc-value"
              >${category}</span
            >
          </p>

          <p class="modal-product modal-product-desc">
            Size:
            <span class="modal-product-desc modal-product-desc-value"
              >${size}</span
            >
          </p>

          <p class="modal-product modal-product-desc">
            Popularity:
            <span class="modal-product-desc modal-product-desc-value">${popularity}</span>
          </p>
        </div>

        <p class="modal-product-description" style="overflow-y:auto; max-height: 200px">
         ${desc}

        </p>
      </div>
    </div>

    <div class="container-cost-button">
      <p class="modal-product-cost">$${price}</p>
      <button class="modal-wimdow-add-to-cart-btn">
        Add to
        <svg class="modal-product-addtocart" width="18" height="18">
          <use href="${cartIcon}#icon-cart"></use>
        </svg>
      </button>
    </div>
  </div>
</div>
    
    `;
}

// function handleProductModal() {
//   const closeModalBtn = document.querySelector('[data-modal-close]');
//   const modal = document.querySelector('[data-modal]');
//   const backdrop = document.querySelector('.backdrop');
//    function toggleModal() {
//       console.log('!!!!!!!');
//      modal.remove();
//       //  modal.parentElement.removeChild(modal);
//       // document.removeEventListener('keydown', handleKey);
//       closeModalBtn.removeEventListener('click', toggleModal);
//     }
//   closeModalBtn.addEventListener('click', toggleModal);
//   backdrop.addEventListener('click', handleBackdrop);
//   function handleBackdrop(event) {
//     if (event.target !== backdrop) {
//       return;
//     }
//     toggleModal();
//     backdrop.removeEventListener('click', handleBackdrop);
//   }
//   document.addEventListener('keydown', handleKey);

//   function handleKey(event) {
//     if (event.code === 'Escape') {
//       toggleModal();
//             document.removeEventListener('keydown', handleKey);
//     }

//     ul.addEventListener('click', handleCardClick);
//     list.addEventListener('click', handleCardProductClick);
//     // list.addEventListener("click", handleCardPopularClick);
//   }
// }

// function showLoader(span) {
//   span.style.visibility = 'visible';
// }

// function hideLoader(span) {
//   span.style.display = 'none';
// }

function handleProductModal() {
  const closeModalBtn = document.querySelector('[data-modal-close]');
  const backdrop = document.querySelector('.backdrop');

  function toggleModal() {
    const modal = document.querySelector('[data-modal]');
    if (modal) {
      modal.remove();
      closeModalBtn.removeEventListener('click', toggleModal);
      document.removeEventListener('keydown', handleKey);
      backdrop.removeEventListener('click', handleBackdrop);
    }
  }

  function handleBackdrop(event) {
    if (event.target !== backdrop) {
      return;
    }
    toggleModal();
    backdrop.removeEventListener('click', handleBackdrop);
  }

  function handleKey(event) {
    if (event.code === 'Escape') {
      toggleModal();
      document.removeEventListener('keydown', handleKey);
    }
  }
  ul.addEventListener('click', handleCardClick);
  list.addEventListener('click', handleCardProductClick);

  closeModalBtn.addEventListener('click', toggleModal);
  backdrop.addEventListener('click', handleBackdrop);
  document.addEventListener('keydown', handleKey);

  // Prevent attaching multiple listeners to the same modal
  if (!document.querySelector('[data-modal]')) {
    body.insertAdjacentHTML('beforeend', createMarkup(info));
  }
}
