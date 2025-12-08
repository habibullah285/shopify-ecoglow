document.addEventListener("click", function (e) {
  const button = e.target.closest(".add-to-cart-btn");
  if (!button) return;

  const variantId = button.dataset.variantId;
  if (!variantId) {
    alert("Variant ID missing!");
    return;
  }

  const data = new FormData();
  data.append("id", variantId);
  data.append("quantity", 1);

  fetch("/cart/add.js", {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" },
  })
    .then((res) => res.json())
    .then((item) => {
      // Toast
      const toast = document.createElement("div");
      toast.textContent = "Successfully add.";
      toast.className =
        "fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50";
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);

      // Update Cart Count
      fetch("/cart.js")
        .then((res) => res.json())
        .then((cart) => {
          const cartCount = document.getElementById("cart-count");
          if (cartCount) cartCount.textContent = cart.item_count;
        });
    })
    .catch((err) => {
      alert(err.description || "Something went wrong");
    });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const cartButton = document.getElementById("cart-button");
//   const cartDrawer = document.getElementById("cart-drawer");
//   const cartOverlay = document.getElementById("cart-overlay");
//   const cartClose = document.getElementById("cart-close");
//   const cartItemsContainer = document.getElementById("cart-items");

//   // Open Cart
//   function openCart() {
//     cartDrawer.classList.remove("translate-x-full");
//     cartOverlay.classList.remove("hidden");
//     loadCartItems();
//   }

//   // Close Cart
//   function closeCart() {
//     cartDrawer.classList.add("translate-x-full");
//     cartOverlay.classList.add("hidden");
//   }

//   cartButton.addEventListener("click", openCart);
//   cartClose.addEventListener("click", closeCart);
//   cartOverlay.addEventListener("click", closeCart);

//   // Load Cart Items
//   function loadCartItems() {
//     fetch("/cart.js")
//       .then((res) => res.json())
//       .then((cart) => {
//         cartItemsContainer.innerHTML = "";

//         if (!cart.items || cart.items.length === 0) {
//           cartItemsContainer.innerHTML =
//             '<p class="text-gray-400">Your cart is empty.</p>';
//         } else {
//           cart.items.forEach((item) => {
//             const div = document.createElement("div");
//             div.className = "flex items-center space-x-4";

//             // Image fallback
//             const imgSrc =
//               item.image ||
//               (item.featured_image
//                 ? item.featured_image
//                 : "/assets/img/default.png");

//             // Price formatting
//             const price = (item.price / 100).toFixed(2);

//             div.innerHTML = `
//               <img src="${imgSrc}" alt="${item.title}" class="w-16 h-16 object-cover rounded">
//               <div class="flex-1">
//                 <p class="text-sm font-semibold">${item.title}</p>
//                 <p class="text-gray-500 text-sm">${item.quantity} x $${price}</p>
//               </div>
//             `;
//             cartItemsContainer.appendChild(div);
//           });
//         }

//         // Update cart count
//         const cartCount = document.getElementById("cart-count");
//         if (cartCount) cartCount.textContent = cart.item_count;
//       })
//       .catch((err) => {
//         console.error("Cart load error:", err);
//         cartItemsContainer.innerHTML =
//           '<p class="text-red-500">Failed to load cart items.</p>';
//       });
//   }
// });

document.addEventListener("DOMContentLoaded", function () {
  const cartButton = document.getElementById("cart-button");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartClose = document.getElementById("cart-close");
  const cartItemsContainer = document.getElementById("cart-items");

  // Open / Close Cart
  function openCart() {
    cartDrawer.classList.remove("translate-x-full");
    cartOverlay.classList.remove("hidden");
    loadCartItems();
  }
  function closeCart() {
    cartDrawer.classList.add("translate-x-full");
    cartOverlay.classList.add("hidden");
  }

  cartButton.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  // Load Cart Items
  function loadCartItems() {
    fetch("/cart.js")
      .then((res) => res.json())
      .then((cart) => {
        cartItemsContainer.innerHTML = "";

        if (!cart.items || cart.items.length === 0) {
          cartItemsContainer.innerHTML =
            '<p class="text-gray-400">Your cart is empty.</p>';
        } else {
          cart.items.forEach((item) => {
            const div = document.createElement("div");
            div.className = "flex items-center justify-between space-x-4";

            const imgSrc =
              item.image ||
              (item.featured_image
                ? item.featured_image
                : "/assets/img/default.png");
            const price = (item.price / 100).toFixed(2);

            div.innerHTML = `
              <div class="flex items-center space-x-4">
                <img src="${imgSrc}" alt="${item.title}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                  <p class="text-sm font-semibold">${item.title}</p>
                  <p class="text-gray-500 text-sm">${item.quantity} x $${price}</p>
                </div>
              </div>
              <button class="text-red-500 text-sm hover:underline remove-item" data-key="${item.key}">Remove</button>
            `;
            cartItemsContainer.appendChild(div);
          });

          // Add event listener for remove buttons
          document.querySelectorAll(".remove-item").forEach((btn) => {
            btn.addEventListener("click", function () {
              const key = this.dataset.key;
              removeCartItem(key);
            });
          });
        }

        // Update cart count
        const cartCount = document.getElementById("cart-count");
        if (cartCount) cartCount.textContent = cart.item_count;
      })
      .catch((err) => {
        console.error("Cart load error:", err);
        cartItemsContainer.innerHTML =
          '<p class="text-red-500">Failed to load cart items.</p>';
      });
  }

  // Remove cart item
  function removeCartItem(key) {
    fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: key, quantity: 0 }),
    })
      .then((res) => res.json())
      .then((cart) => {
        loadCartItems(); // reload drawer
      })
      .catch((err) => console.error("Remove item error:", err));
  }
});
