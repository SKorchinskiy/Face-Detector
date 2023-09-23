type FetchData = {
  url: string;
  options?: RequestInit;
};

export async function fetchData({ url, options }: FetchData) {
  const response = await fetch(url, options);
  const { data } = await response.json();
  return data;
}
