const cartDiv = document.getElementById("cart");

function renderCart() {
  cartDiv.innerHTML = "";
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cart.length > 0) {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
          <h2>${item.name}</h2>
          <p><strong>Texture:</strong> ${item.texture}</p>
          <p><strong>Price:</strong> $${item.price}</p>
          <button class="remove" onclick="removeItem(${index})">Remove</button>
        `;
      cartDiv.appendChild(itemDiv);
    });

    // Buttons
    const btns = document.createElement("div");
    btns.className = "buttons";
    btns.innerHTML = `
        <button class="clear" onclick="clearCart()">Clear Cart</button>
      `;
    cartDiv.appendChild(btns);
  } else {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
  }
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cart));
  renderCart(); // Refresh UI
}

function clearCart() {
  localStorage.removeItem("cartItems");
  renderCart();
}

renderCart();
