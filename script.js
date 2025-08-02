document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("purchaseForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const amount = parseInt(document.getElementById("amount").value);
    const plan = document.getElementById("plan").value;

    if (!name || !email || !amount || !plan) {
      alert("Please fill in all fields.");
      return;
    }

    // Disable button during processing
    const button = form.querySelector("button[type='submit']");
    button.disabled = true;
    button.innerText = "Processing...";

    try {
      const response = await fetch("http://40.113.88.236:5000/api/payment/generate_link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: 595653542,
          amount: amount,
          currency: "NGN",
          plan: plan,
          email: email,
          name: name
        })
      });

      if (!response.ok) {
        throw new Error("Server error while generating payment link.");
      }

      const result = await response.json();

      if (result && result.payment_link) {
        window.location.href = result.payment_link;
      } else {
        alert("Payment link could not be retrieved.");
        button.disabled = false;
        button.innerText = "Proceed to Checkout";
      }

    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
      button.disabled = false;
      button.innerText = "Proceed to Checkout";
    }
  });
});
