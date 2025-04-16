export const fetchCatImage = async () => {
  const apiUrl = "https://api.thecatapi.com/v1/images/search";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch cat image: ${error}`);
  }
};
