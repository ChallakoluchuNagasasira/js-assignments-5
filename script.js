// Task 1: Helper function provided by the assignment.
function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) resolve("Access Granted: Welcome!");
    else reject("Access Denied: You must be at least 18.");
  });
}
async function verifyUserAge(age) {
  try {
    const message = await checkAge(age);
    log(message);
  } catch (error) {
    log("Error:", error);
  }
}

// Task 2: Helper functions provided by the assignment.
function verifyUser(username) {
  return new Promise((resolve, reject) => setTimeout(() => {
    if (username === "admin") resolve({ id: 101, username: "admin" });
    else reject("User not found in system.");
  }, 1000));
}
function getPermissions(user) {
  return new Promise((resolve, reject) => setTimeout(() => {
    if (user.id === 101) resolve(["READ", "WRITE", "DELETE"]);
    else reject("No permissions assigned.");
  }, 1000));
}
async function loginFlow(username) {
  try {
    const user = await verifyUser(username);
    log("User Verified!");
    const permissions = await getPermissions(user);
    log(permissions);
  } catch (error) {
    log("Login Failed:", error);
  }
}

// Task 3: Helper functions provided by the assignment.
function checkStock(item) {
  return new Promise((resolve, reject) => setTimeout(() => {
    if (item === "Laptop") resolve("In Stock");
    else reject("Item out of stock!");
  }, 1000));
}
function processPayment(amount) {
  return new Promise((resolve, reject) => setTimeout(() => {
    if (amount <= 500) resolve("Payment Approved");
    else reject("Card Declined: Insufficient funds.");
  }, 1000));
}
function createShippingLabel() {
  return new Promise(resolve => setTimeout(() => resolve("Tracking ID: #TRK-99823"), 1000));
}
async function checkout(item, amount) {
  try {
    await checkStock(item);
    log("Step 1 Passed: Item in stock");
    await processPayment(amount);
    log("Step 2 Passed: Payment successful");
    const trackingId = await createShippingLabel();
    log("Order Complete! " + trackingId);
  } catch (error) {
    log("Checkout Aborted:", error);
  } finally {
    log("Checkout session closed.");
  }
}

// On-page output lets you test each required case without opening DevTools.
const output = document.getElementById("console-output");
function log(...values) {
  const line = values.map(v => typeof v === "string" ? v : JSON.stringify(v)).join(" ");
  output.textContent += (output.textContent ? "\n" : "") + line;
}
function resetOutput() { output.textContent = ""; }
document.querySelectorAll("[data-run]").forEach(button => {
  button.addEventListener("click", async () => {
    resetOutput();
    switch (button.dataset.run) {
      case "age20": await verifyUserAge(20); break;
      case "age15": await verifyUserAge(15); break;
      case "admin": await loginFlow("admin"); break;
      case "guest": await loginFlow("guest"); break;
      case "laptop300": await checkout("Laptop", 300); break;
      case "phone300": await checkout("Phone", 300); break;
      case "laptop1000": await checkout("Laptop", 1000); break;
    }
  });
});
document.getElementById("clear-console").addEventListener("click", resetOutput);
