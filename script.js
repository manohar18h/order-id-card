document
  .getElementById("idCardForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const customerName = document.getElementById("customerName").value;
    const certificateNo = document.getElementById("certificateNo").value;
    const rawDate = document.getElementById("date").value;
    const [year, month, day] = rawDate.split("-");
    const date = `${day}/${month}/${year}`; // Output: dd/mm/yyyy

    const productName = document.getElementById("productName").value;
    const productWeight = document.getElementById("productWeight").value;

    const productKarat = document.getElementById("productKarat").value;
    const goldPercentage = document.getElementById("goldPercentage").value;

    // Set default logo image
    let logoURL = "images/hjlogo-removebg-preview__1_-removebg-preview (1).png";

    // Get Customer Image
    const imageFile = document.getElementById("customerUpload").files[0];
    let userImageURL = "images/placeholder.png"; // Default placeholder
    if (imageFile) {
      userImageURL = URL.createObjectURL(imageFile);
    }

    // Clear previous card before adding a new one
    const grid = document.getElementById("idCardGrid");
    grid.innerHTML = "";

    // Create ID Card Element
    const div = document.createElement("div");
    div.classList.add("id-card");

    div.innerHTML = `
    <div class = "card-id-full">
        <div class="card-header">
            <img src="${logoURL}" class="logo" alt="Logo">
            <h2 class="title"> HAMBIRE JEWELLERY </h2>
            <img src="qr-code.png" class="qr-code" alt="QR Code">
        </div>

        <h3 class="certificate-title">GOLD TESTING CERTIFICATE</h3>

        <div class="card-body">
            <div class="left-section">
                <table class="info-table">
<tr>
  <td>
    <strong style="font-weight: 600;"> Customer Name &nbsp;&nbsp;:</strong>
  </td>
  <td style="padding-left: 10px;">
    <span style="font-weight: 600; font-size: 8px;">${customerName}</span>
  </td>
</tr>

<tr>
  <td>
    <strong style="font-weight: 600;">Certificate No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>
  </td>
  <td style="padding-left: 10px;">
    <span style="font-weight: 600; font-size: 8px;">${certificateNo}</span>
  </td>
</tr>
<tr>
  <td>
    <strong style="font-weight: 600;">Date &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>
  </td>
  <td style="padding-left: 10px;">
    <span style="font-weight: 600; font-size: 8px;">${date}</span>
  </td>
</tr>
<tr>
  <td>
    <strong style="font-weight: 600;">Product Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>
  </td>
  <td style="padding-left: 10px;">
    <span style="font-weight: 600; font-size: 8px;">${productName}</span>
  </td>
  </tr>
  <tr>
  <td>
    <strong style="font-weight: 600;">Product Weight &nbsp;&nbsp;&nbsp;:</strong>
  </td>
  <td style="padding-left: 10px;">
    <span style="font-weight: 600; font-size: 8px;">${productWeight}g</span>
  </td>
</tr>
<tr>
  <td>
    <strong style="font-weight: 600;">Product Karat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>
  </td>
  <td style="padding-left: 10px;">
    <span style="font-weight: 600; font-size: 8px;">${productKarat}K</span>
  </td>
</tr>
<tr>
  <td>
    <strong style="font-weight: 600;">Gold Purity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</strong>
  </td>
  <td style="padding-left: 10px;">
    <span style="font-weight: 600; font-size: 8px;">${goldPercentage}</span>
  </td>
</tr>


   </table>
            </div>
            <div class="right-section">
                <img src="${userImageURL}" class="profile-img" alt="Customer Image">
            </div>
        </div>
        


        <div class="footer-note">
            Note: max. deviation +/- 0.50% as per machine specification
        </div>
        </div>
    `;

    grid.appendChild(div);

    // Add Print Button Outside the Grid to Prevent Overwriting
  });

// Function to capture and download the ID card as JPG
function downloadIDCard() {
  // window.location.href = "qrcode.html";

  const idCard = document.querySelector(".id-card"); // Select the ID card

  if (!idCard) {
    alert("No ID Card available to download.");
    return;
  }

  html2canvas(idCard, { scale: 3 }).then((canvas) => {
    // Higher scale for better quality
    const image = canvas.toDataURL("image/jpeg", 1.0); // Convert to JPG format
    const link = document.createElement("a");
    link.href = image;
    link.download = "ID_Card.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
