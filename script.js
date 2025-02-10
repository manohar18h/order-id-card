document.getElementById("idCardForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input values
    const customerName = document.getElementById("customerName").value;
    const certificateNo = document.getElementById("certificateNo").value;
    const date = document.getElementById("date").value;
    const productName = document.getElementById("productName").value;
    const productWeight = document.getElementById("productWeight").value;
    const productKarat = document.getElementById("productKarat").value;
    const goldPercentage = document.getElementById("goldPercentage").value || "N/A";
    const silverPercentage = document.getElementById("silverPercentage").value || "N/A";
    const copperPercentage = document.getElementById("copperPercentage").value || "N/A";
    const othersPercentage = document.getElementById("othersPercentage").value || "N/A";

    // Set default logo image
    let logoURL = "images/logo.png";

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
        <div class="card-header">
            <img src="${logoURL}" class="logo" alt="Logo">
            <h2 class="title">Hambire JEWELLERS</h2>
            <img src="qr-code.png" class="qr-code" alt="QR Code">
        </div>

        <h3 class="certificate-title">XRF GOLD TESTING CERTIFICATE</h3>

        <div class="card-body">
            <div class="left-section">
                <table class="info-table">
                    <tr><td><strong>Customer Name:</strong></td><td>${customerName}</td></tr>
                    <tr><td><strong>Certificate No:</strong></td><td>${certificateNo}</td></tr>
                    <tr><td><strong>Date:</strong></td><td>${date}</td></tr>
                    <tr><td><strong>Product Name:</strong></td><td>${productName}</td></tr>
                    <tr><td><strong>Product Weight:</strong></td><td>${productWeight}g</td></tr>
                    <tr><td><strong>Product Karat:</strong></td><td>${productKarat}K</td></tr>
                </table>
            </div>
            <div class="right-section">
                <img src="${userImageURL}" class="profile-img" alt="Customer Image">
            </div>
        </div>

        <div class="composition">

         <table>
                    <tr><td>Gold :${goldPercentage}%  </td><td> Silver :${silverPercentage}%</td></tr>
                    <tr><td>Copper :${copperPercentage}% </td><td>  Others :${othersPercentage}%</td></tr>
                     </table>
        </div>


        <div class="footer-note">
            Note: max. deviation +/- 0.50% as per machine specification
        </div>
    `;

    grid.appendChild(div);

    // Add Print Button Outside the Grid to Prevent Overwriting
});

// Function to Print Only the ID Card
function printIDCard() {
    const idCardContent = document.getElementById("idCardGrid").innerHTML;

    if (!idCardContent.trim()) {
        alert("No ID Card available to print.");
        return;
    }

    const printWindow = window.open('', '_blank', 'width=340,height=220');

    printWindow.document.write(`
        <html>
        <head>
            <title>Print ID Card</title>
            <link rel="stylesheet" href="styles.css">
            <style>
                @page {
                    size: 8.5cm 5.6cm;
                    margin: 0;
                }
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    background-color: white;
                }
                .print-container {
                    width: 8.5cm;
                    height: 5.5cm;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                #idCardToPrint {
                    width: 8.6cm;
                    height: 5.6cm;
                    padding: 5px;
                    display: flex;
                    flex-direction: column;
                    font-family: Arial, sans-serif;
                    background-color: white;
                }
            </style>
        </head>
        <body>
            <div class="print-container">
                <div id="idCardToPrint">${idCardContent}</div>
            </div>
            <script>
                setTimeout(function() {
                    window.print();
                    window.close();
                }, 500);
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}
