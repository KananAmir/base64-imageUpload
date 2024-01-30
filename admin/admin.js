const form = document.querySelector("form");
const tBody = document.querySelector("tbody");
const productName = document.querySelector("#product-name");
const price = document.querySelector("#price");
const photo = document.querySelector("#photo");
const description = document.querySelector("#description");

const BASE_URL = `http://localhost:8080`;
let base64;
async function getAllData() {
  try {
    const response = await axios(`${BASE_URL}/products`);
    // console.log(response.data);
    drawTable(response.data);
  } catch (error) {
    console.log(error);
  }
}

getAllData();

function drawTable(data) {
  tBody.innerHTML = "";

  data.forEach((item) => {
    const trElem = document.createElement("tr");
    trElem.innerHTML = `
            <td>${item.id}</td>
            <td><img src="${item.photo}"/></td>
            <td>${item.productName}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>
                <button>DELETE</button>
                <button>EDIT</button>
            </td>
    `;
    tBody.append(trElem);
  });
}

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  let product = {
    productName: productName.value,
    price: price.value,
    description: description.value,
    photo: base64,
  };

  if (productName.value && price.value && description.value && photo.value) {
    await axios.post(`${BASE_URL}/products`, product);
    getAllData();
  } else {
    window.alert("fill all fields!");
  }
});

photo.addEventListener("change", function (e) {
  //   console.log(e.target.files[0]);
  uploadImage(e);
});

const uploadImage = async (event) => {
  try {
    const file = event.target.files[0];
    base64 = await convertBase64(file);
    console.log(base64);
  } catch (error) {
    console.log(error);
  }
};

const convertBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
