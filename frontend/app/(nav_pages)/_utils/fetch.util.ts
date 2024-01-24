type FetchData = {
  url: string;
  options?: RequestInit;
};

export async function fetchData({ url, options }: FetchData) {
  try {
    const controller = new AbortController();
    const tid = setTimeout(() => {
      controller.abort();
    }, 15000);

    const response = await fetch(url, {
      ...options,
      credentials: "include",
      signal: controller.signal,
    });
    clearTimeout(tid);
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
