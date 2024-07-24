import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

interface Item {
  Name: string;
  Description: string;
  ImageUrl: string;
  Price: string;
}

const generateHtml = (items: Item[]) => {
  return `
      <html>
      <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
        Inventory Catalogue
      </h1>
      ${items
        .map(
          (item: {
            Name: string;
            Description: string;
            ImageUrl: string;
            Price: string;
          }) => `
        <div style="margin: 20px; padding: 10px; border: 1px solid #000;">
          <h2>Name: ${item.Name}</h2>
          <p>Description: ${item.Description}</p>
          <img src = ${item.ImageUrl} style = "width: 200px", height = "200px">
          <h2>Price: £ ${item.Price}</h2>
        </div>
      `
        )
        .join("")}
    </body>
      </html>
    `;
};

const GeneratePDF = async (catalogueData: []) => {
  const html = generateHtml(catalogueData);

  const file = await printToFileAsync({
    html: html,
    base64: false,
  });
  await shareAsync(file.uri);
};

export default GeneratePDF;
