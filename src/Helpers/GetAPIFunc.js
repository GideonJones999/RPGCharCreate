async function getData(linkEnd = "/api/") {
  try {
    const response = await fetch(`https://www.dnd5eapi.co${linkEnd}`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default getData;
